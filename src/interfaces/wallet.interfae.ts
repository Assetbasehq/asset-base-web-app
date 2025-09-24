// import { flags } from "@/constants/images";
// import type React from "react";

// export type WalletToFundOptions = "USD" | "NAIRA" | "CRYPTO";

// export interface ICurrency {
//   name: string;
//   currencyCode: string;
//   countryCode: string;
//   logo: string;
// }

// export interface IWallet {
//   name: string;
//   logo: string;
// }

// export const walletOptions: IWallet[] = [
//   {
//     name: "USD",
//     logo: flags.usa.flag,
//   },
//   {
//     name: "Naira",
//     logo: flags.nigeria.flag,
//   },
//   {
//     name: "Crypto",
//     logo: flags.tetherUSDT.flag,
//   },
// ];

// export const walletOptionMap: Record<WalletToFundOptions, ICurrency[]> = {
//   USD: [
//     {
//       name: "Nigerian Naira",
//       countryCode: "NG",
//       currencyCode: "NGN",
//       logo: flags.nigeria.flag,
//     },
//     {
//       name: "US Dollar",
//       countryCode: "US",
//       currencyCode: "USD",
//       logo: flags.usa.flag,
//     },
//     {
//       name: "Ghanian Cedis",
//       countryCode: "GH",
//       currencyCode: "GHS",
//       logo: flags.ghana.flag,
//     },
//     {
//       name: "Ugandan Shillings",
//       countryCode: "UG",
//       currencyCode: "UGX",
//       logo: flags.uganda.flag,
//     },
//     {
//       name: "Kenyan Shillings",
//       countryCode: "KE",
//       currencyCode: "KES",
//       logo: flags.kenya.flag,
//     },
//   ],
//   NAIRA: [
//     {
//       name: "Nigerian Naira",
//       countryCode: "NG",
//       currencyCode: "NGN",
//       logo: flags.nigeria.flag,
//     },
//   ],
//   CRYPTO: [
//     {
//       name: "USDT",
//       countryCode: "US",
//       currencyCode: "USDT",
//       logo: flags.tetherUSDT.flag,
//     },
//     {
//       name: "USDC",
//       countryCode: "US",
//       currencyCode: "USDC",
//       logo: flags.tetherUSDT.flag,
//     },
//     {
//       name: "cNGN",
//       countryCode: "NG",
//       currencyCode: "cNGN",
//       logo: flags.tetherUSDT.flag,
//     },
//   ],
// };

// export const fundingOptions = [
//   { name: "Bank", value: "bank" },
//   { name: "Momo", value: "momo" },
// ];

// const currencySymbols = { ngn: "₦", ghs: "GH₵", kes: "KSh", ugx: "USh" };

// export interface DepositState {
//   walletToFund: {
//     name: string;
//     logo: React.ReactNode;
//   } | null;
//   currencyToFund: {
//     name: string;
//     currencyCode: string;
//     logo: React.ReactNode;
//   } | null;
//   fundingMethod: string | null;
//   stage: number;
// }

// //
// export interface WithdrawState {
//   walletToWithdraw: {
//     name: string;
//     logo: React.ReactNode;
//   } | null;
//   currencyToWithdraw: {
//     name: string;
//     currencyCode: string;
//     logo: React.ReactNode;
//   } | null;
//   fundingMethod: string | null;
//   stage: number;
// }

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
