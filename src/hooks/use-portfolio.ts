import { valuationService } from "@/api/valuation.api";
import { useQuery } from "@tanstack/react-query";

export const useGetPortfolioOverview = ({ currency }: { currency: string }) => {
  return useQuery<any, Error>({
    queryKey: ["portfolio-overview", currency],
    queryFn: () => valuationService.getPortfolioOverview({ currency }),
  });
};

export const useGetPortfolioTrend = ({
  start_date,
  end_date,
  currency,
}: {
  start_date: string;
  end_date: string;
  currency: string;
}) => {
  return useQuery<any, Error>({
    queryKey: ["portfolio-trend", start_date, end_date, currency],
    queryFn: () =>
      valuationService.getPortfolioTrend({ start_date, end_date, currency }),
  });
};
