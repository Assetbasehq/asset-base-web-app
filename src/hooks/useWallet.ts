import { walletService } from "@/api/wallet.api";
import type { IParams } from "@/interfaces/params.interface";
import type { ICryptoWallet } from "@/interfaces/wallet.interfae";
import { useQuery } from "@tanstack/react-query";

interface WalletResponse {
  account_id: string;
  balance: number;
  created_at: string;
  id: string;
  status: string;
  updated_at: string;
}

export const useGetWallet = ({ currency }: { currency: string }) => {
  return useQuery<WalletResponse, Error>({
    queryKey: ["wallet-balance", currency],
    queryFn: () => walletService.getWalletBalance({ currency }),
  });
};

//Crypto
export const useRequestCryptoDeposit = () => {
  return useQuery<any, Error>({
    queryKey: ["crypto-deposit"],
    queryFn: () => walletService.depositCrypto(),
  });
};

export const useGetCryptoBalance = () => {
  return useQuery<ICryptoWallet, Error>({
    queryKey: ["crypto-balance"],
    queryFn: () => walletService.getCryptoWalletBalance(),
  });
};

export const useGetAddressTransactions = (address: string) => {
  return useQuery<any, Error>({
    queryKey: ["address-transactions", address],
    queryFn: () => walletService.getAddressTransactions(address),
    enabled: !!address,
  });
};

export const useSupportedNetworks = (params: IParams) => {
  return useQuery<any, Error>({
    queryKey: ["supported-networks"],
    queryFn: () => walletService.getSupportedNetworks(params),
  });
};

export const useSupportedAssets = (params: IParams) => {
  return useQuery<any, Error>({
    queryKey: ["supported-assets"],
    queryFn: () => walletService.getSupportedAssets(params),
  });
};
