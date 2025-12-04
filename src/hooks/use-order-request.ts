import { orderRequestService } from "@/api/order-requests.api";
import type { IParams } from "@/interfaces/params.interface";
import { useQuery } from "@tanstack/react-query";

export const useOrderRequests = (params: IParams) => {
  return useQuery({
    queryKey: ["order-requests", params],
    queryFn: () => orderRequestService.getOrderRequests(params),
  });
};
