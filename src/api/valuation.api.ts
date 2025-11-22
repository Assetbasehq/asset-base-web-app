import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class ValuationService {
  getPortfolioOverview = async (params: { currency: string }) => {
    try {
      const response = await axiosInstance.get(`/valuations/overview`, {
        params,
      });

      console.log({ data: response?.data });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "failed to get portfolio overview");
    }
  };

  getPortfolioTrend = async (params?: {
    start_date: string;
    end_date: string;
    currency: string;
  }) => {
    try {
      const response = await axiosInstance.get(`/valuations/history`, {
        params,
      });
      console.log({ data: response?.data });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "failed to get portfolio trend");
    }
  };
}

export const valuationService = new ValuationService();
