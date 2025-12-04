import { flags } from "@/constants/images";

export const currencyToName: Record<string, string> = {
  ngn: "Nigerian Naira",
  usd: "US Dollar",
  ghs: "Ghanaian Cedis",
  kes: "Kenyan Shillings",
  ugx: "Ugandan Shillings",
};

export const currencyToFlag: Record<string, string> = {
  ngn: flags.nigeria.flag,
  usd: flags.usa.flag,
  ghs: flags.ghana.flag,
  kes: flags.kenya.flag,
  ugx: flags.uganda.flag,
};

export const currencyToSymbol: Record<string, string> = {
  ngn: "₦",
  usd: "$",
  ghs: "₵",
  kes: "KSh",
  ugx: "USh",
};

export const CurrencyService = {
  /**
   * Get the full currency name from its code.
   * @param code - Currency code (e.g., "ngn")
   * @returns Full currency name or undefined if not found
   */
  getCurrencyName: (code: string): string | undefined => {
    if (!code) return undefined;
    return currencyToName[code.toLowerCase()] || undefined;
  },

  /**
   * Get the currency flag image from its code.
   * @param code - Currency code (e.g., "ngn")
   * @returns Flag URL or undefined if not found
   */
  getCurrencyFlag: (code: string): string | undefined => {
    if (!code) return undefined;
    return currencyToFlag[code.toLowerCase()] || undefined;
  },

  getCurrencySymbol: (code: string): string | undefined => {
    if (!code) return undefined;
    return currencyToSymbol[code.toLowerCase()] || undefined;
  },
};
