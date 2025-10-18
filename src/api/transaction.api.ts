import type { IParams } from "@/interfaces/params.interface";
import type {
  IYellowCardDeposit,
  IYellowCardDepositResponse,
} from "@/interfaces/yellow-card.interface";
import { web3axiosInstance } from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class TransactionService {
  getYellowCardFee = async (params?: IParams) => {
    try {
      const response = await web3axiosInstance.get(
        `/transaction/yellow-card/fee`,
        {
          params,
        }
      );

      return response?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to fetch transaction fee");
    }
  };

  getYellowCardMinMaxAmount = async (
    params?: IParams & { country: string; isDeposit: boolean; gateway: string }
  ) => {
    try {
      const response = await web3axiosInstance.get(
        `/transaction/yellow-card/min-max`,
        {
          params,
        }
      );

      return response?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to fetch min-max amount");
    }
  };

  getYellowCardNetworks = async (
    params?: IParams & { country: string; gateway: string }
  ) => {
    try {
      const response = await web3axiosInstance.get(
        `/transaction/yellow-card/networks`,
        {
          params,
        }
      );

      return response?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to fetch networks");
    }
  };

  processYellowCardDeposit = async (payload: IYellowCardDeposit) => {
    try {
      const response = await web3axiosInstance.post<IYellowCardDepositResponse>(
        `/transaction/yellow-card/deposit`,
        payload
      );

      return response?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to process deposit");
    }
  };

  getPaymentMethods = async (
    params: IParams & { country: string; isDeposit: boolean }
  ) => {
    try {
      const response = await web3axiosInstance.get(
        `/transaction/yellow-card/payment-methods`,
        { params }
      );

      return response?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to fetch payment methods");
    }
  };
}

export const transactionService = new TransactionService();
