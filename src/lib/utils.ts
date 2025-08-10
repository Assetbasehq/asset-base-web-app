import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
