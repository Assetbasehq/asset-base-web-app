import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class VerificationService {
  initiateDojahVerification = async () => {
    try {
      const response = await axiosInstance.post(`verification-requests`, {
        request_type: "identity",
        provider: "dojah",
      });
      console.log({ response });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  initiateSystemVerification = async (payload: {
    request_type: string;
    provider: string;
    user_data: { id_type: string; id_number: string };
  }) => {
    try {
      const response = await axiosInstance.post(`verification-requests`, {
        request_type: "identity",
        provider: "dojah",
      });
      console.log({ response });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  uploadVerificationAttachments = async (payload: any) => {
    try {
      const response = await axiosInstance.post(
        `verification-requests/attachments`,
        payload
      );
      console.log({ response });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
}

export const verificationService = new VerificationService();
