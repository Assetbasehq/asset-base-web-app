import type { IAsset } from "@/interfaces/asset.interface";
import { cn } from "@/lib/utils";
import AssetCard from "@/components/shared/asset/asset-card";
import AssetCardSkeleton from "@/components/shared/asset/asset-card-skeleton";
import type { IWatchlist } from "@/interfaces/watchlist.interface";

interface AssetGridProps {
  assets: IAsset[];
  isLoading: boolean;
  isError: boolean;
  isGrid?: boolean;
  userWatchlist?: IWatchlist[];
}

export default function AssetGrid({
  assets,
  isGrid = false,
  isError,
  isLoading,
  userWatchlist = [],
}: AssetGridProps) {
  const variant = isGrid ? "card-detailed" : "compact";

  if (isError) {
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={cn(
          "flex flex-col gap-4 w-full mt-6",
          isGrid && "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        )}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <AssetCardSkeleton key={i} variant={variant} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-4 w-full mt-6",
        isGrid && "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      )}
    >
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          variant={variant}
          userWatchlist={userWatchlist}
        />
      ))}
    </div>
  );
}
