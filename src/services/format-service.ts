// src/services/format.service.ts

export class FormatService {
  /**
   * Formats a number into a USD currency string
   * Example: 1234.56 => "$1,234.56"
   */
  static formatToUSD(amount: number | null | undefined): string {
    if (amount == null || isNaN(amount)) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  /**
   * Formats a number into a Nigerian Naira currency string
   * Example: 1234.56 => "₦1,234.56"
   */
  static formatToNaira(amount: number | null | undefined): string {
    if (amount == null || isNaN(amount)) return "₦0.00";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  /**
   * Formats a number with commas (no currency symbol)
   * Example: 1234567 => "1,234,567"
   */
  static formatWithCommas(amount: number | null | undefined): string {
    if (amount == null || isNaN(amount)) return "0";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  /**
   * Converts a large number into a compact form
   * Example:
   * 1234 => "1.2K", 1234567 => "1.2M", 1500000000 => "1.5B"
   */
  static formatToCompactAmount(
    amount: number | string | null | undefined,
    currency: "USD" | "NGN" = "USD",
    decimals = 1
  ): string {
    const numericAmount =
      typeof amount === "string"
        ? parseFloat(amount.replace(/,/g, ""))
        : amount;

    if (numericAmount == null || isNaN(numericAmount)) {
      return currency === "USD" ? "$0" : "₦0";
    }

    return new Intl.NumberFormat(currency === "USD" ? "en-US" : "en-NG", {
      style: "currency",
      currency: currency,
      notation: "compact",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(numericAmount);
  }

  /**
   * Calculates the percentage of shares raised
   * Example: totalShares = 1000, availableShares = 250 => 75
   */
  static calculateRaisedSharesPercentage(
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

  /**
   * formats a name that takes the name and return the name or name and ... if it is more than 15 chars
   */
  static formatName(name: string | null | undefined): string {
    if (name == null) {
      return "";
    }

    const trimmedName = name.trim();
    if (trimmedName.length <= 15) {
      return trimmedName;
    }

    return `${trimmedName.substring(0, 12)}...`;
  }

  static truncateString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + "...";
    }
    return str;
  }

  /**
   * Formats a string:
   * - Leaves all-uppercase strings as is.
   * - Converts snake_case to "Capitalized Words".
   *
   * Examples:
   *   "bank_transfer" -> "Bank Transfer"
   *   "MOBILE_MONEY" -> "MOBILE_MONEY"
   */
  static formatSelectText(text: string): string {
    if (!text) return "";

    // If the entire text is already uppercase, return as is
    if (text === text.toUpperCase()) {
      return text;
    }

    // Replace underscores with spaces and capitalize each letter in each word
    return text
      .replace(/_/g, " ") // Replace underscores with spaces
      .split(" ") // Split into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
}
