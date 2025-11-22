import type { IParams } from "@/interfaces/params.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class AssetService {
  getTrendingAssets = async (params?: IParams) => {
    try {
      const response = await axiosInstance.get(`/assets/trending`, { params });
      const items = response.data?.items;
      return items || [];
    } catch (error) {
      handleAxiosError(error, "failed to get trending assets");
    }
  };
  getAssets = async (params?: IParams) => {
    try {
      const response = await axiosInstance.get(`/assets`, { params });
      const items = response.data?.items;
      return items || [];
    } catch (error) {
      handleAxiosError(error, "failed to get assets");
    }
  };
  getAsset = async (assetId: string) => {
    try {
      const response = await axiosInstance.get(`/assets/${assetId}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "failed to = get asset");
    }
  };
}

export const assetService = new AssetService();
