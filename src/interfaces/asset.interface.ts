export interface IAsset {
  id: string;
  asset_type: string;
  asset_description: string;
  asset_name: string;
  asset_symbol: string;
  available_shares: number;
  brandColors: string[];
  category: string;
  created_at: string;
  currency: string;
  deleted_at: string | null;
  distributions_enabled: boolean;
  documents: {
    ["pitch deck"]: string;
    proof_of_ownership: string;
    registration_doc: string;
  };
  image_urls: string[];
  iso_country_code: string;
  latest_selling_rate: number;
  listing_status: string;
  logo: string;
  metadata: {
    created_at: string;
    interest_rate: string;
    lead: string;
    maturity_date: string;
    start_date: string;
    team_size: string;
    tenure: string;
    valuation: string;
    website: string;
  };
  pitch_deck: {
    title: string;
    description: string;
    image_urls: string[];
  }[];
  min_hold_days: number;
  number_of_shares: number;
  poll_id: string | null;
  price_per_share: number;
  slug: string;
  total_value: number;
  updated_at: string;
  video_url: string | null;
  number_of_investors: number;
}
