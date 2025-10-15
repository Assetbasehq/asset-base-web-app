import { useMemo, useState } from "react";
import DepositWrapper from "../../_components/deposit-wraper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomAlert } from "@/components/custom/custom-alert";
import { normalizeCurrencyInput } from "@/helpers/deposit-methods";
import { FormatService } from "@/services/format-service";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { commonService } from "@/api/common.api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConfirmFundingModal from "./_modals/confirmation-modal";

const currencies = ["NGN", "UGX", "GHS", "KES"];
type Currency = "NGN" | "UGX" | "GHS" | "KES";

interface IAmountToFund {
  amount: number;
  formattedAmount: string;
}

export default function FundCryptoWithFiat() {
  const [amountToFund, setAmountToFund] = useState<IAmountToFund | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { data: ratesData, isPending: isRatesLoading } = useQuery({
    queryKey: ["rates", currency],
    queryFn: () =>
      commonService.getRates({
        currency: currency!,
        type: "buy",
      }),
    enabled: !!currency,
  });

  console.log({ ratesData: ratesData?.data });

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
    setAmountToFund(null);
    setError(null);
  };

  const handleOpenConfirm = () => {
    if (!amountToFund?.amount || !currency) return;
    setIsConfirmOpen(true);
  };

  const amountToDeduct = amountToFund?.amount ?? 0;
  const isMinimumAmount =
    amountToDeduct && foundRateMemo
      ? amountToDeduct / foundRateMemo >= 10
      : false;

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
          <div className="flex flex-col gap-2">
            <Label className="text-custom-grey text-xs md:text-sm">
              Select Currency
            </Label>
            <Select
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
              <p className="font-semibold">
                {currency && foundRateMemo
                  ? FormatService.formatCurrency(
                      foundRateMemo,
                      currency || "USD"
                    )
                  : "-"}
              </p>
            </div>
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
            />
          </div>
          {amountToFund && !isMinimumAmount && (
            <CustomAlert variant="warning" message="Minimum deposit is $10" />
          )}
          {error && <CustomAlert variant="destructive" message={error} />}
          {currency && !isRatesLoading && !foundRateMemo && (
            <CustomAlert
              variant="destructive"
              message={`We don't currently support ${currency} deposits`}
            />
          )}
          {/* 
          <div className="text-xs text-custom-grey mt-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <p>Amount to deduct</p>
              <p className="font-semibold">
                {FormatService.formatCurrency(
                  amountToFund?.amount || 0,
                  currency || "USD"
                )}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Fee</p>
              <p className="font-semibold tracking-wide">
                {FormatService.formatToUSD(0)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>You'll receive</p>
              <p className="font-semibold">
                {FormatService.formatToUSD(amountToFund?.amount || 0)}
              </p>
            </div>
          </div> */}
          <Button
            className="btn-primary rounded-full w-full py-4 mt-4"
            onClick={handleOpenConfirm}
            disabled={!isMinimumAmount || !currency}
          >
            Fund Wallet
          </Button>
        </div>
      </div>

      <ConfirmFundingModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        amountToFund={amountToFund?.amount || 0}
        currency={currency || ""}
      />
    </DepositWrapper>
  );
}
