import { configService } from "@/api/config";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  fundingMethodsMap,
  type FundingMethod,
} from "@/interfaces/deposit-interface";
import { CurrencyService } from "@/services/currency-service";
import { FormatService } from "@/services/format-service";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { generatePaymentURL } from "@/lib/utils";

interface FundingMethodProps {
  destinationWalletCode: string | null;
  sourceCurrencyCode: string | undefined | null;
}

export default function SelectFundingMethod({
  destinationWalletCode,
  sourceCurrencyCode,
}: FundingMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState<FundingMethod | null>(
    null
  );

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["funding-methods"],
    queryFn: () =>
      configService.getFundingMethods({
        wallet_status: "true",
      }),
  });

  const { data: io } = useQuery({
    queryKey: ["io-methods"],
    queryFn: () =>
      configService.getSupportedCurrencies({
        // filter_key: "intent",
        // filter_value: "funding",
      }),
  });

  console.log({ fundingMethods: data, io });

  // Normalize lowercase wallet codes to uppercase
  const normalizedDest = destinationWalletCode?.toUpperCase();
  const normalizedSource = sourceCurrencyCode?.toUpperCase();

  // Dynamically fetch available funding methods
  const fundingMethods = useMemo<FundingMethod[]>(() => {
    return (
      fundingMethodsMap[normalizedDest as string] ||
      fundingMethodsMap[normalizedSource as string] ||
      []
    );
  }, [normalizedDest, normalizedSource]);

  const handleSelectMethod = (method: string) => {
    console.log({ selectedMethod });
    const foundMethod = fundingMethods.find((m) => m.type === method);

    setSelectedMethod(foundMethod as FundingMethod);
  };

  const handleProceed = () => {
    console.log({
      normalizedDest,
      normalizedSource,
      selectedMethod: "ngn-card",
    });

    if (!normalizedDest && !normalizedSource) return;
    if (!selectedMethod) return;

    const url = generatePaymentURL(
      normalizedDest?.toLowerCase() as string,
      normalizedSource?.toLowerCase() as string,
      "ngn-card"
    );

    navigate(url);
  };

  console.log({ destinationWalletCode, sourceCurrencyCode });

  return (
    <div>
      <div className="bg-custom-light-bg p-4 flex flex-col gap-2 rounded-md">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 w-fit relative">
            <img
              src={CurrencyService.getCurrencyFlag(normalizedDest as string)}
              alt={normalizedDest}
              className="w-8"
            />
            <img
              src={CurrencyService.getCurrencyFlag(normalizedSource as string)}
              alt={normalizedSource}
              className="w-5 absolute -right-2 bottom-0"
            />
          </div>
          <div>
            <p className="text-sm">Fund {normalizedDest} Wallet</p>
            <p className="text-sm">
              Fund with{" "}
              {CurrencyService.getCurrencyName(normalizedSource as string)}
            </p>
          </div>
        </div>
      </div>
      <Separator className="my-4 p-0.25 rounded-full" />

      <div className="flex flex-col gap-1">
        <p className="text-xs">Select Funding method</p>
        <Select value={selectedMethod?.type} onValueChange={handleSelectMethod}>
          <SelectTrigger className="w-full py-6 rounded">
            <SelectValue placeholder={"Select an option"} />
          </SelectTrigger>
          <SelectContent>
            {fundingMethods.map((method) => (
              <SelectItem key={method.type} value={method.type}>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-sm font-medium">{method.label}</p>
                    {method.description && (
                      <p className="text-xs text-muted-foreground">
                        {method.description}
                      </p>
                    )}
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedMethod && (
        <div className="text-xs mt-4 flex flex-col gap-1">
          <div className="flex justify-between">
            <p>RATE</p>
            <p className="font-semibold">
              $1 ~ {selectedMethod?.rate}%
              {/* {isLoading
              ? "..."
              : FormatService.formatWithCommas(data?.rate / 100)} */}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Fee</p>
            <p className="font-semibold">
              {false
                ? "..."
                : FormatService.formatWithCommas(
                    (selectedMethod?.feePercentage as number) / 100
                  )}
            </p>
          </div>
          {/* <div className="flex justify-between">
          <p>Timeline</p>
          <p className="font-semibold">5 - 15mins</p>
        </div> */}
        </div>
      )}

      <Button
        // disabled={!state.fundingMethod}
        onClick={() => handleProceed()}
        className="btn-primary rounded-full py-4 md:py-6 mt-6 w-full text-xs"
      >
        PROCEED TO DEPOSIT
      </Button>
    </div>
  );
}
