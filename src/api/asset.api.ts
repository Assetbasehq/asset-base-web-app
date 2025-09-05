import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class AssetService {
  getTrendingAssets = async (params?: any) => {
    try {
      const response = await axiosInstance.get(`/assets/trending`, { params });
      const items = response.data?.items;
      return items || [];
    } catch (error) {
      handleAxiosError(error, "failed to create security pin");
    }
  };
  getAssets = async (params?: any) => {
    try {
      const response = await axiosInstance.get(`/assets/trending`, { params });
      const items = response.data?.items;
      return items || [];
    } catch (error) {
      handleAxiosError(error, "failed to create security pin");
    }
  };
  getAsset = async (assetId: string) => {
    try {
      const response = await axiosInstance.get(`/assets/${assetId}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "failed to create security pin");
    }
  };
}

export const assetService = new AssetService();
