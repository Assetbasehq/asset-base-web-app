import { externalWalletService } from "@/api/external-wallets.api";
import type { CardItem } from "@/interfaces/external-wallets";
import { useQuery } from "@tanstack/react-query";

export const useGetExternalWallets = (params: {
  fetch_balance?: string;
  currency?: string;
  provider?: string;
  wallet_type?: string;
}) => {
  return useQuery<{ items: CardItem[] }, Error>({
    queryKey: ["external-wallets", params],
    queryFn: () => externalWalletService.getAllExternalWallets(params),
  });
};
