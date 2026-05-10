export interface ReviewSample {
  rating: number;
  text: string;
  author_name: string;
  time: number;
  has_response: boolean;
  relative_time_description: string;
}

export interface BusinessAnalysis {
  name: string;
  url: string;
  place_id: string;
  formatted_address: string;
  total_reviews: number;
  avg_rating: number;
  response_rate: number;   // 0–100 (from sample)
  reviews_per_month: number; // estimate
  five_star_rate: number;  // 0–100 (from sample)
  reviews_sample: ReviewSample[];
}

export interface AnalysisRecord {
  id: string;
  created_at: string;
  stripe_session_id: string | null;
  email: string;
  industry: string;
  status: 'pending_payment' | 'paid' | 'data_fetched' | 'email_sent';
  business_url: string;
  competitor_urls: string[];
  business_data: BusinessAnalysis | null;
  competitors_data: BusinessAnalysis[] | null;
  follow_up_sent: boolean;
}

export interface CheckoutPayload {
  business_url: string;
  competitor_urls: string[];
  industry: string;
  email: string;
}

export interface GapMetric {
  label: string;
  your_value: number | string;
  competitor_value: number | string;
  delta: number;
  unit: string;
  insight: string;
}
