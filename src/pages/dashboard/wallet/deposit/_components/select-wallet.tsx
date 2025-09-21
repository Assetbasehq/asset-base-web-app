import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  walletTypes,
  type DestinationWalletType,
  type ICurrencyOption,
  type IWalletType,
} from "@/interfaces/deposit-interface";

interface SelectWalletProps {
  selectedWallet: DestinationWalletType | null;
  destinationWallet: IWalletType | null;
  sourceCurrency: ICurrencyOption | null;
  availableCurrencies: ICurrencyOption[];
  onSelectWallet: (wallet: IWalletType) => void;
  onSelectCurrency: (currencyCode: string) => void;
  handleNext: () => void;
}

export default function SelectWallet({
  selectedWallet,
  destinationWallet,
  sourceCurrency,
  availableCurrencies,
  onSelectWallet,
  onSelectCurrency,
  handleNext,
}: SelectWalletProps) {
  return (
    <div>
      <div>
        <h2>Wallet to fund</h2>
        <div className="flex items-stretch gap-4 mt-1 w-full">
          {walletTypes.map((option) => (
            <Card
              key={option.name}
              className={cn(
                "p-2 md:p-4 border-2 bg-custon-input-fill border-custom-input-stroke w-1/3 cursor-pointer",
                {
                  "border-custom-orange":
                    selectedWallet === option.name.toUpperCase(),
                }
              )}
              onClick={() => {
                onSelectWallet(option);
              }}
            >
              <span className="bg-custom-card w-fit p-2 rounded-full">
                <img src={option.logo} alt={option.name} className="w-6" />
              </span>
              <p className="text-xs md:text-sm font-semibold mt-auto">
                {option.name}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-4 p-0.25 rounded-full" />

      <div>
        <h2 className="text-sm">Select Currency to fund</h2>
        <div className="flex items-center gap-4 mt-1 w-full">
          <Select
            value={sourceCurrency?.currencyCode || ""}
            onValueChange={(value) => onSelectCurrency(value)}
            disabled={!selectedWallet}
          >
            <SelectTrigger className="w-full py-6 rounded">
              <SelectValue
                placeholder={
                  selectedWallet
                    ? "Choose a currency"
                    : "Please select a wallet first"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {availableCurrencies.map((option) => (
                <SelectItem
                  key={option.currencyCode}
                  value={option.currencyCode}
                >
                  <div className="flex items-center gap-2">
                    <img src={option.logo} alt={option.name} className="w-5" />
                    <span>{option.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        disabled={!sourceCurrency || !selectedWallet}
        onClick={() => handleNext()}
        className="btn-primary rounded-full py-4 md:py-6 mt-6 w-full text-xs"
      >
        PROCEED TO DEPOSIT
      </Button>
    </div>
  );
}
