import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class WalletService {
  getWalletBalance = async (params?: any) => {
    try {
      const response = await axiosInstance.get(`/wallets`, { params });
      const data = response.data;

      console.log({ data });

      return data || [];
    } catch (error) {
      handleAxiosError(error, "failed to create security pin");
    }
  };
}

export const walletService = new WalletService();
