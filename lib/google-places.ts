import type { BusinessAnalysis, ReviewSample } from './types';

// Uses the Places API (New) — https://developers.google.com/maps/documentation/places/web-service/overview
// Enable "Places API (New)" in Google Cloud Console + ensure billing is active.

const SEARCH_URL = 'https://places.googleapis.com/v1/places:searchText';
const DETAIL_URL = 'https://places.googleapis.com/v1/places';

const SEARCH_MASK =
  'places.id,places.displayName,places.rating,places.userRatingCount,places.formattedAddress,places.reviews';
const DETAIL_MASK =
  'id,displayName,rating,userRatingCount,formattedAddress,reviews';

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

interface NewPlaceReview {
  rating: number;
  text?: { text: string };
  authorAttribution?: { displayName: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
}

interface NewPlace {
  id: string;
  displayName?: { text: string };
  rating?: number;
  userRatingCount?: number;
  formattedAddress?: string;
  reviews?: NewPlaceReview[];
}

async function searchPlace(query: string, key: string): Promise<string | null> {
  try {
    const res = await fetch(SEARCH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'places.id',
      },
      body: JSON.stringify({ textQuery: query }),
    });
    const json = await res.json();
    if (!res.ok || json.error) {
      console.error('Places searchText error:', json.error ?? json);
      return null;
    }
    return json.places?.[0]?.id ?? null;
  } catch (err) {
    console.error('searchPlace fetch error:', err);
    return null;
  }
}

async function getPlaceDetails(placeId: string, key: string): Promise<NewPlace | null> {
  try {
    const res = await fetch(`${DETAIL_URL}/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': DETAIL_MASK,
      },
    });
    const json = await res.json();
    if (!res.ok || json.error) {
      console.error('Places details error:', json.error ?? json);
      return null;
    }
    return json as NewPlace;
  } catch (err) {
    console.error('getPlaceDetails fetch error:', err);
    return null;
  }
}

function computeMetrics(place: NewPlace, url: string): BusinessAnalysis {
  const reviews = place.reviews ?? [];

  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const five_star_rate =
    reviews.length > 0 ? Math.round((fiveStarCount / reviews.length) * 100) : 0;

  // Owner responses not available in Places API (New)
  const response_rate = 0;

  // Estimate reviews/month from publish timestamps
  let reviews_per_month = 0;
  const timestamps = reviews
    .map((r) => (r.publishTime ? new Date(r.publishTime).getTime() : 0))
    .filter(Boolean);

  if (timestamps.length >= 2) {
    const oldest = Math.min(...timestamps);
    const newest = Math.max(...timestamps);
    const spanMonths = Math.max((newest - oldest) / (30 * 24 * 3600 * 1000), 0.5);
    reviews_per_month = Math.round(
      (place.userRatingCount ?? 0) / Math.max(spanMonths, 1)
    );
    reviews_per_month = Math.min(reviews_per_month, 500);
  } else if ((place.userRatingCount ?? 0) > 0) {
    reviews_per_month = Math.round((place.userRatingCount ?? 0) / 24);
  }

  const reviews_sample: ReviewSample[] = reviews.map((r) => ({
    rating: r.rating,
    text: r.text?.text ?? '',
    author_name: r.authorAttribution?.displayName ?? 'Anonymous',
    time: r.publishTime ? new Date(r.publishTime).getTime() / 1000 : 0,
    has_response: false,
    relative_time_description: r.relativePublishTimeDescription ?? '',
  }));

  return {
    name: place.displayName?.text ?? 'Unknown Business',
    url,
    place_id: place.id,
    formatted_address: place.formattedAddress ?? '',
    total_reviews: place.userRatingCount ?? 0,
    avg_rating: place.rating ?? 0,
    response_rate,
    reviews_per_month,
    five_star_rate,
    reviews_sample,
  };
}

export async function fetchPlaceData(url: string): Promise<BusinessAnalysis | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    console.error('GOOGLE_PLACES_API_KEY is not set');
    return null;
  }

  try {
    const query = extractSearchQuery(url);
    const placeId = await searchPlace(query, key);
    if (!placeId) {
      console.warn('No place found for query:', query);
      return null;
    }

    const details = await getPlaceDetails(placeId, key);
    if (!details) return null;

    return computeMetrics(details, url);
  } catch (err) {
    console.error('fetchPlaceData error:', err);
    return null;
  }
}
