import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleAxiosError = (
  error: any,
  alternateMessage?: string
): string => {
  console.log({
    message: error.response?.data?.message,
    responseData: error.response?.data,
  });

  if (!error) {
    throw new Error("An unknown error occurred");
  }

  if (error instanceof AxiosError && error.response?.status === 422) {
    throw new Error(error.response?.data?.message || alternateMessage);
  }

  if (error instanceof AxiosError && error.response?.status === 409) {
    throw new Error(error.response?.data?.message || alternateMessage);
  }

  if (error instanceof AxiosError) {
    throw new Error(error.response?.data?.message || alternateMessage);
  }
  throw error;
};

export const formatDate = (date: string | Date | undefined): string => {
  if (!date) return "";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return new Date(date).toLocaleDateString("en-CA", options);
};

// returns: 19th June 2025
export function formatPrettyDate(dateString: string) {
  // Helper function to get the ordinal suffix

  if (!dateString) return " - ";

  function getOrdinalSuffix(day: number) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  // Create a Date object from the ISO 8601 string
  const date = new Date(dateString);

  const day = date.getDate();
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

  return `${dayWithSuffix} ${monthName} ${year}`;
}

export function getDeviceId() {
  let deviceId = localStorage.getItem("device_id");
  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem("device_id", deviceId);
  }
  return deviceId;
}

export function formatUSD(amount: number | null | undefined): string {
  if (amount == null || isNaN(amount)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNaira(amount: number | null | undefined): string {
  if (amount == null || isNaN(amount)) return "₦0.00";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(amount: number | null | undefined): string {
  if (amount == null || isNaN(amount)) return "0";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateRaisePercentage(
  totalShares: number | null | undefined,
  availableShares: number | null | undefined
): number {
  if (
    totalShares == null ||
    availableShares == null ||
    isNaN(totalShares) ||
    isNaN(availableShares) ||
    totalShares <= 0
  ) {
    return 0;
  }

  const raisedShares = totalShares - availableShares;
  return Math.floor((raisedShares / totalShares) * 100);
}

export function toCompactAmount(amount: number, decimals = 1): string {
  if (amount === null || amount === undefined || isNaN(amount)) return "0";

  const absValue = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";

  if (absValue >= 1_000_000_000) {
    return `${sign}${(absValue / 1_000_000_000).toFixed(decimals)}B`;
  } else if (absValue >= 1_000_000) {
    return `${sign}${(absValue / 1_000_000).toFixed(decimals)}M`;
  } else if (absValue >= 1_000) {
    return `${sign}${(absValue / 1_000).toFixed(decimals)}K`;
  }

  return `${sign}${absValue.toFixed(0)}`;
}

export function truncateWalletAddress(address: string | null | undefined, length = 8): string {
  if (address == null || address.length < length * 2) return "";
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}
