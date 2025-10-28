import type { CardItem } from "./external-wallets";
import type { UserBankAccount } from "./user.interface";

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
  provider: string;
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
  timeline: string;
  network_code: string;
  network_name: string;
}

export interface ICryptoWallet {
  userId: string;
  pendingBalanceInUsd: string;
  balanceInUsd: string;
  assets: {
    id: string;
    name: string;
    symbol: string;
    tokenAddress: string;
    network: string;
    balance: string;
    pendingBalance: string;
    logoUrl: string;
    blockradarAssetId: string;
  }[];
}
export type WalletTransaction = {
  id: string;
  created_at: Date | string;
  wallet_id: string;
  amount: number;
  balance?: number;
  transaction_type: "debit" | "credit";
  transaction_intent: "purchase_order" | "charge_card" | "funding" | string;
  transaction_id: string;
  description: string | null;
  status: "successful" | "pending" | "failed";
  currency?: string;
} & WalletTransactionMeta;

export type WalletTransactionMeta =
  | {
      metadata: null;
      reason: null | "gas_fee_funding";
    }
  | {
      reason:
        | "assets.purchase.system"
        | "assets.sale"
        | "assets.purchase"
        | "assets.exchange.fee";
      metadata: {
        asset_id: string;
        asset_name: string;
        price_per_share: number;
        number_of_shares: number;
        currency: string;
      };
    }
  | {
      reason: "wallets.exchange";
      metadata: {
        src_currency: string;
        dest_currency: string;
      };
    }
  | {
      reason: "moneyio.funding" | "moneyio.withdrawal";
      metadata: UserBankAccount | CardItem;
    }
  | {
      reason: "asset.distribution.returns";
      metadata: {
        asset_id: string;
        currency: string;
        end_date: string;
        asset_name: string;
        start_date: string;
      };
    };

export interface WalletStatement {
  currency: string;
  transactions: WalletTransaction[];
  opening_balance: number;
  closing_balance: number;
}
