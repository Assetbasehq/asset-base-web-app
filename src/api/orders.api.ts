import type { IParams } from "@/interfaces/params.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class OrdersService {
  getOrders = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/orders`, { params });
      const data = response.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to get orders");
    }
  };
  deletePendingOrder = async (orderId: string) => {
    try {
      const response = await axiosInstance.delete(`/orders/${orderId}`);
      const data = response.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to delete order");
    }
  };
}

export const ordersService = new OrdersService();
