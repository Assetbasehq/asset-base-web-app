import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { DepositState } from "@/interfaces/wallet.interfae";
import { useState } from "react";

interface NairaDepositProps {
  state: DepositState;
  setState: (state: Partial<DepositState>) => void;
  prevStage: () => void;
  nextStage: () => void;
}

const options = [
  {
    name: "Virtual Account",
    value: "VIRTUAL-ACCOUNT",
  },
  {
    name: "Card",
    value: "CARD",
  },
  {
    name: "Fund With Rise Wallet",
    value: "RISE-WALLET",
  },
];

export default function NairaDeposit({
  state,
  setState,
  nextStage,
  prevStage,
}: NairaDepositProps) {
  console.log({ fundingMethod: state.fundingMethod, stage: state.stage });

  //Fetch rate

  if (state.stage === 3 && state.fundingMethod === "CARD") {
    return <FundWithCard goBack={() => setState({ ...state, stage: 2 })} />;
  }

  return (
    <div>
      <div className="bg-custom-light-bg p-4 flex flex-col gap-2 rounded-md">
        <p>Fund Naira Wallet</p>
        <p>Fund with Naira</p>
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
            {options.map((option) => (
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
          <p className="font-semibold">$1 ~ N1,532</p>
        </div>
        <div className="flex justify-between">
          <p>Fee</p>
          <p className="font-semibold">3.8%</p>
        </div>
        <div className="flex justify-between">
          <p>Timeline</p>
          <p className="font-semibold">5 - 15mins</p>
        </div>
      </div>

      <Button
        disabled={!state.fundingMethod}
        onClick={nextStage}
        className="btn-primary rounded-full py-4 md:py-6 mt-6 w-full text-xs"
      >
        PROCEED TO DEPOSIT
      </Button>
    </div>
  );
}

function FundWithCard({ goBack }: { goBack: () => void }) {
  const [amountToFund, setAmountToFund] = useState<number | null>(null);

  const handleAmountChange = (amount: string) => {
    const amountNumber = Number(amount);
    if (!isNaN(amountNumber)) setAmountToFund(amountNumber);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label className="text-custom-grey text-xs md:text-sm">
          Enter amount to fund
        </Label>
        <Input
          onChange={(e) => handleAmountChange(e.target.value)}
          type="text"
          className="py-6 w-full"
          placeholder="10"
        />
      </div>
      <Button
        variant="outline"
        className="flex justify-between bg-custom-base w-full rounded-full !py-0"
      >
        <small className="text-custom-grey">$1</small>
        <small>$1,576.03</small>
      </Button>
      <div className="flex flex-col gap-2">
        <div>
          <p>Amount to deduct</p>
          <p>N15,000.45</p>
        </div>
        <div>
          <p>Dollar equivalent</p>
          <p>$45.45</p>
        </div>
      </div>
    </div>
  );
}
