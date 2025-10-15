import type { IParams } from "@/interfaces/params.interface";
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
}

export const transactionService = new TransactionService();
