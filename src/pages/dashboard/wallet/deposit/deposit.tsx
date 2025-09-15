import { Button } from "@/components/ui/button";
import WalletBreadCrumb from "../_components/wallet-bread-crumb";
import { flags } from "@/constants/images";
import AnimatedWrapper from "@/components/animations/animated-wrapper";
import { Card } from "@/components/ui/card";
import { useState, type ReactNode } from "react";
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
import type { DepositState } from "@/interfaces/wallet.interfae";

const options = [
  {
    name: "USD",
    icon: (
      <img src={flags.usa.flag} alt={flags.usa.alt} className="w-6 md:w-12" />
    ),
  },
  {
    name: "Naira",
    icon: (
      <img
        src={flags.nigeria.flag}
        alt={flags.nigeria.alt}
        className="w-6 md:w-12"
      />
    ),
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
  },
];

type WalletToFundOptions = "USD" | "NAIRA" | "CRYPTO";
interface OptionItem {
  name: string;
  logo: ReactNode;
}

const walletOptionMap: Record<WalletToFundOptions, OptionItem[]> = {
  USD: [
    {
      name: "Nigerian Naira",
      logo: <img src={flags.nigeria.flag} alt={flags.nigeria.alt} />,
    },
    {
      name: "US Dollar",
      logo: <img src={flags.usa.flag} alt={flags.usa.alt} />,
    },
    {
      name: "Ghanian Cedis",
      logo: <img src={flags.ghana.flag} alt={flags.ghana.alt} />,
    },
    {
      name: "Ugandan Shillings",
      logo: <img src={flags.uganda.flag} alt={flags.uganda.alt} />,
    },
    {
      name: "Kenyan Shillings",
      logo: <img src={flags.kenya.flag} alt={flags.kenya.alt} />,
    },
  ],
  NAIRA: [
    {
      name: "Nigerian Naira",
      logo: <img src={flags.nigeria.flag} alt={flags.nigeria.alt} />,
    },
  ],
  CRYPTO: [
    {
      name: "USDT",
      logo: <img src={flags.tetherUSDT.flag} alt={flags.tetherUSDT.alt} />,
    },
    {
      name: "USDC",
      logo: <img src={flags.tetherUSDT.flag} alt={flags.tetherUSDT.alt} />,
    },
    {
      name: "cNGN",
      logo: <img src={flags.tetherUSDT.flag} alt={flags.tetherUSDT.alt} />,
    },
  ],
};

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

  console.log({ state });

  const renderCurrentStep = () => {
    // Step 1: Always wallet and currency selection
    if (state.stage === 1) {
      return (
        <div>
          <div>
            <h2>Wallet to fund</h2>
            <div className="flex items-stretch gap-4 mt-1 w-full">
              {options.map((option) => (
                <Card
                  key={option.name}
                  className={cn(
                    `p-2 md:p-4 border-2 bg-custon-input-fill border-custom-input-stroke w-1/3 cursor-pointer`,
                    {
                      "border-custom-orange":
                        option.name.toUpperCase() === state.walletToFund,
                    }
                  )}
                  onClick={() => {
                    setState((prev) => ({
                      ...prev,
                      walletToFund:
                        option.name.toUpperCase() as WalletToFundOptions,
                      currencyToFund: null,
                    }));
                  }}
                >
                  <span className="bg-custom-card w-fit p-2 rounded-full">
                    {option.icon}
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
            <h2 className="text-sm md:text-">Select Currency to fund</h2>
            <div className="flex items-center gap-4 mt-1 w-full">
              <Select
                value={state.currencyToFund || ""}
                onValueChange={(value) => {
                  setState((prev) => ({ ...prev, currencyToFund: value }));
                }}
              >
                <SelectTrigger className="w-full py-6 rounded">
                  <SelectValue
                    placeholder={
                      state.walletToFund
                        ? walletOptionMap[state.walletToFund][0].name
                        : "Please select a destination wallet"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {state.walletToFund &&
                    walletOptionMap[state.walletToFund].map((option) => (
                      <SelectItem key={option.name} value={option.name}>
                        <span className="w-5 h-5">{option.logo}</span>
                        <span>{option.name}</span>
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

    // Step 2+: Depends on wallet type
    switch (state.walletToFund) {
      case "CRYPTO":
        return <CryptoDeposit goBack={goBack} />;

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

        break;
      case "USD":
        // Add USD flow here when ready
        return <div>USD deposit flow - Coming soon</div>;

      default:
        return <div>Please select a wallet type</div>;
    }

    // Fallback
    return <div>Invalid step</div>;
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
          {/* Stage 1  */}
          {/* {stage === 1 && (
            <div>
              <div>
                <h2>Wallet to fund</h2>
                <div className="flex items-stretch gap-4 mt-1 w-full">
                  {options.map((option) => (
                    <Card
                      key={option.name}
                      className={cn(
                        `p-2 md:p-4 border-2 bg-custon-input-fill border-custom-input-stroke w-1/3 cursor-pointer`,
                        {
                          "border-custom-orange":
                            option.name.toUpperCase() === walletToFund,
                        }
                      )}
                      onClick={() => {
                        setWalletToFund(
                          option.name.toUpperCase() as WalletToFundOptions
                        );
                        setSelectedOption(null);
                      }}
                    >
                      <span className="bg-custom-card w-fit p-2 rounded-full">
                        {option.icon}
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
                <h2 className="text-sm md:text-">Select Currency to fund</h2>
                <div className="flex items-center gap-4 mt-1 w-full">
                  <Select
                    value={selectedOption || ""}
                    onValueChange={(value) => {
                      setSelectedOption(value);
                    }}
                  >
                    <SelectTrigger className="w-full py-6 rounded">
                      <SelectValue
                        placeholder={
                          walletToFund
                            ? walletOptionMap[walletToFund][0].name
                            : "Please select a destination wallet"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {walletToFund &&
                        walletOptionMap[walletToFund].map((option) => (
                          <SelectItem key={option.name} value={option.name}>
                            <span className="w-5 h-5">{option.logo}</span>
                            <span>{option.name}</span>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                disabled={!selectedOption}
                onClick={() => setStage(2)}
                className="btn-primary rounded-full py-4 md:py-6 mt-6 w-full text-xs"
              >
                PROCEED TO DEPOSIT
              </Button>
            </div>
          )} */}

          {/* Stage 2  */}
          {/* {stage === 2 && walletToFund === "CRYPTO" && (
            <CryptoDeposit goBack={goBack} />
          )} */}

          {/* Naira Deposits  */}
          {/* Stage 2  */}
          {/* {stage === 2 && walletToFund === "NAIRA" && (
            <NairaDeposit
              goBack={goBack}
              nextStage={() => {
                console.log({ stage });

                setStage((prev) => prev + 1);
              }}
              walletToFund={walletToFund}
              selectedOption={selectedOption}
              fundingMethod={fundingMethod}
              setFundingMethod={setFundingMethod}
            />
          )} */}

          {/* {stage === 3 &&
            walletToFund === "NAIRA" &&
            fundingMethod === "CARD" && (
              <FundWithCard
                goBack={goBack}
                nextStage={() => setStage((prev) => prev + 1)}
                walletToFund={walletToFund}
                selectedOption={selectedOption}
                setFundingMethod={setFundingMethod}
              />
            )} */}
        </AnimatedWrapper>
      </div>
    </div>
  );
}
