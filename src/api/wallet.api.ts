import config from "@/config";
import axiosInstance, { web3axiosInstance } from "@/lib/axios.config";
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
      const response = await web3axiosInstance.get(`/wallet/deposit-crypto`);
      const data = response.data?.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to deposit crypto");
    }
  };

  getCryptoWalletBalance = async () => {
    try {
      const response = await web3axiosInstance.get(`/wallet/balance`);
      const data = response.data?.data;

      console.log({ data });

      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to get crypto wallet balance");
    }
  };

  // BlockChain
  getAddressTransactions = async (address: string) => {
    try {
      const response = await axios.get(
        `https://scan-testnet.assetchain.org/addresses/${address}/transactions`
      );
      const data = response.data;

      console.log({ data, response });

      return data;
    } catch (error) {
      console.log({ error });

      handleAxiosError(error, "Failed to get address transactions");
    }
  };
}

export const walletService = new WalletService();
