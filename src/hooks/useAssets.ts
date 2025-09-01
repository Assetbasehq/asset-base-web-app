import { assetService } from "@/api/asset.api";
import { useQuery } from "@tanstack/react-query";

export const useGetTrendingAssets = () => {
  return useQuery<any, Error>({
    queryKey: ["trending-assets"],
    queryFn: () => assetService.getTrendingAssets(),
  });
};

export const useGetAssets = () => {
  return useQuery<any, Error>({
    queryKey: ["assets"],
    queryFn: () => assetService.getTrendingAssets(),
  });
};
