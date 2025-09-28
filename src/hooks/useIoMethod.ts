import { configService } from "@/api/config";
import type { ICurrency, IOMethod } from "@/interfaces/wallet.interfae";
import { useQuery } from "@tanstack/react-query";

export const useIoMethods = ({
  filter_key = "intent",
  filter_value = "funding",
}) => {
  return useQuery<IOMethod[], Error>({
    queryKey: ["io-methods"],
    queryFn: () =>
      configService.getFundingMethods({ filter_key, filter_value }),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useSupportedCurrencies = (params: { [key: string]: any }) => {
  return useQuery<ICurrency[], Error>({
    queryKey: ["supported-currencies"],
    queryFn: () => configService.getSupportedCurrencies(params),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
