import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class WatchlistService {
  getUserWatchlist = async (params?: any) => {
    try {
      const response = await axiosInstance.get(`/watchlist`, { params });
      const data = response.data;
      return data || [];
    } catch (error) {
      handleAxiosError(error, "failed to get user watchlist");
    }
  };
  addToUserWatchlist = async (payload: { asset_id: string }) => {
    try {
      const response = await axiosInstance.post(`/watchlist`, payload);
      const items = response.data?.items;
      return items || [];
    } catch (error) {
      handleAxiosError(error, "failed to add asset to watchlist");
    }
  };
  removeFromUserWatchlist = async (payload: { asset_id: string }) => {
    console.log({ payload });

    try {
      const response = await axiosInstance.delete(
        `/watchlist/${payload.asset_id}`
      );

      console.log({ response });

      const items = response.data?.items;
      return items || [];
    } catch (error) {
      handleAxiosError(error, "failed to remove asset from watchlist");
    }
  };
}

export const watchlistService = new WatchlistService();
