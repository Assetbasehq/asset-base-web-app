import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import { Link } from "react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { IAsset } from "@/interfaces/asset.interface";
import { formatService } from "@/services/format-service";
import { useAssets } from "@/hooks/useAssets";

export default function TrendingSecurities() {
  const { data, isLoading, isError } = useAssets();

  return (
    <Card className="p-4 md:p-4  bg-custom-card border-none shadow-none text-start ">
      <CardHeader className=" p-0 flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-md md:text-lg">Trending Securities</h2>
          <p className="text-xs md:text-sm text-custom-grey">
            Top Performing securites on AssetBase
          </p>
        </div>
        <Link
          to="#"
          className="text-custom-orange font-semibold cursor-pointer underline text-xs md:text-sm"
        >
          view all
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <Securities data={data || []} isLoading={isLoading} isError={isError} />
      </CardContent>
    </Card>
  );
}

function Securities({
  data,
  isLoading,
  isError,
}: {
  // data: { asset: IAsset; number_of_investors: number }[] | undefined;
  data: IAsset[] | undefined;
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) return <SecuritiesSkeleton />;

  if (isError)
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    );

  if (!data) return <p>No data</p>;

  console.log({ data });

  return (
    <div className="flex gap-2 overflow-scroll w-full no-scrollbar">
      {data.map((asset, i) => {
        const assetLink =
          asset.trading_type === "primary"
            ? `/dashboard/launchpad/${asset?.slug}`
            : `/dashboard/assets/${asset?.slug}`;

        return (
          <Link
            to={assetLink}
            key={i}
            className=" bg-custom-light-bg flex gap-2 s-center justify-between rounded-lg p-2"
          >
            <div className="flex s-end text-start w-full">
              <div className="flex items-center gap-4">
                <img
                  src={asset.logo}
                  alt={asset.asset_name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="font-semibold">{asset.asset_symbol}</h2>
                  <small className="text-xs">
                    {formatService.formatCurrency(
                      asset.price_per_share,
                      asset.currency
                    )}
                  </small>
                </div>
              </div>
              {/* <p className="text-green-400 text-xs">{item.price_change_24hrs}</p> */}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function SecuritiesSkeleton() {
  return (
    <div className="flex gap-2 overflow-scroll w-full no-scrollbar">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => (
        <div
          key={i}
          className=" bg-custom-light-bg flex gap-2 items-center justify-between rounded-lg p-2"
        >
          <div className="flex items-end text-start gap-16 w-full">
            <div className="flex items-center gap-2">
              <img src={assetBaseLogo} alt="" className="w-10 h-10" />
              <div>
                <h2 className="font-semibold">
                  <Skeleton className="h-3 w-20 rounded-full" />
                </h2>
                <small className="text-xs">
                  <Skeleton className="h-3 w-20 rounded-full" />
                </small>
              </div>
            </div>
            <p className="text-green-400 text-xs">
              <Skeleton className="h-3 w-20 rounded-full" />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
