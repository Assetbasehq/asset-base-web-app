import type { IParams } from "@/interfaces/params.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class OrderRequestService {
  makeOrderRequest = async (payload: {
    asset_id: string;
    price_per_share?: string;
    number_of_shares?: string;
    order_type: "ask" | "bid" | "buy_limit_order" | "sell_limit_order" | string;
    pin: string;
  }) => {
    try {
      const response = await axiosInstance.post(`/order-requests`, payload);
      const data = response.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to make order request");
    }
  };
  getOrderRequests = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/order-requests`, { params });
      const data = response.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to get order request");
    }
  };
}

export const orderRequestService = new OrderRequestService();
