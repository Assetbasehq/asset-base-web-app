import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { flags } from "@/constants/images";
import { useGetPortfolioOverview } from "@/hooks/use-portfolio";
import { FormatService } from "@/services/format-service";
import { useState } from "react";

export default function TotalAssets() {
  const [currency, setCurrency] = useState<"usd" | "ngn">("usd");

  const balance = "450000";

  const {
    data: portfolioOverview,
    isLoading: isPortfolioLoading,
    isError: isPortfolioError,
  } = useGetPortfolioOverview({
    currency,
  });

  const handleCurrencyChange = (value: string) => {
    setCurrency(value as "usd" | "ngn");
  };

  const InvestmentBalance = FormatService.formatToCompactAmount(
    portfolioOverview?.balance,
    currency,
    2
  );

  // if (true) {
  //   return <TotalAssetsSkeleton />;
  // }

  return (
    <Card className=" p-0 flex flex-col gap-1 bg-custom-card text-custom-white-text rounded-lg text-start border-none shadow-none">
      <CardContent className="p-2 md:p-4">
        <CardHeader className="p-0">
          <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
        </CardHeader>
        <div className="flex items-center justify-between gap-6 w-full">
          <p className="text-lg md:text-2xl font-bold">{InvestmentBalance}</p>
          <Select defaultValue={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="USD" className="text-custom-white" />
            </SelectTrigger>
            <SelectContent className="min-w-fit">
              <SelectItem value="usd">
                <img
                  className="w-5 h-5"
                  src={flags.usa.flag}
                  alt={flags.usa.alt}
                />
                <span className="hidden md:inline">USD</span>
              </SelectItem>
              <SelectItem value="ngn">
                <img
                  className="w-5 h-5"
                  src={flags.nigeria.flag}
                  alt={flags.nigeria.alt}
                />
                <span className="hidden md:inline">NGN</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 text-sm md:text-lg">
          {/* <p className="text-green-400 text-sm">+1.25%</p> */}
          {/* <p className="text-custome-grey text-sm">+34,000 this week</p> */}
        </div>

        <div className="text-start grid grid-cols-2 gap-2 w-full mt-4">
          <div className=" bg-custom-light-bg p-2 rounded-xl">
            <small className="text-xs font-semibold text-muted-foreground">
              Holdings
            </small>
            <p className="text-sm md:text-md font-semibold">$150,000.45</p>
            <small className="text-xs text-green-400">+1.25% (24h)</small>
          </div>
          <div className="bg-custom-light-bg p-2 rounded-xl">
            <small className="text-xs font-semibold text-muted-foreground">
              All-Time Profit
            </small>
            <p className="text-sm md:text-md font-semibold">+$150,000.45</p>
            <small className="text-xs text-green-400">+100.25% (24h)</small>
          </div>
          <div className=" bg-custom-light-bg p-2 rounded-xl">
            <small className="text-xs font-semibold text-muted-foreground">
              Avg. Buy Price
            </small>
            <p className="text-sm md:text-md font-semibold">$9,100.45</p>
          </div>
          <div className=" bg-custom-light-bg p-2 rounded-xl">
            <small className="text-xs font-semibold text-muted-foreground">
              Cost Basis
            </small>
            <p className="text-sm md:text-md font-semibold">$50,000.45</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TotalAssetsSkeleton() {
  return (
    <div className="flex flex-col gap-2 items-start bg-custom-card text-white rounded-xl p-4">
      {/* Title */}
      <Skeleton className="h-5 w-28" />

      {/* Balance + Select */}
      <div className="flex items-center justify-between gap-6 w-full">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-20 rounded-md" />
      </div>

      {/* Change percentage + amount */}
      <div className="flex gap-2 text-lg font-semibold">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-28" />
      </div>

      {/* Grid stats */}
      <div className="grid grid-cols-2 gap-2 w-full">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-custom-card-foreground p-6 rounded-xl flex flex-col gap-3 w-full"
          >
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-6 w-44" />
            {i < 3 && <Skeleton className="h-4 w-44" />}
          </div>
        ))}
      </div>
    </div>
  );
}
