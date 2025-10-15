import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";
import { useAdminStore } from "@/store/admin-store";

class AdminAuthService {
  register = async (payload: any) => {
    try {
      const response = await axiosInstance.post(`/users`, payload);
      const { email_address, password } = payload;

      await this.signIn({ email_address, password });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Failed to register");
    }
  };

  signIn = async (payload: any) => {
    try {
      const response = await axiosInstance.post(`/admin/sessions`, payload);
      const admin = response.data;

      const storeState = useAdminStore.getState();
      storeState.setAdmin(admin);

      localStorage.setItem("accessToken", admin.token);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Failed to sign in");
    }
  };
  getAuthAdmin = async () => {
    try {
      const response = await axiosInstance.get(`/admin/sessions`);
      const admin = response.data;
      const storeState = useAdminStore.getState();
      storeState.setAdmin(admin);

      return admin;
    } catch (error) {
      handleAxiosError(error, "Failed to get user");
    }
  };
}

export const adminAuthService = new AdminAuthService();
