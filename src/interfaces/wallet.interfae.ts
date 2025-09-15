export type WalletToFundOptions = "USD" | "NAIRA" | "CRYPTO";

export interface DepositState {
  walletToFund: WalletToFundOptions | null;
  currencyToFund: string | null;
  fundingMethod: string | null;
  stage: number;
}
