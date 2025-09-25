import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class ExternalWalletService {
  getAllExternalWallets = async (params: {
    fetch_balance?: string;
    currency?: string;
    provider?: string;
    // wallet_type: "api_vendor";
    wallet_type?: string;
  }) => {
    try {
      const response = await axiosInstance.get(`/external-wallets`, { params });
      const data = response.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to create rise wallet");
    }
  };

  createRiseWallet = async (payload: {
    currency: "usd";
    provider: "risevest";
    wallet_type: "api_vendor";
    details: { token: string };
  }) => {
    try {
      const response = await axiosInstance.post(`/external-wallets`, payload);
      const data = response.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to create rise wallet");
    }
  };
}

export const externalWalletService = new ExternalWalletService();
