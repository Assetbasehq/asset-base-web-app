import { liquidityService } from "@/api/liquidity.api";
import type { ILiquidity } from "@/interfaces/liquidity.interface";
import type { IParams } from "@/interfaces/params.interface";
import { useQuery } from "@tanstack/react-query";

interface LiquidityResponse {
  items: ILiquidity;
  total: string;
  page: string;
  limit: string;
}

export const useUserLiquidity = (params?: IParams) => {
  return useQuery<{ items: ILiquidity[] }, Error>({
    queryKey: ["user-provided-liquidity", params],
    queryFn: () => liquidityService.getLiquidityProvidedByUser(params),
  });
};
