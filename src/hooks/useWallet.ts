import { walletService } from "@/api/wallet.api";
import type { IParams } from "@/interfaces/params.interface";
import type {
  ICryptoWallet,
  WalletTransaction,
} from "@/interfaces/wallet.interfae";
import {
  useInfiniteQuery,
  useQuery,
  type UseInfiniteQueryResult,
} from "@tanstack/react-query";

interface WalletResponse {
  account_id: string;
  balance: number;
  created_at: string;
  id: string;
  status: string;
  updated_at: string;
}

export const useWallet = ({ currency }: { currency: string }) => {
  return useQuery<WalletResponse, Error>({
    queryKey: ["wallet-balance", currency],
    queryFn: () => walletService.getWallets({ currency }),
  });
};

export const useWalletTransactions = (
  params: IParams
): UseInfiniteQueryResult<{
  pages: [{ items: WalletTransaction[] }];
  offset: number;
  limit: number;
  item_count: number;
}> => {
  return useInfiniteQuery({
    queryKey: ["wallet-transactions", params],
    queryFn: ({ pageParam = 1 }) =>
      walletService.getWalletTransactions({
        ...params,
        limit: "10",
        offset: String(pageParam),
      }),
    initialPageParam: "1",
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.limit;

      if (nextOffset >= lastPage.item_count) {
        return undefined; // no more pages
      }

      return nextOffset; // fetch next batch
    },
  });

  // return useQuery<any, Error>({
  //   queryKey: ["wallet-transactions", params],
  //   queryFn: () => walletService.getWalletTransactions(params),
  // });
};

//Crypto
export const useRequestCryptoDeposit = () => {
  return useQuery<any, Error>({
    queryKey: ["crypto-deposit"],
    queryFn: () => walletService.depositCrypto(),
  });
};

export const useCryptoWallets = () => {
  return useQuery<ICryptoWallet, Error>({
    queryKey: ["crypto-balance"],
    queryFn: () => walletService.getCryptoWallets(),
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
    queryKey: ["supported-networks", params],
    queryFn: () => walletService.getSupportedNetworks(params),
  });
};

export const useSupportedAssets = (params: IParams) => {
  return useQuery<any, Error>({
    queryKey: ["supported-assets"],
    queryFn: () => walletService.getSupportedAssets(params),
  });
};
