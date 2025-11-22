import config from "@/config";
import type { IParams } from "@/interfaces/params.interface";
import axiosInstance, { web3axiosInstance } from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";
import axios from "axios";

class WalletService {
  getWallets = async (params?: any) => {
    try {
      const response = await axiosInstance.get(`/wallets`, { params });
      const data = response.data;
      return data || [];
    } catch (error) {
      handleAxiosError(error, "Failed to create security pin");
    }
  };

  walletExchange = async (payload?: {
    amount: number;
    src_currency: string;
    dest_currency: string;
    credential: string;
  }) => {
    try {
      const response = await axiosInstance.post(`/wallets/exchange`, payload);
      const data = response.data;
      return data || [];
    } catch (error) {
      handleAxiosError(error, "Failed to swap currency");
    }
  };

  getWalletTransactions = async (params?: IParams) => {
    try {
      const response = await axiosInstance.get(`/wallets/transactions`, {
        params,
      });
      const data = response.data;
      return data || [];
    } catch (error) {
      handleAxiosError(error, "Failed to swap currency");
    }
  };

  // getNewWalletBalance = async (params?: any) => {
  //   try {
  //     const response = await web3axiosInstance.get(`/wallet/balance`, {
  //       params,
  //     });
  //     const data = response.data;
  //     return data || [];
  //   } catch (error) {
  //     handleAxiosError(error, "failed to create security pin");
  //   }
  // };

  depositCrypto = async () => {
    try {
      const response = await web3axiosInstance.get(`/wallet/deposit-crypto`);
      const data = response.data?.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to deposit crypto");
    }
  };

  getCryptoWallets = async () => {
    try {
      const response = await web3axiosInstance.get(`/wallet/balance`);
      const data = response.data?.data;

      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to get crypto wallet balance");
    }
  };

  getYellowCardFee = async (params: Record<string, any>) => {
    try {
      const response = await web3axiosInstance.get(
        `/transaction/yellow-card/fee`,
        {
          params,
        }
      );
      const data = response.data?.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to get crypto wallet balance");
    }
  };

  getYellowCardNetworks = async (params: Record<string, any>) => {
    try {
      const response = await web3axiosInstance.get(
        `/transaction/yellow-card/networks`,
        {
          params,
        }
      );
      const data = response.data?.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to get crypto wallet balance");
    }
  };

  getSupportedNetworks = async (params?: Record<string, any>) => {
    try {
      const response = await web3axiosInstance.get(
        `/wallet/supported-networks`,
        {
          params,
        }
      );
      const data = response.data?.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to get supported networks");
    }
  };

  getSupportedAssets = async (params?: Record<string, any>) => {
    try {
      const response = await web3axiosInstance.get(`/wallet/supported-assets`, {
        params,
      });

      // console.log({ response });

      const data = response.data?.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to get supported assets");
    }
  };

  sendToExternalAddress = async (payload: {
    amount: number;
    assetId: string;
    address: string;
    network: string;
    note?: string;
  }) => {
    try {
      const response = await web3axiosInstance.post(
        `/wallet/initiate-onchain-withdrawal`,
        payload
      );

      console.log({ response });

      const data = response.data?.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to send to external wallet address");
    }
  };

  // BlockChain
  getAddressTransactions = async (address: string) => {
    try {
      const response = await axios.get(
        `https://scan-testnet.assetchain.org/addresses/${address}/transactions`
      );
      const data = response.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to get address transactions");
    }
  };
}

export const walletService = new WalletService();
