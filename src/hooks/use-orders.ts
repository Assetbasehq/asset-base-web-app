import { ordersService } from "@/api/orders.api";
import type { IOrder } from "@/interfaces/order.interface";
import type { IParams } from "@/interfaces/params.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

interface OrderResponse {
  item_count: number;
  items: IOrder[];
  limit: number;
  offset: number;
}

export const useOrders = (params: IParams) => {
  return useQuery<OrderResponse, Error>({
    queryKey: ["orders", params],
    queryFn: () => ordersService.getOrders(params),
  });
};

export const useDeletePendingOrder = () => {
  return useMutation({
    mutationFn: (orderId: string) => ordersService.deletePendingOrder(orderId),
  });
};
