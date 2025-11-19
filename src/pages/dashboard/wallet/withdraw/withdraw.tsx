import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import riseIcon from "@/assets/icons/rise-icon.svg";
import { useState } from "react";
import { RiBankLine } from "react-icons/ri";
import { flags } from "@/constants/images";
import AnimatedWrapper from "@/components/animations/animated-wrapper";
import WithdrawToBankAccount from "./bank/continue-with-bank";
import WithdrawToRiseWallet from "./rise/withdraw-to-rise";
import WithdrawBreadCrumb from "./_components/withdraw-bread-crumb";
import { useGetWallet } from "@/hooks/useWallet";
import { Skeleton } from "@/components/ui/skeleton";
import { FormatService } from "@/services/format-service";
import { normalizeCurrencyInput } from "@/helpers/deposit-methods";
import { CustomAlert } from "@/components/custom/custom-alert";
import WithdrawToCrypto from "./crypto/withdraw-with-crypto";

const options = [
  {
    name: "Rise",
    icon: <img src={riseIcon} alt="rise" />,
    label: "Rise wallet",
  },
  {
    name: "Bank",
    icon: <RiBankLine className="w-12 h-12 p-2" />,
    label: "Bank Account",
  },
  {
    name: "Crypto",
    icon: (
      <img
        src={flags.tetherUSDT.flag}
        alt={flags.tetherUSDT.alt}
        className="w-6 md:w-12"
      />
    ),
    label: "Crypto Wallet",
  },
];

interface IAmountToWithdraw {
  amount: number | null;
  formattedAmount: string;
}

export default function Withdraw() {
  const [amountToWithdraw, setAmountToWithdraw] =
    useState<IAmountToWithdraw | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [stage, setStage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const {
    data: walletData,
    isLoading: isWalletLoading,
    isError: isWalletError,
  } = useGetWallet({ currency: "usd" });

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

  const handleGoBack = () => {
    setStage(stage - 1);
  };

  const maxAmount = walletData?.balance || 0;
  const amountToWithdrawAsNumber = Number(amountToWithdraw?.amount || 0);

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
            <div className="relative">
              <Input
                value={amountToWithdraw?.formattedAmount || ""}
                inputMode="numeric"
                onChange={(e) => handleAmountChange(e.target.value)}
                type="text"
                className="py-6 w-full"
                placeholder="10"
              />{" "}
              <Button
                onClick={handleMaxAmount}
                className="absolute text-xs p-2 top-1/2 right-4 -translate-y-1/2 bg-custom-light-bg hover:bg-custom-light-bg text-muted-foreground cursor-pointer"
              >
                max
              </Button>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {isWalletLoading ? (
                <Skeleton className="h-8 w-32 rounded-md" />
              ) : (
                <h2 className="text-base font-meduim">
                  {FormatService.formatCurrency(
                    walletData?.balance || 0,
                    "USD"
                  )}
                </h2>
              )}
            </div>
          </div>

          {amountToWithdraw && amountToWithdrawAsNumber > maxAmount ? (
            <CustomAlert
              variant="warning"
              message={`You don't have enough funds to withdraw ${amountToWithdrawAsNumber} USD.`}
            />
          ) : null}

          <Separator />

          <AnimatedWrapper animationKey={String(stage)}>
            {stage === 1 && (
              <div>
                <h2>Select account to withdraw to</h2>
                <div className="flex  items-center gap-4 mt-4 w-full">
                  {options.map((option) => (
                    <Card
                      key={option.name}
                      className="p-4 bg-custom-input-stroke w-1/3 cursor-pointer"
                      onClick={() => {
                        setSelectedWallet(option.name);
                        setStage(2);
                      }}
                    >
                      <span className="bg-custom-card w-fit p-2 rounded-full">
                        {option.icon}
                      </span>
                      <p>{option.label}</p>
                    </Card>
                  ))}
                </div>
                <Button
                  disabled
                  className="btn-primary rounded-full py-6 mt-4 w-full"
                >
                  PROCEED TO WITHDRAWAL
                </Button>
              </div>
            )}

            {stage === 2 && selectedWallet === "Rise" && (
              <WithdrawToRiseWallet
                onBack={() => setSelectedWallet(null)}
                // setStage={setStage}
              />
            )}
            {stage === 2 && selectedWallet === "Bank" && (
              <WithdrawToBankAccount onBack={() => setSelectedWallet(null)} />
            )}
            {stage === 2 && selectedWallet === "Crypto" && (
              <WithdrawToCrypto
                onBack={() => setSelectedWallet(null)}
                setStage={setStage}
              />
            )}
          </AnimatedWrapper>
        </div>
      </AnimatedWrapper>
    </div>
  );
}
