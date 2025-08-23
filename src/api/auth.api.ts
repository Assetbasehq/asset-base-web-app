import type { IUser } from "@/interfaces/user.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

class AuthService {
  register = async (payload: any) => {
    
    console.log({ payload });

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
      const response = await axiosInstance.post(`/sessions`, payload);
      const user = response.data;

      const storeState = useAuthStore.getState();
      storeState.setUser(user);

      localStorage.setItem("accessToken", user.token);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Failed to sign in");
    }
  };

  getUser = async () => {
    try {
      const response = await axiosInstance.get(`/sessions`);
      const user = response.data;
      console.log({ user });

      const storeState = useAuthStore.getState();
      storeState.setUser(user);

      return user;
    } catch (error) {
      handleAxiosError(error, "Failed to get user");
    }
  };

  updateUser = async (payload: Partial<IUser>) => {
    try {
      const response = await axiosInstance.patch(`/auth`, payload);

      console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to update");
    }
  };
  verifyOTP = async (payload: any) => {
    try {
      const response = await axiosInstance.post(`/auth/verify-otp`, payload);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to verify OTP");
    }
  };
  resendOTP = async (payload: any) => {
    try {
      const response = await axiosInstance.post(`/auth/send-otp`, payload);

      console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to resen OTP");
    }
  };

  forgotPassword = async (payload: any) => {
    try {
      const response = await axiosInstance.post(
        `/auth/forgot-password`,
        payload
      );
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to forgot password");
    }
  };

  resetPassword = async (payload: any) => {
    try {
      const response = await axiosInstance.post(
        `/auth/reset-password`,
        payload
      );
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to reset password");
    }
  };

  loginWithGoogle = async () => {
    try {
      const response = await axiosInstance.get(`/auth/google`);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to login with Google");
    }
  };
}

export const authService = new AuthService();
