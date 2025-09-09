import config from "@/config";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";
import axios from "axios";

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

  getNewWalletBalance = async (params?: any) => {
    try {
      // const response = await axiosInstance.get(`/wallets`, { params });
      const response = await axios.get(
        `${config.CLIENT_NEW_API_URL}/wallet/balance`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params,
        }
      );
      const data = response.data;

      console.log({ data });

      return data || [];
    } catch (error) {
      handleAxiosError(error, "failed to create security pin");
    }
  };

  depositCrypto = async () => {
    try {
      const response = await axios.get(
        `${config.CLIENT_NEW_API_URL}/wallet/deposit-crypto`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = response.data;

      console.log({ data });

      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to deposit crypto");
    }
  };
  
  getCryptoWalletBalance = async () => {
    try {
      const response = await axios.get(
        `${config.CLIENT_NEW_API_URL}/wallet/balance`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = response.data;

      console.log({ data });

      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to get crypto wallet balance");
    }
  };
}

export const walletService = new WalletService();
