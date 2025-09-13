import type { IAsset } from "@/interfaces/asset.interface";
import { cn } from "@/lib/utils";
import AssetCard from "@/components/shared/asset/asset-card";
import AssetCardSkeleton from "@/components/shared/asset/asset-card-skeleton";

interface AssetGridProps {
  items: { asset: IAsset }[];
  isLoading: boolean;
  isError: boolean;
  isGrid?: boolean;
}

export default function AssetGrid({
  items,
  isGrid = false,
  isError,
  isLoading,
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
      {items.map((item) => (
        <AssetCard key={item.asset.id} item={item} variant={variant} />
      ))}
    </div>
  );
}
