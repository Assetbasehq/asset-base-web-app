import { accountsService } from "@/api/accounts.api";
import { type IUserPortfolio } from "@/interfaces/accounts.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetUserPortfolio = (params?: { show_liquidated?: boolean }) => {
  return useQuery<IUserPortfolio[], Error>({
    queryKey: ["user-portfolio"],
    queryFn: () =>
      accountsService.getUserPortfolio({
        show_liquidated: params?.show_liquidated,
      }),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
