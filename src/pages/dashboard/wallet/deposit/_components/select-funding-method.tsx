import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CurrencyService } from "@/services/currency-service";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { generatePaymentURL } from "@/lib/utils";
import type { IOMethod } from "@/interfaces/wallet.interfae";
import { FormatService } from "@/services/format-service";
import { useIoMethods } from "@/hooks/useIoMethod";
import {
  getAvailableIOMethods,
  getIOMethodDisplayName,
  getIOMethodFee,
  getIOMethodRate,
} from "@/helpers/deposit-methods";

interface FundingMethodProps {
  destinationWalletCode: string | null;
  sourceCurrencyCode: string | undefined | null;
}

export default function SelectFundingMethod({
  destinationWalletCode,
  sourceCurrencyCode,
}: FundingMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState<IOMethod | null>(null);

  const navigate = useNavigate();

  const { data: ioMethods } = useIoMethods({
    filter_key: "intent",
    filter_value: "funding",
  });

  // Available filtered IO methods
  const availableOptions = useMemo(
    () =>
      getAvailableIOMethods(
        ioMethods || [],
        destinationWalletCode,
        sourceCurrencyCode
      ),
    [ioMethods, destinationWalletCode, sourceCurrencyCode]
  );

  // Normalize lowercase wallet codes to uppercase
  const normalizedDest = destinationWalletCode?.toUpperCase();
  const normalizedSource = sourceCurrencyCode?.toUpperCase();

  const handleSelectMethod = (value: string) => {
    const [channel, networkName] = value.split("|");

    const method = availableOptions.find((m) => {
      const matchBase =
        m.channel === channel &&
        m.currency.code.toLowerCase() === normalizedSource?.toLowerCase() &&
        m.destination_wallets.includes(normalizedDest?.toLowerCase() as string);

      // If mobile money, also match network_name
      if (channel === "mobile_money") {
        return matchBase && m.network_name === networkName;
      }

      return matchBase;
    });

    setSelectedMethod(method || null);
  };

  const handleProceed = () => {
    console.log({
      normalizedDest,
      normalizedSource,
      selectedMethod,
      channel:
        selectedMethod?.channel === "api_vendor"
          ? selectedMethod.provider
          : selectedMethod?.channel,
    });

    // return;

    if (!normalizedDest && !normalizedSource) return;
    if (!selectedMethod) return;

    const url = generatePaymentURL(
      normalizedDest?.toLowerCase() as string,
      normalizedSource?.toLowerCase() as string,
      selectedMethod
    );
    navigate(url);

    return;
  };

  // console.log({ destinationWalletCode, sourceCurrencyCode });

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
        <Select
          value={
            selectedMethod
              ? selectedMethod.channel === "mobile_money"
                ? `${selectedMethod.channel}|${selectedMethod.network_name}`
                : selectedMethod.channel
              : "" // Always controlled
          }
          onValueChange={handleSelectMethod}
        >
          <SelectTrigger className="w-full py-6 rounded">
            <SelectValue placeholder="Select an option">
              {selectedMethod
                ? selectedMethod.channel === "mobile_money"
                  ? selectedMethod.network_name // Show only network name
                  : FormatService.formatSelectText(
                      getIOMethodDisplayName(selectedMethod)
                    ) // e.g., card
                : "Select an option"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {availableOptions.map((method: IOMethod, i) => {
              const value =
                method.channel === "mobile_money"
                  ? `${method.channel}|${method.network_name}`
                  : method.channel;

              return (
                <SelectItem key={i} value={value}>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium capitalize">
                      {FormatService.formatSelectText(
                        getIOMethodDisplayName(method)
                      )}
                    </p>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {selectedMethod && (
        <div className="text-xs mt-4 flex flex-col gap-1">
          <div className="flex justify-between">
            <p>RATE</p>
            <p className="font-semibold">
              $1 ~ {getIOMethodRate(selectedMethod)}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Fee</p>
            <p className="font-semibold">{getIOMethodFee(selectedMethod)}</p>
          </div>
          <div className="flex justify-between">
            <p>Timeline</p>
            <p className="font-semibold">{selectedMethod.timeline}</p>
          </div>
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
