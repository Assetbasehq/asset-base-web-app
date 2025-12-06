export interface IOrder {
  account_id: string;
  asset_id: string;
  created_at: string;
  id: string;
  metadata: {
    fees: [
      {
        amount: number;
        description: string;
        intent: string;
      }
    ];
  };
  number_of_shares: number;
  order_type: string;
  price_per_share: number;
  status: string;
  transaction_id: string;
  updated_at: string;
  user_id: string;
}
