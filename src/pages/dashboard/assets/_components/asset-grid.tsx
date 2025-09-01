import type { IAsset } from "@/interfaces/asset.interface";
import React from "react";
import AssetCard from "../../dashboardHome/_cards/asset-card";

interface AssetGridProps {
  items: {
    asset: IAsset;
  }[];
  isGrid?: boolean;
}

export default function AssetGrid({ items, isGrid }: AssetGridProps) {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {items.map((item: { asset: IAsset }) => (
        <AssetCard key={item?.asset?.id} item={item} variant="card" />
      ))}
    </div>
  );
}
