import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useAssetMarketPrice } from "@/hooks/use-trade";
import type { IAsset } from "@/interfaces/asset.interface";
import { cn } from "@/lib/utils";
import { formatService } from "@/services/format-service";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiErrorWarningLine,
  RiShareForwardLine,
} from "react-icons/ri";

interface AssetInfoProps {
  asset: IAsset;
  isChecked: boolean;
  onSwitch: (value: boolean) => void;
}

export default function AssetInfo({
  asset,
  isChecked,
  onSwitch,
}: AssetInfoProps) {
  const {
    data: assetMarketPriceData,
    isLoading: isLoadingMarketPrice,
    isError,
  } = useAssetMarketPrice({
    assetWeb3ServiceId: asset?.web3_service_id || "",
  });

  const assetMarketPrice =
    !isLoadingMarketPrice && assetMarketPriceData
      ? assetMarketPriceData?.data?.buyingPrice
      : 0;

  console.log({ assetMarketPrice });

  return (
    <Card className="bg-custom-card border-none text-start shadow-none py-0">
      <CardContent className="text-white p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={asset.logo}
                alt={asset.asset_symbol}
                className="w-8 sm:w-12"
              />
              <div>
                <p className="font-semibold text-lg">{asset.asset_symbol}</p>
                <p className="text-muted-foreground text-sm">
                  {asset.asset_name}
                </p>
              </div>
            </div>
            <RiShareForwardLine className="w-12 h-12 sm:h-14 sm:w-14 bg-custom-light-bg p-4 rounded-full" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex flex-col gap-2 mb-2 md:mb-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-xl sm:text-3xl text-custom-white-text flex items-center gap-2">
                  {isLoadingMarketPrice ? (
                    <Skeleton className="h-8 w-full rounded-md" />
                  ) : (
                    <span className="font-semibold text-xl sm:text-3xl text-custom-white-text">
                      {formatService.formatCurrency(
                        assetMarketPrice,
                        asset.currency,
                        6
                      )}
                    </span>
                  )}
                  <span>
                    {isError && <RiErrorWarningLine size={18} className="" />}
                  </span>
                </p>
                <small
                  className={cn("text-muted-foreground", {
                    // "text-green-400": asset.price_change_24hrs.includes("+"),
                    // "text-red-400": asset.price_change_24hrs.includes("-"),
                  })}
                >
                  {/* {asset.price_change_24hrs} */}
                </small>
              </div>
              <p className="text-muted-foreground text-sm hidden md:block">
                At close:{" "}
                <span className="font-semibold text-custom-white-text">
                  {/* {asset.round_closes} */}
                </span>
              </p>
            </div>

            <div className="flex gap-2 sm:gap-4">
              <div className="flex flex-col gap-1 bg-custom-light-bg rounded-lg px-4 py-1 w-fir">
                <small className="text-muted-foreground text-xs sm:text-sm md:text-base">
                  24hr Volume
                </small>
                <p className="font-semibold text-custom-white-text text-sm sm:text-lg">
                  {formatService.formatToCompactAmount(23000, "usd", 2)}
                </p>
              </div>
              <div className="flex flex-col gap-1 bg-custom-light-bg rounded-lg px-4 py-1 w-fit">
                <small className="text-muted-foreground text-xs sm:text-sm md:text-base">
                  Interest Rate
                </small>
                <p className="font-semibold text-custom-white-text text-sm sm:text-lg">
                  10%
                </p>
              </div>
              <div className="flex flex-col gap-1 bg-custom-light-bg rounded-lg px-4 py-1 w-fit">
                <small className="text-muted-foreground text-xs sm:text-sm md:text-base">
                  Market Cap
                </small>
                <p className="font-semibold text-custom-white-text text-sm sm:text-lg">
                  {formatService.formatToCompactAmount(145000, "usd", 2)}
                </p>
              </div>
            </div>
          </div>

          <div className="border p-2 sm:p-6 rounded-lg grid grid-cols-2 gap-4 md:grid-cols-4 text-custom-white-text">
            {/* 24h High */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <RiArrowDownLine className="md:h-5 md:w-5 text-red-500" />
                <p className="text-xs md:text-lg">24h High</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs md:text-lg">{asset.price_per_share}</p>
                {/* <small
                  className={cn("text-muted-foreground text-xs", {
                    "text-green-400": asset.price_change_24hrs.includes("+"),
                    "text-red-400": asset.price_change_24hrs.includes("-"),
                  })}
                >
                  {asset.price_change_24hrs}
                </small> */}
              </div>
            </div>

            {/* 24h Low */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <RiArrowUpLine className="md:h-5 md:w-5 text-green-500" />
                <p className="text-xs md:text-lg">24h Low</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs md:text-lg">{asset.price_per_share}</p>
                {/* <small
                  className={cn("text-muted-foreground text-xs", {
                    "text-green-400": asset.price_change_24hrs.includes("+"),
                    "text-red-400": asset.price_change_24hrs.includes("-"),
                  })}
                >
                  {asset.price_change_24hrs}
                </small> */}
              </div>
            </div>
          </div>

          <div className="bg-custom-blue-shade text-custom-white-text px-4 py-2 rounded-lg flex gap-1 flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-start gap-2 md:hidden">
              <RiErrorWarningLine className="!w-8 !h-8  " />
              <div className="flex flex-col gap-1">
                <div>
                  <p className=" text-custom-grey text-xs md:text-sm tracking-wide leading-4">
                    Looking for more insights? The pro view allows experienced
                    traders to view charts and more
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg md:text-lg font-medium">
                    Switch to Pro
                  </h2>
                  <Switch
                    id="pro-mode"
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      console.log({ checked });

                      onSwitch(checked);
                    }}
                    className="border-2 data-[state=unchecked]:border-white data-[state=checked]:border-custom-orange !data-[state=unchecked]:bg-transparent data-[state=checked]:bg-transparent w-10 h-[1.3rem] cursor-pointer px-1"
                  />
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4 w-full justify-between">
              <div className="flex gap-2">
                <RiErrorWarningLine className="!w-8 !h-8 " />
                <div>
                  <h2>Looking for more insights?</h2>
                  <p className=" text-custom-grey text-xs md:text-sm tracking-wide leading-4">
                    The pro view allows experienced traders to view charts and
                    more
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-lg font-medium">
                  Switch to Pro
                </h2>
                <Switch
                  // checked={isChecked}
                  onCheckedChange={(checked) => {
                    console.log({ checked });

                    onSwitch(checked);
                  }}
                  className="border-2 data-[state=unchecked]:border-white data-[state=checked]:border-custom-orange !data-[state=unchecked]:bg-transparent data-[state=checked]:bg-transparent w-10 h-[1.3rem] cursor-pointer px-1"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
