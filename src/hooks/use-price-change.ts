import { useEffect, useRef, useState } from "react";

export type PriceDirection = "up" | "down" | null;

export function usePriceChange(price?: number, resetMs = 800) {
  const prevPriceRef = useRef<number | null>(null);
  const [direction, setDirection] = useState<PriceDirection>(null);

  useEffect(() => {
    if (typeof price !== "number") return;

    const prev = prevPriceRef.current;

    if (prev !== null && prev !== price) {
      if (price > prev) {
        setDirection("up");
      } else if (price < prev) {
        setDirection("down");
      }

      const timeout = setTimeout(() => {
        setDirection(null);
      }, resetMs);

      return () => clearTimeout(timeout);
    }

    prevPriceRef.current = price;
  }, [price, resetMs]);

  return direction;
}
