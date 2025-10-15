import type { IOMethod } from "@/interfaces/wallet.interfae";
import { FormatService } from "@/services/format-service";

export const getAvailableIOMethods = (
  ioMethods: IOMethod[] = [],
  destinationWalletCode: string | null,
  sourceCurrencyCode: string | undefined | null
) => {
  if (!destinationWalletCode || !sourceCurrencyCode) return [];

  return ioMethods.filter((method: IOMethod) => {
    return (
      method.currency.code.toLowerCase() ===
        sourceCurrencyCode?.toLowerCase() &&
      method.destination_wallets.includes(
        destinationWalletCode?.toLowerCase() as string
      )
    );
  });
};

export const getIOMethodFee = (method: IOMethod) => {
  switch (method.fee.type) {
    case "flat":
      if (method.fee.value === 0) return "No Fee";
      return `${method.currency.symbol}${method.fee.value}`;
    case "percentage":
      return `${method.fee.value}%`;
    case "added_percentage":
      return `${method.fee.value}% + ${method.currency.symbol}${method.fee.additional_value}`;
    case "capped_added_percentage":
      return `${method.fee.value}%`;
    // case "capped_added_percentage":
    //   return `${method.fee.value}% + ${method.currency.symbol}${method.fee.cap}`;
    default:
      return `No Fee`;
  }
};

export const calculateIOMethodFee = (
  amount: number | string | null | undefined,
  method: IOMethod | undefined | null
): number => {
  if (!method) return 0;
  if (!amount) return 0;
  if (isNaN(Number(amount))) return 0;

  const { fee } = method;

  switch (fee.type) {
    case "flat":
      return fee.value;
    case "percentage":
      return (fee.value / 100) * Number(amount);
    case "added_percentage":
      return (fee.value / 100) * Number(amount) + (fee.additional_value ?? 0);
    case "capped_added_percentage":
      // const rawFee = (fee.value / 100) * amount;
      // const additional_value = fee.additional_value ?? 0;
      // return Math.min(rawFee + additional_value, fee.cap ?? rawFee);
      return (fee.value / 100) * Number(amount);
    default:
      return 0;
  }
};

export const getIOMethodDisplayName = (method: IOMethod) => {
  if (method.channel === "mobile_money") {
    return `${method.network_name}`;
  }

  if (method.channel === "api_vendor" && method.provider === "risevest") {
    return `Fund With Rise Wallet`;
  }

  return method.channel;
};

export const getIOMethodRate = (method: IOMethod) => {
  if (method.destination_wallets.includes("ngn")) {
    return `$1 ~ ${method.currency.symbol}${method.currency.buy_rate}`;
  }

  if (method.destination_wallets.includes("usd")) {
    return `$1 ~ ${method.currency.symbol}${method.currency.buy_rate}`;
  }

  return `$1 ~ ${method.currency.symbol}${method.currency.buy_rate}`;
};

export const normalizeCurrencyInput = (input: string) => {
  const cleanedAmount = input.replace(/,/g, "");
  if (isNaN(Number(cleanedAmount))) {
    return { amount: "", formattedAmount: "" };
  }

  if (cleanedAmount === "0") {
    return { amount: "", formattedAmount: "" };
  }

  if (cleanedAmount === "") {
    return { amount: "", formattedAmount: "" };
  }

  if (cleanedAmount === ".") {
    return { amount: "", formattedAmount: "" };
  }

  if (cleanedAmount.includes(".")) {
    const [whole, decimal = ""] = cleanedAmount.split(".");
    // Reject multiple dots
    if (cleanedAmount.split(".").length > 2) {
      return { amount: "", formattedAmount: "" };
    }

    // Limit decimals to 2
    const safeDecimal = decimal.slice(0, 2);
    const rawAmount = `${whole}.${safeDecimal}`;
    const formattedWhole = FormatService.formatWithCommas(Number(whole) || 0);
    const formatted =
      safeDecimal !== ""
        ? `${formattedWhole}.${safeDecimal}`
        : `${formattedWhole}${decimal === "" ? "." : ""}`;

    return {
      amount: rawAmount,
      formattedAmount: formatted,
    };
  }
  // Pure integer
  const rawAmount = String(Number(cleanedAmount) || 0);
  const formatted = FormatService.formatWithCommas(Number(cleanedAmount) || 0);

  return {
    amount: rawAmount,
    formattedAmount: formatted,
  };
};
