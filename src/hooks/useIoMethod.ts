import { configService } from "@/api/config";
import type { IOMethod } from "@/interfaces/wallet.interfae";
import { useQuery } from "@tanstack/react-query";

export const useIoMethods = ({
  filter_key = "intent",
  filter_value = "funding",
}) => {
  return useQuery<IOMethod[], Error>({
    queryKey: ["io-methods"],
    queryFn: () =>
      configService.getSupportedCurrencies({ filter_key, filter_value }),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
