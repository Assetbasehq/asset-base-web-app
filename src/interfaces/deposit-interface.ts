import { flags, images } from "@/constants/images";

// Type of wallet where funds will be sent
export type DestinationWalletType = "USD" | "NAIRA" | "CRYPTO";

// Represents a currency option
export interface ICurrencyOption {
  name: string;
  currencyCode: string;
  countryCode: string;
  logo: string;
}

// Represents a wallet type (USD, Naira, Crypto)
export interface IWalletType {
  name: string;
  logo: string;
  currencyCode: string;
}

// List of all wallet types available
export const walletTypes: IWalletType[] = [
  {
    name: "USD",
    logo: flags.usa.flag,
    currencyCode: "usd",
  },
  {
    name: "Naira",
    logo: flags.nigeria.flag,
    currencyCode: "ngn",
  },
  {
    name: "Crypto",
    logo: flags.tetherUSDT.flag,
    currencyCode: "crypto",
  },
];

// Mapping: Destination wallet → supported currencies
export const destinationWalletCurrencies: Record<
  DestinationWalletType,
  ICurrencyOption[]
> = {
  USD: [
    {
      name: "Nigerian Naira",
      countryCode: "NG",
      currencyCode: "NGN",
      logo: flags.nigeria.flag,
    },
    {
      name: "US Dollar",
      countryCode: "US",
      currencyCode: "USD",
      logo: flags.usa.flag,
    },
    {
      name: "Ghanian Cedis",
      countryCode: "GH",
      currencyCode: "GHS",
      logo: flags.ghana.flag,
    },
    {
      name: "Ugandan Shillings",
      countryCode: "UG",
      currencyCode: "UGX",
      logo: flags.uganda.flag,
    },
    {
      name: "Kenyan Shillings",
      countryCode: "KE",
      currencyCode: "KES",
      logo: flags.kenya.flag,
    },
  ],
  NAIRA: [
    {
      name: "Nigerian Naira",
      countryCode: "NG",
      currencyCode: "NGN",
      logo: flags.nigeria.flag,
    },
  ],
  CRYPTO: [
    {
      name: "USDT",
      countryCode: "US",
      currencyCode: "USDT",
      logo: flags.tetherUSDT.flag,
    },
    {
      name: "USDC",
      countryCode: "US",
      currencyCode: "USDC",
      logo: images.USDC.logo,
    },
    {
      name: "cNGN",
      countryCode: "NG",
      currencyCode: "cNGN",
      logo: images.cNGN.logo,
    },
  ],
};

// Funding methods (Bank Transfer, Mobile Money, etc.)
export const fundingMethods = [
  { name: "Bank", value: "bank" },
  { name: "Momo", value: "momo" },
];

// Currency symbol mapping
export const currencySymbolMap = {
  ngn: "₦",
  ghs: "GH₵",
  kes: "KSh",
  ugx: "USh",
};

export const currencyToName = {
  ngn: "Naira",
  ghs: "Ghana Cedis",
  kes: "Kenyan Shillings",
  ugx: "Ugandan Shillings",
};

export const currencyToFlag = {
  ngn: flags.nigeria.flag,
  ghs: flags.ghana.flag,
  kes: flags.kenya.flag,
  ugx: flags.uganda.flag,
};

export interface FundingMethod {
  type: string;
  label: string;
  description?: string;
  icon: string; // URL or icon path
  feePercentage: number; // percentage fee, e.g., 1.5 = 1.5%
  timeline: string; // e.g., "Instant" or "1 - 3 business days"
  rate: number; // e.g., 1500 = 1 USD ~ 1500 NGN
}

export const fundingMethodsMap: Record<string, FundingMethod[]> = {
  NAIRA: [
    {
      type: "card",
      label: "Card Payment",
      description: "Fund your wallet using debit or credit card",
      icon: "/icons/card.svg",
      feePercentage: 1.5, // 1.5% card processing fee
      timeline: "Instant",
      rate: 1500, // 1 USD = ₦1500
    },
    {
      type: "bank_transfer",
      label: "Bank Transfer",
      description: "Send funds directly from your bank account",
      icon: "/icons/bank.svg",
      feePercentage: 0.5, // 0.5% for transfer
      timeline: "5 - 15 mins",
      rate: 1500,
    },
  ],
  USD: [
    {
      type: "card",
      label: "Card Payment (USD)",
      description: "Use your card to fund in USD",
      icon: "/icons/card.svg",
      feePercentage: 2.0, // 2% fee
      timeline: "Instant",
      rate: 1.0, // USD is base
    },
    {
      type: "bank_transfer",
      label: "Wire Transfer",
      description: "Fund via international bank transfer",
      icon: "/icons/bank.svg",
      feePercentage: 1.0, // 1% fee
      timeline: "1 - 3 business days",
      rate: 1.0,
    },
  ],

  GHS: [
    {
      type: "mobile_money",
      label: "Mobile Money (Ghana)",
      description: "Fund via MTN or Airtel Tigo",
      icon: "/icons/mobile-money.svg",
      feePercentage: 1.2, // 1.2% mobile money fee
      timeline: "Instant",
      rate: 12, // 1 USD = 12 GHS (example)
    },
  ],

  KES: [
    {
      type: "mobile_money",
      label: "M-Pesa",
      description: "Fund via M-Pesa Kenya",
      icon: "/icons/mpesa.svg",
      feePercentage: 1.0, // 1% fee
      timeline: "Instant",
      rate: 150, // 1 USD = 150 KES (example)
    },
  ],

  UGX: [
    {
      type: "mobile_money",
      label: "MTN Uganda",
      description: "Fund via MTN Uganda mobile money",
      icon: "/icons/mobile-money.svg",
      feePercentage: 1.0, // 1% fee
      timeline: "Instant",
      rate: 3800, // 1 USD = 3800 UGX (example)
    },
  ],
};
