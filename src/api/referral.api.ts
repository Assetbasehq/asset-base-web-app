import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class ReferralService {
  getUserReferrals = async () => {
    try {
      const response = await axiosInstance.get(`referrals`);
      console.log({ response });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Something went wrong");
    }
  };
}

export const referralService = new ReferralService();
