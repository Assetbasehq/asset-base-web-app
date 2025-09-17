import { Button } from "@/components/ui/button";
import WalletBreadCrumb from "../_components/wallet-bread-crumb";
import AnimatedWrapper from "@/components/animations/animated-wrapper";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CryptoDeposit from "./crypto/crypto-deposit";
import NairaDeposit from "./naira/naira-deposit";
import {
  walletOptionMap,
  walletOptions,
  type DepositState,
  type WalletToFundOptions,
} from "@/interfaces/wallet.interfae";
import USDDeposit from "./usd/usd-deposit";

export default function Deposit() {
  const [state, setState] = useState<DepositState>({
    walletToFund: null,
    currencyToFund: null,
    fundingMethod: null,
    stage: 1,
  });

  const goBack = () => setState((prev) => ({ ...prev, stage: prev.stage - 1 }));
  const nextStage = () =>
    setState((prev) => ({ ...prev, stage: prev.stage + 1 }));

  const renderCurrentStep = () => {
    // STEP 1: Wallet and Currency Selection
    if (state.stage === 1) {
      return (
        <div>
          <div>
            <h2>Wallet to fund</h2>
            <div className="flex items-stretch gap-4 mt-1 w-full">
              {walletOptions.map((option) => (
                <Card
                  key={option.name}
                  className={cn(
                    "p-2 md:p-4 border-2 bg-custon-input-fill border-custom-input-stroke w-1/3 cursor-pointer",
                    {
                      "border-custom-orange":
                        state.walletToFund?.name.toUpperCase() ===
                        option.name.toUpperCase(),
                    }
                  )}
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      walletToFund: option,
                      currencyToFund: null,
                    }))
                  }
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
                value={state.currencyToFund?.currencyCode || ""}
                onValueChange={(value) => {
                  if (!state.walletToFund) return;

                  const key =
                    state.walletToFund.name.toUpperCase() as WalletToFundOptions;
                  const selectedCurrency = walletOptionMap[key].find(
                    (option) => option.currencyCode === value
                  );

                  if (selectedCurrency) {
                    setState((prev) => ({
                      ...prev,
                      currencyToFund: selectedCurrency,
                    }));
                  }
                }}
              >
                <SelectTrigger className="w-full py-6 rounded">
                  <SelectValue
                    placeholder={
                      state.walletToFund
                        ? walletOptionMap[
                            state.walletToFund.name.toUpperCase() as WalletToFundOptions
                          ][0].name
                        : "Please select a destination wallet"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {state.walletToFund &&
                    walletOptionMap[
                      state.walletToFund.name.toUpperCase() as WalletToFundOptions
                    ].map((option) => (
                      <SelectItem
                        key={option.currencyCode}
                        value={option.currencyCode}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={option.logo}
                            alt={option.name}
                            className="w-5"
                          />
                          <span>{option.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            disabled={!state.walletToFund || !state.currencyToFund}
            onClick={() => setState((prev) => ({ ...prev, stage: 2 }))}
            className="btn-primary rounded-full py-4 md:py-6 mt-6 w-full text-xs"
          >
            PROCEED TO DEPOSIT
          </Button>
        </div>
      );
    }

    // STEP 2+: Render dynamic deposit flow
    const walletName =
      state.walletToFund?.name.toUpperCase() as WalletToFundOptions;

    switch (walletName) {
      case "CRYPTO":
        return <CryptoDeposit />;

      case "NAIRA":
        return (
          <NairaDeposit
            state={state}
            setState={(updatedState: Partial<DepositState>) =>
              setState({ ...state, ...updatedState })
            }
            prevStage={goBack}
            nextStage={nextStage}
          />
        );

      case "USD":
        return (
          <USDDeposit
            state={state}
            setState={(updatedState: Partial<DepositState>) =>
              setState({ ...state, ...updatedState })
            }
          />
        );

      default:
        return <div>Please select a wallet type</div>;
    }
  };

  return (
    <div className="text-custom-white-text flex flex-col gap-4">
      <WalletBreadCrumb stage={state.stage} goBack={goBack} />

      <div className="flex flex-col gap-8 text-start w-full max-w-md mx-auto">
        <div>
          <h2 className="text-xl font-semibold">Deposit to wallet</h2>
          <p className="text-muted-foreground text-sm">
            Fund your wallet to start trading
          </p>
        </div>

        <AnimatedWrapper animationKey={String(state.stage)}>
          {renderCurrentStep()}
        </AnimatedWrapper>
      </div>
    </div>
  );
}
