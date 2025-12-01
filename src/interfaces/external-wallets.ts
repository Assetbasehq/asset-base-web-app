export interface CardItem {
  id: string;
  created_at: string;
  user_id: string;
  status: string;
  wallet_type: string;
  currencies: string[];
  provider: string;
  details: {
    brand: string;
    currency: string;
    provider: string;
    customer_id: string;
    expiry_year: string;
    last_digits: string;
    expiry_month: string;
    provider_reference: string;
    network?: string;
  };
  balance?: number;
}
