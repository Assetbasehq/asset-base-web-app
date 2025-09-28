export interface ICurrency {
  buy_rate: number;
  code: string;
  flag: string;
  min_first_investment_balance: number;
  name: string;
  sell_rate: number;
  symbol: string;
  wallet_status: string;
}

export interface IOMethod {
  channel: string;
  currency: {
    buy_rate: number;
    code: string;
    flag: string;
    min_first_investment_balance: number;
    name: string;
    sell_rate: number;
    symbol: string;
    wallet_status: string;
  };
  destination_wallets: string[];
  fee: {
    type: string;
    value: number;
    cap?: number;
    additional_value?: number;
  };
  fee_type: string;
  intent: string;
  limit: {
    type: string;
  };
  provider: string;
  timeline: string;
  network_code: string;
  network_name: string;
}
