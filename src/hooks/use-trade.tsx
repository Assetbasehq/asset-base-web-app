import { tradeService } from "@/api/trade-service.api";
import { useQuery } from "@tanstack/react-query";

export const useAssetBalance = (params: { assetWeb3ServiceId: string }) => {
  return useQuery({
    queryKey: ["user-asset-balance", params],
    queryFn: () => tradeService.getUserAssetBalance(params),
  });
};

export const useAssetMarketPrice = (params: { assetWeb3ServiceId: string }) => {
  return useQuery({
    queryKey: ["market-price", params],
    queryFn: () => tradeService.getMarketPrice(params),
    enabled: !!params.assetWeb3ServiceId,
  });
};

export const useEstimatePaymentAmount = (params: {
  assetWeb3ServiceId: string;
  amountToBuy: string;
}) => {
  return useQuery({
    queryKey: ["estimate-payment-amount", params],
    queryFn: () => tradeService.estimatePaymentAmount(params),
  });
};
