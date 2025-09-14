import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import { Link } from "react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetTrendingAssets } from "@/hooks/useAssets";
import { Skeleton } from "@/components/ui/skeleton";
import type { IAsset } from "@/interfaces/asset.interface";
import AssetCard from "@/components/shared/asset/asset-card";

export default function LaunchPad() {
  const { data, isLoading, isError } = useGetTrendingAssets();

  // if (isLoading) return <LaunchPadSkeleton />;

  return (
    <Card className=" p-4 md:p-4 bg-custom-card text-custom-white-text rounded-lg text-start border-none shadow-none gap-4">
      <CardHeader className=" p-0 flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-md md:text-lg">Launchpad</h2>
          <p className="text-xs md:text-sm text-custom-grey">
            A curated list of securities you can fund
          </p>
        </div>
        <Link
          to="/dashboard/assets"
          className="text-custom-orange font-semibold cursor-pointer underline text-xs md:text-sm"
        >
          view all
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col gap-4 items-stretch">
          <Assets data={data || []} isLoading={isLoading} isError={isError} />
        </div>
      </CardContent>
    </Card>
  );
}

function Assets({ data, isLoading, isError }: any) {
  if (isLoading) return <AssetsSkeleton />;

  if (isError)
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    );

  return (
    <div
      className="flex gap-4 overflow-scroll w-full no-scrollbar"
      style={{
        backgroundImage: `url(${assetBaseLogo})`,
      }}
    >
      {data.map((item: { asset: IAsset }) => (
        <AssetCard key={item?.asset?.id} asset={item?.asset} variant="card" />
      ))}
    </div>
  );
}

function AssetsSkeleton() {
  return (
    <div
      className="flex gap-4 overflow-scroll w-full no-scrollbar"
      style={{
        backgroundImage: `url(${assetBaseLogo})`,
      }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-custom-light-bg flex flex-col gap-2 items-start rounded-lg p-2 min-w-82"
        >
          <div className="flex items-center gap-2">
            <Skeleton
              className="h-12 w-12 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            />
            <div className="flex flex-col gap-2">
              <Skeleton
                className="h-4 w-20 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              />
              <Skeleton
                className="h-3 w-40 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              />
            </div>
          </div>
          <Skeleton
            className="h-2 w-76 rounded-lg"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          />
          <Skeleton
            className="h-3 w-full rounded-lg"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          />
          <div className="flex gap-1 justify-between items-start w-full">
            <Skeleton
              className="h-2 w-20 rounded-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            />
            <Skeleton
              className="h-2 w-20 rounded-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            />
          </div>

          <div className=" w-full flex flex-col gap-1 bg-[#93939417] p-2">
            <div className="flex gap-1 justify-between items-start w-full">
              <Skeleton
                className="h-3 w-20 rounded-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              />

              <Skeleton
                className="h-3 w-20 rounded-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              />
            </div>
            <div className="flex gap-1 justify-between items-start w-full">
              <Skeleton
                className="h-3 w-24 rounded-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              />
              <Skeleton
                className="h-3 w-20 rounded-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
