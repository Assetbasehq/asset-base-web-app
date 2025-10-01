import type { IOMethod } from "@/interfaces/wallet.interfae";

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
  console.log({ method });

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
