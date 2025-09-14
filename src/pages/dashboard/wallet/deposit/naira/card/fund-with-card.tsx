import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function FundWithCard({ goBack }: { goBack: () => void }) {
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
      <Button
        variant="ghost"
        className="text-muted-foreground hover:text-custom-orange bg-custom-light-bg cursor-pointer"
        onClick={goBack}
      >
        Back
      </Button>
    </div>
  );
}
