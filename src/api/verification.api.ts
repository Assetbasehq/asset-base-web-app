import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class VerificationService {
  initiateDojahVerification = async () => {
    try {
      const response = await axiosInstance.post(`verification-requests`, {
        request_type: "identity",
        provider: "dojah",
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  initiateSystemVerification = async (payload: {
    request_type: string;
    provider: string;
    user_data: { id_type: string; id_number: string };
    image_urls?: [];
  }) => {
    try {
      const response = await axiosInstance.post(
        `verification-requests`,
        payload
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
  uploadVerificationAttachments = async (payload: File[]) => {
    // const files = payload.map((file) => ({
    //   filename: file.name.replace(/[^a-zA-Z0-9_.-]+/, "-"),
    //   size: file.size,
    //   mimeType: file.type,
    //   id: (crypto as any).randomUUID(),
    // }));
    const files = payload.map((file) => ({
      filename: file.name.replace(/[^a-zA-Z0-9_.-]+/g, "-"),
      size: file.size,
      mimeType: file.type,
      id: crypto.randomUUID(), // UNIQUE ID PER FILE
    }));

    try {
      const response = await axiosInstance.post(
        `verification-requests/attachments`,
        files
        // {
        //   headers: { "Content-Type": "multipart/form-data" },
        // }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
}

export const verificationService = new VerificationService();
