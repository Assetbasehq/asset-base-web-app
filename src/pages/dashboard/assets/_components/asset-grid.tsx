import type { IAsset } from "@/interfaces/asset.interface";
import AssetCard from "../../dashboardHome/_cards/asset-card";
import AssetCardSkeleton from "../_skeletons/asset-card-skeleton";

interface AssetGridProps {
  items: {
    asset: IAsset;
  }[];
  isLoading: boolean;
  isGrid?: boolean;
}

export default function AssetGrid({
  items,
  isGrid,
  isLoading,
}: AssetGridProps) {
  if (isLoading && !isGrid) {
    return (
      <div className="flex flex-col gap-4 w-full mt-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <AssetCardSkeleton key={i} variant="compact" />
        ))}
      </div>
    );
  }

  if (isLoading && isGrid) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <AssetCardSkeleton key={i} variant="card" />
        ))}
      </div>
    );
  }

  if (!isGrid) {
    return (
      <div className="flex flex-col gap-4 w-full mt-6">
        {items.map((item: { asset: IAsset }) => (
          <AssetCard key={item?.asset?.id} item={item} variant="compact" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
      {items.map((item: { asset: IAsset }) => (
        <AssetCard key={item?.asset?.id} item={item} variant="card" />
      ))}
    </div>
  );
}
