import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { flags } from "@/constants/images";
import AnimatedWrapper from "@/components/animations/animated-wrapper";
import WithdrawBreadCrumb from "./_components/withdraw-bread-crumb";
import { Skeleton } from "@/components/ui/skeleton";
import { normalizeCurrencyInput } from "@/helpers/deposit-methods";
import { CustomAlert } from "@/components/custom/custom-alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Outlet, useLocation } from "react-router";
import { useWallet } from "@/hooks/useWallet";
import { formatService } from "@/services/format-service";

interface IAmountToWithdraw {
  amount: number | null;
  formattedAmount: string;
}

export default function Withdraw() {
  const [amountToWithdraw, setAmountToWithdraw] =
    useState<IAmountToWithdraw | null>(null);
  const [stage, setStage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const [currency, setCurrency] = useState<"usd" | "ngn">("usd");

  const location = useLocation();

  const {
    data: walletData,
    isLoading: isWalletLoading,
    isError: isWalletError,
  } = useWallet({ currency });

  const handleMaxAmount = () => {
    if (!walletData?.balance) {
      return;
    }

    const { amount, formattedAmount } = normalizeCurrencyInput(
      String(walletData.balance)
    );

    setAmountToWithdraw({
      amount: walletData.balance,
      formattedAmount,
    });
  };

  const handleAmountChange = (val: string) => {
    setError(null);

    if (val === "") {
      setAmountToWithdraw(null);
      return;
    }

    const { amount, formattedAmount } = normalizeCurrencyInput(val);

    if (amount) {
      setAmountToWithdraw({
        amount: Number(amount),
        formattedAmount,
      });
    }
  };

  const handleCurrencyChange = (value: string) => {
    setCurrency(value as "usd" | "ngn");
    setAmountToWithdraw(null);
  };

  const handleGoBack = () => {
    setStage(stage - 1);
  };

  const maxAmount = walletData?.balance || 0;
  const amountToWithdrawAsNumber = Number(amountToWithdraw?.amount || 0);
  const isMaxAmount = amountToWithdraw
    ? amountToWithdrawAsNumber > maxAmount
    : false;

  const isMinimumAmount = amountToWithdraw
    ? amountToWithdrawAsNumber >= 10
    : true;

  // console.log({ amountToWithdraw: !!amountToWithdraw });

  return (
    <div className="text-custom-white-text flex flex-col gap-4">
      <WithdrawBreadCrumb goBack={stage > 1 ? handleGoBack : undefined} />

      <AnimatedWrapper animationKey="withdraw">
        <div className="flex flex-col gap-8 text-start w-full max-w-lg mx-auto">
          <div>
            <h2 className="text-xl font-semibold">Withdraw Funds</h2>
            <p className="text-muted-foreground text-sm">
              Withdraw funds to your bank account
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-muted-foreground">Amount to withdraw</Label>
            <div className="w-full flex items-center justify-center ">
              <div className="relative w-full">
                <Input
                  value={amountToWithdraw?.formattedAmount || ""}
                  inputMode="numeric"
                  onChange={(e) => handleAmountChange(e.target.value)}
                  type="text"
                  className="py-6 w-full rounded-r-none"
                  placeholder="10"
                />{" "}
                <Button
                  onClick={handleMaxAmount}
                  className="absolute text-xs p-2 top-1/2 right-2 -translate-y-1/2 bg-custom-light-bg hover:bg-custom-light-bg text-muted-foreground cursor-pointer"
                >
                  max
                </Button>
              </div>
              <Select
                defaultValue={currency}
                onValueChange={handleCurrencyChange}
              >
                <SelectTrigger className="w-fit shadow-none border-none bg-gray-100 py-6 rounded-l-none">
                  <SelectValue placeholder="USD" className="text-white" />
                </SelectTrigger>
                <SelectContent className="min-w-fit">
                  <SelectItem value="usd">
                    <img
                      className="w-6 h-6"
                      src={flags.usa.flag}
                      alt={flags.usa.alt}
                    />
                    {/* <span className="hidden md:inline">USD</span> */}
                  </SelectItem>
                  <SelectItem value="ngn">
                    <img
                      className="w-5 h-5"
                      src={flags.nigeria.flag}
                      alt={flags.nigeria.alt}
                    />
                    {/* <span className="hidden md:inline">NGN</span> */}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {isWalletLoading ? (
                <Skeleton className="h-8 w-32 rounded-md" />
              ) : (
                <h2 className="text-base font-meduim">
                  {formatService.formatCurrency(
                    walletData?.balance || 0,
                    currency
                  )}
                </h2>
              )}
            </div>
          </div>

          {isMaxAmount && (
            <CustomAlert
              variant="warning"
              message={`You don't have enough funds to withdraw ${amountToWithdrawAsNumber} USD.`}
            />
          )}

          {!isMinimumAmount && (
            <CustomAlert
              variant="warning"
              message={`Minimum withdrawal amount is $10`}
            />
          )}

          <Separator />

          <AnimatedWrapper animationKey={location.pathname}>
            <Outlet
              context={{
                amountToWithdraw,
                currency,
              }}
            />
          </AnimatedWrapper>
        </div>
      </AnimatedWrapper>
    </div>
  );
}
