import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class DirectPurchaseService {
  initiaiteDirectPurchase = async (payload: {
    asset_id: string;
    number_of_shares: number;
    pin: string;
  }) => {
    try {
      const response = await axiosInstance.post(`/direct-purchase`, payload);
      return response?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to initiate direct purchase");
    }
  };
}

export const directPurchaseService = new DirectPurchaseService();
