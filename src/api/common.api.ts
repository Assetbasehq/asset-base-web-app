import type { IParams } from "@/interfaces/params.interface";
import { web3axiosInstance } from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class CommonService {
  getRates = async (params?: IParams) => {
    try {
      const response = await web3axiosInstance.get(`/common/rates`, {
        params,
      });

      return response?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to fetch rates");
    }
  };
  getCountries = async (params?: IParams) => {
    try {
      const response = await web3axiosInstance.get(`/common/rates`, {
        params,
      });

      return response?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to fetch rates");
    }
  };
}

export const commonService = new CommonService();
