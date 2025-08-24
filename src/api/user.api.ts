import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class UserService {
  createSecurityPin = async (payload: any) => {
    try {
      const response = await axiosInstance.post(`/users/create-pin`, payload);

      console.log({ response });

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
      console.log({ response });

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
      console.log({ response });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  updateUserInformation = async (userId: string, payload: any) => {
    try {
      const response = await axiosInstance.patch(`/users/${userId}`, payload);
      console.log({ response });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  RequestPasswordReset = async () => {
    try {
      const response = await axiosInstance.post(`/users/change-password`);
      console.log({ response });

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
      console.log({ response });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  changePassword = async (payload: { token: string; password: string }) => {
    try {
      const response = await axiosInstance.post(`/users/password`, payload);
      console.log({ response });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };

  // Others
  getUserNextOfKin = async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/next-of-kins/${userId}`);
      console.log({ response });

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
      console.log({ response });

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
      console.log({ response });

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
      console.log({ response });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  getUserVerificationStatus = async () => {
    try {
      const response = await axiosInstance.get(`verifications`);
      console.log({ response });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
}

export const userService = new UserService();
