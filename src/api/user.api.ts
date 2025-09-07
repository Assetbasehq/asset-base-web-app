import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class UserService {
  createSecurityPin = async (payload: any) => {
    try {
      const response = await axiosInstance.post(`/users/create-pin`, payload);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "failed to create security pin");
    }
  };
  checkIfUserExists = async (payload: any) => {
    try {
      const response = await axiosInstance.post(
        `/users/validate-email`,
        payload
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  uploadProfilePhoto = async (payload: any) => {
    try {
      const response = await axiosInstance.patch(
        `/users/profile-photo`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  updateUserInformation = async (userId: string, payload: any) => {
    try {
      const response = await axiosInstance.patch(`/users/${userId}`, payload);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  RequestPasswordReset = async () => {
    try {
      const response = await axiosInstance.post(`/users/change-password`);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  authorizePasswordReset = async (payload: {
    token: string;
    verification_code: string;
  }) => {
    try {
      const response = await axiosInstance.post(
        `/users/change-password/authorize`,
        payload
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  changePassword = async (payload: { token: string; password: string }) => {
    try {
      const response = await axiosInstance.post(`/users/password`, payload);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  RequestPinChange = async () => {
    try {
      const response = await axiosInstance.post(`/users/pin-reset/otp`);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  authorizePinChange = async (payload: {
    token: string;
    verification_code: string;
  }) => {
    try {
      const response = await axiosInstance.post(
        `/users/pin-reset/authorize`,
        payload
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  changePin = async (payload: { token: string; password: string }) => {
    try {
      const response = await axiosInstance.post(`/users/pin`, payload);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  unauthorizedForgotPasswordRequest = async (payload: {
    email_address: string;
  }) => {
    try {
      const response = await axiosInstance.post(
        `/users/forgot-password`,
        payload
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  unauthorizedPasswordReset = async (payload: {
    token: string;
    password: string;
  }) => {
    try {
      const response = await axiosInstance.patch(`/users/password`, payload);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  sendEnquiry = async (payload: { message: string }) => {
    try {
      const response = await axiosInstance.post(`/users/support`, payload);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Failed to send enquiry");
    }
  };

  // Others
  getUserNextOfKin = async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/next-of-kins/${userId}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  updateUserNextOfKin = async (userId: string, payload: any) => {
    try {
      const response = await axiosInstance.put(
        `/next-of-kins/${userId}`,
        payload
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  makeEmailVerificationRequest = async () => {
    try {
      const response = await axiosInstance.post(`verification-requests`, {
        request_type: "email",
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  finalizeEmailVerificationRequest = async (payload: {
    token: string;
    verification_code: string;
  }) => {
    try {
      const response = await axiosInstance.post(
        `verification-requests/verify`,
        payload
      );

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  getUserVerificationStatus = async () => {
    try {
      const response = await axiosInstance.get(`verifications`);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  getUserReferrals = async () => {
    try {
      const response = await axiosInstance.get(`/referrals`);
      const items = response.data?.items;
      console.log({ items });

      return items || [];
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
}

export const userService = new UserService();
