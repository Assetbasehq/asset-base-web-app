import { walletService } from "@/api/wallet.api";
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
  fundingOptions,
  type DepositState,
} from "@/interfaces/wallet.interfae";
import { FormatService } from "@/services/format-service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface NairaDepositProps {
  state: DepositState;
  setState: (state: Partial<DepositState>) => void;
}

export default function USDDeposit({ state, setState }: NairaDepositProps) {
  console.log({ state });

  const { data, isLoading } = useQuery<any, Error>({
    queryKey: ["yellow-card-fee"],
    queryFn: () =>
      walletService.getYellowCardFee({
        amount: 20,
        country: "TZ",
        isDeposit: true,
        gateway: "bank",
        amountCurrency: "USD",
      }),
  });

  const { data: networks, isLoading: networksLoading } = useQuery<any, Error>({
    queryKey: ["yellow-card-network"],
    queryFn: () =>
      walletService.getYellowCardNetworks({
        country: "TZ",
        gateway: "bank",
      }),
  });

  console.log({ data, networks });
  console.log({ rate: data?.rate / 100 });

  return (
    <div>
      <div className="bg-custom-light-bg p-4 flex flex-col gap-2 rounded-md">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 w-fit relative">
            <img
              src={state.walletToFund?.logo as string}
              alt={state.walletToFund?.name}
              className="w-8"
            />
            <img
              src={state.currencyToFund?.logo as string}
              alt={state.currencyToFund?.name}
              className="w-5 absolute -right-2 bottom-0"
            />
          </div>
          <div>
            <p className="text-sm">
              Fund {state.walletToFund?.name as string} Wallet
            </p>
            <p className="text-sm">Fund with {state.currencyToFund?.name}</p>
          </div>
        </div>
      </div>
      <Separator className="my-4 p-0.25 rounded-full" />

      <div className="flex flex-col gap-1">
        <p className="text-xs">Select Funding method</p>
        <Select
          value={state.fundingMethod || ""}
          onValueChange={(value) => {
            console.log({ value });

            setState({ ...state, fundingMethod: value });
          }}
        >
          <SelectTrigger className="w-full py-6 rounded">
            <SelectValue placeholder={"Select an option"} />
          </SelectTrigger>
          <SelectContent>
            {fundingOptions.map((option) => (
              <SelectItem key={option.name} value={option.value}>
                <span>{option.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="text-xs mt-4 flex flex-col gap-1">
        <div className="flex justify-between">
          <p>RATE</p>
          <p className="font-semibold">
            $1 ~{" "}
            {isLoading
              ? "..."
              : FormatService.formatWithCommas(data?.rate / 100)}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Fee</p>
          <p className="font-semibold">
            {isLoading
              ? "..."
              : FormatService.formatWithCommas(data?.fee / 100)}
          </p>
        </div>
        {/* <div className="flex justify-between">
          <p>Timeline</p>
          <p className="font-semibold">5 - 15mins</p>
        </div> */}
      </div>

      <Button
        disabled={!state.fundingMethod}
        // onClick={nextStage}
        className="btn-primary rounded-full py-4 md:py-6 mt-6 w-full text-xs"
      >
        PROCEED TO DEPOSIT
      </Button>
    </div>
  );
}
