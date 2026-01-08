import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUserLiquidity } from "@/hooks/use-liquidity";
import { Skeleton } from "@/components/ui/skeleton";

export default function AvailableLiquidity() {
  const { data, isLoading } = useUserLiquidity();

  console.log({ data });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2 w-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <LiquidityCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2 w-full">
      {data?.items.map((liq) => (
        <Card
          key={liq.id}
          className="flex flex-col items-start gap-4 text-start border shadow-none bg-custom-light-bg p-0 "
        >
          <CardContent className="flex flex-col w-full p-4">
            <img src={assetBaseLogo} alt={"test"} className="w-8 h-8" />

            <div className="flex items-center gap-4 justify-between py-2">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium max-w-2xs">Test</h2>
                <p className="text-custom-grey max-w-lg text-xs">- </p>
              </div>
              <ChevronRight size={45} className="text-custom-orange" />
            </div>

            <Separator className="my-2" />

            <div className="flex flex-col gap-1 mt-auto">
              <div className="flex justify-between w-full">
                <p className="text-xs">Position Worth</p>
                <p className={cn("text-green-400 text-xs")}>-</p>
              </div>
              <div className={cn("flex justify-between w-full")}>
                <p className="text-xs">Interest Worth</p>
                <p
                  className={cn("text-custom-grey text-xs", {
                    // "text-green-400": liq.priceChange24hrs.includes("+"),
                    // "text-red-400": liq.priceChange24hrs.includes("-"),
                  })}
                >
                  -
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function LiquidityCardSkeleton() {
  return (
    <Card className="flex flex-col items-start gap-4 border shadow-none bg-custom-light-bg p-0">
      <CardContent className="flex flex-col w-full p-4 gap-3">
        {/* Logo */}
        <Skeleton className="w-8 h-8 rounded-full" />

        {/* Title + Chevron */}
        <div className="flex items-center justify-between py-2">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        <Separator className="my-2" />

        {/* Footer values */}
        <div className="flex flex-col gap-2 mt-auto">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
