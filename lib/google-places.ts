import type { BusinessAnalysis, ReviewSample } from './types';

const BASE = 'https://maps.googleapis.com/maps/api/place';

function extractSearchQuery(url: string): string {
  try {
    // /maps/place/Business+Name/@...
    const placeMatch = url.match(/\/maps\/place\/([^/@?#]+)/);
    if (placeMatch) {
      return decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
    }
    // ?q=Business+Name
    const parsed = new URL(url);
    const q = parsed.searchParams.get('q');
    if (q) return q;
  } catch {
    // fall through
  }
  return url;
}

interface PlaceReview {
  rating: number;
  text: string;
  author_name: string;
  time: number;
  relative_time_description: string;
  // owner_response is not part of the official Places API schema
  // but some responses include it
  owner_response?: { text: string; time: number };
}

interface PlaceResult {
  place_id: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  formatted_address?: string;
  reviews?: PlaceReview[];
}

async function findPlaceId(query: string): Promise<string | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY!;
  const res = await fetch(
    `${BASE}/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id&key=${key}`
  );
  const json = await res.json();
  return json.candidates?.[0]?.place_id ?? null;
}

async function getPlaceDetails(placeId: string): Promise<PlaceResult | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY!;
  const fields = 'place_id,name,rating,user_ratings_total,formatted_address,reviews';
  const res = await fetch(
    `${BASE}/details/json?place_id=${placeId}&fields=${fields}&key=${key}`
  );
  const json = await res.json();
  if (json.status !== 'OK') return null;
  return json.result as PlaceResult;
}

function computeMetrics(
  result: PlaceResult,
  url: string
): BusinessAnalysis {
  const reviews = result.reviews ?? [];

  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const responseCount = reviews.filter((r) => !!r.owner_response).length;

  const five_star_rate =
    reviews.length > 0 ? Math.round((fiveStarCount / reviews.length) * 100) : 0;
  const response_rate =
    reviews.length > 0 ? Math.round((responseCount / reviews.length) * 100) : 0;

  // Estimate reviews/month from oldest timestamp in sample vs now
  let reviews_per_month = 0;
  if (reviews.length >= 2) {
    const oldest = Math.min(...reviews.map((r) => r.time));
    const newest = Math.max(...reviews.map((r) => r.time));
    const spanMonths = Math.max((newest - oldest) / (30 * 24 * 3600), 0.5);
    // scale total reviews by the sample span
    reviews_per_month = Math.round(result.user_ratings_total / Math.max(spanMonths, 1));
    // cap at a reasonable value
    reviews_per_month = Math.min(reviews_per_month, 500);
  } else if (result.user_ratings_total > 0) {
    // rough fallback: assume business has been around ~2 years
    reviews_per_month = Math.round(result.user_ratings_total / 24);
  }

  const reviews_sample: ReviewSample[] = reviews.map((r) => ({
    rating: r.rating,
    text: r.text,
    author_name: r.author_name,
    time: r.time,
    has_response: !!r.owner_response,
    relative_time_description: r.relative_time_description,
  }));

  return {
    name: result.name,
    url,
    place_id: result.place_id,
    formatted_address: result.formatted_address ?? '',
    total_reviews: result.user_ratings_total ?? 0,
    avg_rating: result.rating ?? 0,
    response_rate,
    reviews_per_month,
    five_star_rate,
    reviews_sample,
  };
}

export async function fetchPlaceData(url: string): Promise<BusinessAnalysis | null> {
  try {
    const query = extractSearchQuery(url);
    const placeId = await findPlaceId(query);
    if (!placeId) return null;

    const details = await getPlaceDetails(placeId);
    if (!details) return null;

    return computeMetrics(details, url);
  } catch (err) {
    console.error('fetchPlaceData error:', err);
    return null;
  }
}
