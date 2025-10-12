import type { IParams } from "@/interfaces/params.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class NotificationService {
  getUserNotifications = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/notifications`, { params });
      const data = response.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to get notifications");
    }
  };
  markNotificationAsRead = async (payload: { notification_ids: string[] }) => {
    try {
      const response = await axiosInstance.post(
        `/notifications/receipts`,
        payload
      );
      const data = response.data;
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to mark notifications as read");
    }
  };
}

export const notificationService = new NotificationService();
