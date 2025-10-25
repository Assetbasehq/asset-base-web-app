import type { IAsset } from "./asset.interface";

export interface IUserPortfolio {
  account_id: string;
  asset: IAsset;
  asset_id: string;
  available_shares: number;
  created_at: string;
  id: string;
  metadata: {
    user_id: string;
  };
  number_of_shares: number;
  total_amount_invested: number;
  updated_at: string;
}
