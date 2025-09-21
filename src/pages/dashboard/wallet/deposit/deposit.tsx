import AnimatedWrapper from "@/components/animations/animated-wrapper";
import {
  destinationWalletCurrencies,
  type DestinationWalletType,
  type ICurrencyOption,
  type IWalletType,
} from "@/interfaces/deposit-interface";
import { useState } from "react";
import SelectWallet from "./_components/select-wallet";
import SelectFundingMethod from "./_components/select-funding-method";
import DepositWrapper from "./_components/deposit-wraper";
import { useNavigate } from "react-router";

export default function Deposit() {
  const [selectedWallet, setSelectedWallet] =
    useState<DestinationWalletType | null>(null);
  const [destinationWallet, setDestinationWallet] =
    useState<IWalletType | null>(null);
  const [sourceCurrency, setSourceCurrency] = useState<ICurrencyOption | null>(
    null
  );

  const [stage, setStage] = useState(1);

  const navigate = useNavigate();

  const handleSelectWallet = (wallet: IWalletType) => {
    console.log({ wallet });
    setSelectedWallet(wallet.name.toUpperCase() as DestinationWalletType);
    setDestinationWallet(wallet);
    setSourceCurrency(null);
  };

  console.log({
    selectedWallet,
    destinationWallet,
    sourceCurrency,
  });

  const availableCurrencies = selectedWallet
    ? destinationWalletCurrencies[selectedWallet] || []
    : [];

  const handleSelectCurrency = (currencyCode: string) => {
    console.log({ currencyCode });

    if (!selectedWallet) return;

    const selected = availableCurrencies.find(
      (currency) => currency.currencyCode === currencyCode
    );

    console.log({ selected });

    if (selected) {
      setSourceCurrency(selected);
    }
  };

  const handleNext = () => {
    console.log({ destinationWallet, sourceCurrency });

    if (!destinationWallet || !sourceCurrency) return;

    if (destinationWallet.name.toUpperCase() === "CRYPTO") {
      navigate(
        `/dashboard/wallet/deposit/${destinationWallet.name.toLowerCase()}/${sourceCurrency.currencyCode.toLowerCase()}`
      );
    }

    //bring up stage 2
    setStage(2);
  };

  const handleGoBack =
    stage === 1
      ? undefined
      : () => {
          setStage(1);
        };

  return (
    <DepositWrapper goBack={handleGoBack}>
      <div className="text-custom-white-text flex flex-col gap-4">
        <div className="flex flex-col gap-8 text-start w-full max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Deposit to wallet</h2>
            <p className="text-muted-foreground text-sm">
              Fund your wallet to start trading
            </p>
          </div>

          <AnimatedWrapper animationKey={String(stage)}>
            {stage === 1 && (
              <SelectWallet
                selectedWallet={selectedWallet}
                destinationWallet={destinationWallet}
                sourceCurrency={sourceCurrency}
                availableCurrencies={availableCurrencies}
                onSelectWallet={handleSelectWallet}
                onSelectCurrency={handleSelectCurrency}
                handleNext={handleNext}
              />
            )}

            {stage === 2 && destinationWallet && (
              <SelectFundingMethod
                destinationWalletCode={destinationWallet?.currencyCode}
                sourceCurrencyCode={sourceCurrency?.currencyCode}
              />
            )}
          </AnimatedWrapper>
        </div>
      </div>
    </DepositWrapper>
  );
}
