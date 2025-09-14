import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type WalletToFundOptions = "USD" | "NAIRA" | "CRYPTO";

interface NairaDepositProps {
  walletToFund: WalletToFundOptions;
  selectedOption: string | null;
  fundingMethod: string | null;
  setFundingMethod: (method: string) => void;
  goBack: () => void;
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
  goBack,
  nextStage,
  walletToFund,
  fundingMethod,
  setFundingMethod,
  selectedOption,
}: NairaDepositProps) {
  console.log({ fundingMethod });

  //Fetch rate

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
          value={fundingMethod || ""}
          onValueChange={(value) => {
            console.log({ value });

            setFundingMethod(value);
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
        disabled={!selectedOption}
        onClick={nextStage}
        className="btn-primary rounded-full py-4 md:py-6 mt-6 w-full text-xs"
      >
        PROCEED TO DEPOSIT
      </Button>

      <Button
        variant="ghost"
        className="text-muted-foreground hover:text-custom-orange bg-custom-light-bg cursor-pointer w-full mt-4"
        onClick={goBack}
      >
        Back
      </Button>
    </div>
  );
}
