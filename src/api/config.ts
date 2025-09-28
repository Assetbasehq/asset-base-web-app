import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class ConfigService {
  getFundingMethods = async (params?: any) => {
    try {
      const response = await axiosInstance.get(`/config/io-methods`, {
        params,
      });

      const data = response.data;
      return data || [];
    } catch (error) {
      handleAxiosError(error, "Failed to get funding methods");
    }
  };

  getSupportedCurrencies = async (
    params: { [key: string]: any } = {
      filter_key: "intent",
      filter_value: "funding",
    }
  ) => {
    try {
      const response = await axiosInstance.get(`/config/currency`, { params });
      const data = response.data;
      return data || [];
    } catch (error) {
      handleAxiosError(error, "Failed to get currencies");
    }
  };
}

export const configService = new ConfigService();
