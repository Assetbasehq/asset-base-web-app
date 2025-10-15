import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class NotificationService {
  getUserNotifications = async (params?: any) => {
    try {
      const response = await axiosInstance.get(`/assets/trending`, { params });
      const items = response.data?.items;
      return items || [];
    } catch (error) {
      handleAxiosError(error, "failed to create security pin");
    }
  };
}

export const notificationService = new NotificationService();
