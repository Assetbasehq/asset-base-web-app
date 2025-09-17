import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class WatchlistService {
  getUserWatchlist = async (params?: any) => {
    try {
      const response = await axiosInstance.get(`/watchlist`, { params });
      const data = response.data;
      return data || [];
    } catch (error) {
      handleAxiosError(error, "failed to create security pin");
    }
  };
  addToUserWatchlist = async (payload: { asset_id: string }) => {
    try {
      const response = await axiosInstance.post(`/watchlist`, payload);
      const items = response.data?.items;
      return items || [];
    } catch (error) {
      handleAxiosError(error, "failed to create security pin");
    }
  };
  removeFromUserWatchlist = async (payload: { asset_id: string }) => {
    try {
      const response = await axiosInstance.delete(`/watchlist/${payload.asset_id}`);
      const items = response.data?.items;
      return items || [];
    } catch (error) {
      handleAxiosError(error, "failed to create security pin");
    }
  };
}

export const watchlistService = new WatchlistService();
