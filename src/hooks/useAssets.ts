import { assetService } from "@/api/asset.api";
import type { IAsset } from "@/interfaces/asset.interface";
import type { IParams } from "@/interfaces/params.interface";
import { useQuery } from "@tanstack/react-query";

export const useTrendingAssets = (params?: IParams) => {
  return useQuery<any, Error>({
    queryKey: ["trending-assets", params],
    queryFn: () => assetService.getTrendingAssets(params),
  });
};

export const useGetAssets = (params?: IParams) => {
  return useQuery<any, Error>({
    queryKey: ["assets", params],
    queryFn: () => assetService.getAssets(params),
  });
};

export const useAsset = ({ asset_symbol }: { asset_symbol: string }) => {
  return useQuery<IAsset, Error>({
    queryKey: ["asset", asset_symbol],
    queryFn: () => assetService.getAsset(asset_symbol),
  });
};
