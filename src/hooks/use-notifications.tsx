import { notificationService } from "@/api/notification.api";
import type { IParams } from "@/interfaces/params.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetNotifications = (params: IParams) => {
  return useQuery({
    queryKey: ["notifications", params],
    queryFn: () => notificationService.getUserNotifications(params),
    retry: false,
  });
};
