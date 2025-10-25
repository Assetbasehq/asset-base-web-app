import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class AccountsService {
  getUserPortfolio = async (params?: { show_liquidated?: boolean }) => {
    try {
      const response = await axiosInstance.get(`/accounts`, { params });
     return response?.data
    } catch (error) {
      handleAxiosError(error, "Failed to get user portfolio");
    }
  };
}

export const accountsService = new AccountsService();
