import type { IParams } from "@/interfaces/params.interface";
import { web3axiosInstance } from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class LiquidityService {
  getLiquidityProvidedByUser = async (params?: IParams) => {
    try {
      const response = await web3axiosInstance.get(`/liquidity`, { params });

      console.log({ response });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  addLiquidity = async (payload: {
    poolType: string;
    web3ServiceId: string;
    currency: string;
    amount: string;
    idempotencyKey: string;
  }) => {
    try {
      const response = await web3axiosInstance.post(`/liquidity`, payload);

      console.log({ response });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
}

export const liquidityService = new LiquidityService();
