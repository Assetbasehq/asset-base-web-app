import { liquidityService } from "@/api/liquidity.api";
import type { IParams } from "@/interfaces/params.interface";
import { useQuery } from "@tanstack/react-query";

export const useUserLiquidity = (params?: IParams) => {
  return useQuery<any, Error>({
    queryKey: ["provided-liquidity", params],
    queryFn: () => liquidityService.getLiquidityProvidedByUser(params),
  });
};
