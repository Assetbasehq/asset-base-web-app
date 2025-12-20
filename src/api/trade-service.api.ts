import { web3axiosInstance } from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class TradeService {
  getUserAssetBalance = async (payload: { assetWeb3ServiceId: string }) => {
    try {
      const response = await web3axiosInstance.get(
        `/trade/user-asset-balance/${payload.assetWeb3ServiceId}`,
        { params: payload }
      );
      const data = response.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to get user asset balance");
    }
  };

  getMarketPrice = async (payload: { assetWeb3ServiceId: string }) => {
    try {
      const response = await web3axiosInstance.get(
        `/trade/market-order/get-market-price/${payload.assetWeb3ServiceId}`,
        { params: payload }
      );
      const data = response.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to get market price for asset");
    }
  };

  estimatePaymentAmount = async (payload: {
    assetWeb3ServiceId: string;
    amountToBuy: string;
  }) => {
    try {
      const response = await web3axiosInstance.get(
        `/trade/market-order/estimate-payment-amount/${payload.assetWeb3ServiceId}/${payload.amountToBuy}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to estimate payment amount");
    }
  };

  estimateAmountToReceive = async (payload: {
    assetWeb3ServiceId: string;
    amountToBuy: string;
  }) => {
    try {
      const response = await web3axiosInstance.get(
        `/trade/market-order/estimate-amount-to-receive/${payload.assetWeb3ServiceId}/${payload.amountToBuy}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to estimate amount to receive");
    }
  };

  initiateMarketOrder = async (payload: {
    type: "buy" | "sell";
    amount: number;
    webServiceId: string;
  }) => {
    try {
      const response = await web3axiosInstance.post(
        `/trade/market-order`,
        payload
      );
      const data = response.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to initiate market order");
    }
  };
}

export const tradeService = new TradeService();
