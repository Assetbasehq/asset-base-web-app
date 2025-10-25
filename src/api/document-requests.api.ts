import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class DocumentRequestService {
  requestInvestmentCertificate = async (payload?: { asset_id: string }) => {
    try {
      const response = await axiosInstance.post(
        `/document-requests/investment-certificate`,
        payload
      );
      return response?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to send investment certificate");
    }
  };
  requestAccountStatement = async (payload?: {
    start_date: string;
    end_date: string;
    preview: boolean;
    transaction_reasons: string[];
  }) => {
    try {
      const response = await axiosInstance.post(
        `/document-requests/account-statement`,
        payload
      );
      return response?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to send account statement");
    }
  };
}

export const documentRequestService = new DocumentRequestService();
