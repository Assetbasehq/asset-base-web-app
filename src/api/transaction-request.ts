import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

export type WalletType =
  | "card"
  | "bank_transfer"
  | "crypto"
  | "api_vendor"
  | "bank_account"
  | "mobile_money";

interface TransactionRequest {
  amount: string | number;
  provider?: string;
  currency: string;
  external_wallet?: {
    should_save?: boolean;
    account_id?: string;
    [key: string]: any;
  };
  credential?: string;
  wallet_type: WalletType;
  request_type?: "funding" | "withdrawal" | "charge_card";
  external_wallet_id?: string;
  dest_wallet_currency: string;
}

class TransactionRequestService {
  initiateNewTransaction = async (payload: TransactionRequest) => {
    try {
      const response = await axiosInstance.post(
        `/transaction-requests`,
        payload
      );
      const data = response.data;
      console.log({ data });

      return data || [];
    } catch (error) {
      handleAxiosError(error, "Failed to initiate transaction request");
    }
  };
}

export const transactionRequestService = new TransactionRequestService();
