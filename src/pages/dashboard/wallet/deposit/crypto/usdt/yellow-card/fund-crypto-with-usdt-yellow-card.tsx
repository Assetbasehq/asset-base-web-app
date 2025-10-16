import { useMemo, useState } from "react";
import DepositWrapper from "../../../_components/deposit-wraper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomAlert } from "@/components/custom/custom-alert";
import { normalizeCurrencyInput } from "@/helpers/deposit-methods";
import { FormatService } from "@/services/format-service";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { commonService } from "@/api/common.api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConfirmFundingModal from "./_modals/confirmation-modal";
import { Checkbox } from "@/components/ui/checkbox";
import FundingSummary from "./_components/funding-summary";
import { transactionService } from "@/api/transaction.api";
import { useGetCryptoBalance } from "@/hooks/useWallet";
import { Skeleton } from "@/components/ui/skeleton";
import PaymentMethods from "./_components/payment-methods";
import { currencyToCountry } from "@/lib/utils";

const currencies = ["NGN", "UGX", "GHS", "KES"];
type Currency = "NGN" | "UGX" | "GHS" | "KES";

interface IAmountToFund {
  amount: number;
  formattedAmount: string;
}

export default function FundCryptoWithUsdtYellowCard() {
  const [amountToFund, setAmountToFund] = useState<IAmountToFund | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  // const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const {
    data: cryptoWalletData,
    isLoading: isCryptoWalletLoading,
    isError: isCryptoWalletError,
  } = useGetCryptoBalance();

  const {
    data: ratesData,
    isPending: isRatesLoading,
    isError: isRatesError,
  } = useQuery({
    queryKey: ["rates", currency],
    queryFn: () =>
      commonService.getRates({
        currency: currency!,
        type: "buy",
      }),
    enabled: !!currency,
  });

  const processFundingMutation = useMutation({
    mutationFn: transactionService.processYellowCardDeposit,
    onSuccess: (data) => {
      console.log({ data });
      // Handle success (e.g., show a success message, redirect, etc.)
    },
    onError: (error: any) => {
      setError(error?.message || "Failed to process deposit");
    },
  });

  const assets = useMemo(() => {
    if (!cryptoWalletData) return [];
    if (!cryptoWalletData.assets || !cryptoWalletData.assets.length) return [];
    return cryptoWalletData.assets;
  }, [cryptoWalletData]);

  const foundRateMemo = useMemo(() => {
    if (!ratesData?.data || !ratesData.data.length) return null;
    const foundRate = ratesData.data[0];
    console.log({ foundRate });

    if (!foundRate) return null;
    return foundRate.amount / 100 || 0;
  }, [ratesData]);

  const handleAmountChange = (val: string) => {
    setError(null);

    if (val === "") {
      setAmountToFund(null);
      return;
    }

    const { amount, formattedAmount } = normalizeCurrencyInput(val);

    if (amount) {
      setAmountToFund({
        amount: Number(amount),
        formattedAmount,
      });
    }
  };

  const handleChangeCurrency = (val: Currency) => {
    if (val === currency) return;
    setCurrency(val);
  };
  // const handleChangeAsset = (val: string) => {
  //   if (val === selectedAsset) return;
  //   setSelectedAsset(val);
  //   setError(null);
  // };

  const handleFundWallet = async () => {
    setError(null);
    if (!amountToFund?.amount || !currency) return;
    if (!paymentMethod) return;
    const asset = assets.find((a) => a.symbol === "USDT");
    if (!asset) {
      setError("USDT wallet not found");
      return;
    }

    const payload = {
      amount: amountToFund.amount,
      currency,
      country: currencyToCountry[currency],
      amountCurrency: "USD",
      paymentGateway: paymentMethod,
      assetId: asset?.id,
    };

    console.log({ payload, asset });

    processFundingMutation.mutateAsync(payload);
  };

  const amountToDeduct = amountToFund?.amount ?? 0;
  const isMinimumAmount = amountToDeduct ? amountToDeduct >= 10 : false;

  console.log({ cryptoWalletData, assets });

  return (
    <DepositWrapper>
      <div className="text-custom-white-text flex flex-col gap-4">
        <div className="flex flex-col gap-4 text-start w-full max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Fund With Bank Or Momo</h2>
            <p className="text-muted-foreground text-sm">
              Minimum deposit is $10
            </p>
          </div>

          {/* <div className="flex flex-col gap-2">
            <Label className="text-custom-grey text-xs md:text-sm">
              Select Wallet Type
            </Label>
            <Select
              value={selectedAsset ? selectedAsset : ""}
              onValueChange={handleChangeAsset}
            >
              <SelectTrigger className="w-full py-6 rounded">
                <SelectValue placeholder="Select an option">
                  {currency}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {assets.map((asset, i) => {
                  return (
                    <SelectItem key={i} value={asset.id}>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium capitalize">
                          {asset.name} - {asset.symbol}
                        </p>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div> */}

          <div className="flex flex-col gap-2">
            <Label className="text-custom-grey text-xs md:text-sm">
              Select Currency
            </Label>
            <Select
              disabled={isConfirmed}
              value={currency ? currency : ""}
              onValueChange={handleChangeCurrency}
            >
              <SelectTrigger className="w-full py-6 rounded">
                <SelectValue placeholder="Select an option">
                  {currency}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency, i) => {
                  const value = currency;

                  return (
                    <SelectItem key={i} value={value}>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium capitalize">
                          {currency}
                        </p>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <div className="flex justify-between text-xs border px-4 py-2 rounded-full">
              <p className="text-custom-grey"> $1 </p>
              <div className="font-semibold">
                {currency &&
                  foundRateMemo &&
                  FormatService.formatCurrency(
                    foundRateMemo,
                    currency || "USD"
                  )}

                {currency && isRatesLoading && (
                  <Skeleton className="h-4 w-10" />
                )}

                {!currency && "-"}
              </div>
            </div>

            {currency && !isRatesLoading && !isRatesError && !foundRateMemo && (
              <CustomAlert
                variant="destructive"
                message={`We don't currently support ${currency} deposits`}
              />
            )}
            {currency && !isRatesLoading && isRatesError && (
              <CustomAlert
                variant="destructive"
                message={`Something went wrong.`}
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-custom-grey text-xs md:text-sm">
              Enter amount to fund
            </Label>
            <Input
              value={amountToFund?.formattedAmount || ""}
              inputMode="numeric"
              onChange={(e) => handleAmountChange(e.target.value)}
              type="text"
              className="py-6 w-full"
              placeholder="10"
              disabled={!currency || isConfirmed}
            />
          </div>
          {amountToFund && !isMinimumAmount && (
            <CustomAlert variant="warning" message="Minimum deposit is $10" />
          )}
          {error && <CustomAlert variant="destructive" message={error} />}

          {/* --- Checkbox Confirmation --- */}
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="confirm"
              checked={isConfirmed}
              onCheckedChange={(checked) => setIsConfirmed(!!checked)}
              disabled={!isMinimumAmount || !currency}
            />
            <Label
              htmlFor="confirm"
              className="text-xs md:text-sm text-muted-foreground"
            >
              I want to fund{" "}
              {FormatService.formatCurrency(amountToDeduct, "USD")}
            </Label>
          </div>

          {/* --- Confirmation Section (Replaces Modal) --- */}
          {isConfirmed && currency && amountToFund && (
            <div className="flex flex-col gap-6">
              <FundingSummary
                amountToFund={amountToFund.amount}
                currency={currency}
              />
              <PaymentMethods
                amountToFund={amountToFund.amount}
                currency={currency}
                selectedPaymentMethod={paymentMethod}
                handleSelectPaymentMethod={(method) => setPaymentMethod(method)}
              />
            </div>
          )}

          <Button
            className="btn-primary rounded-full w-full py-4 mt-4"
            onClick={handleFundWallet}
            disabled={!isMinimumAmount || !currency || !isConfirmed}
          >
            Fund Wallet
          </Button>
        </div>
      </div>
    </DepositWrapper>
  );
}
