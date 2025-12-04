import DepositWrapper from "../../../_components/deposit-wraper";
import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useIoMethods } from "@/hooks/useIoMethod";
import {
  calculateIOMethodFee,
  getAvailableIOMethods,
  normalizeCurrencyInput,
} from "@/helpers/deposit-methods";
import { CustomAlert } from "@/components/custom/custom-alert";
import { FormatService } from "@/services/format-service";
import AnimatedWrapper from "@/components/animations/animated-wrapper";
import { useAuthStore } from "@/store/auth-store";
import { RiseAccount } from "@/components/shared/rise-account";

interface IAmountToFund {
  amount: number | null;
  formattedAmount: string;
}

export default function FundNgnWithNgnRiseWallet() {
  const [amountToFund, setAmountToFund] = useState<IAmountToFund | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuthStore();

  console.log({ user });

  const { data: ioMethods } = useIoMethods({
    filter_key: "intent",
    filter_value: "funding",
  });

  const selectedMethod = useMemo(() => {
    const availableOptions = getAvailableIOMethods(
      ioMethods || [],
      "ngn",
      "ngn"
    );

    return availableOptions.find((m) => m.channel === "api_vendor");
  }, [ioMethods]);

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

  const isRiseAccountLinked = user?.metadata?.rise_account_id ? true : false;

  const calculatedFee = calculateIOMethodFee(
    amountToFund?.amount,
    selectedMethod
  );
  const buyRate = selectedMethod?.currency?.buy_rate
    ? selectedMethod?.currency?.buy_rate
    : 0;
  const minimumAmount = buyRate * 10;
  const amountToReceive = amountToFund
    ? Number(amountToFund?.amount) - calculatedFee
    : 0;
  const isMinimumAmount = amountToFund
    ? Number(amountToFund?.amount) >= minimumAmount
    : false;

  return (
    <DepositWrapper>
      <div className="flex flex-col gap-4 text-start w-full max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-semibold">Fund With Rise Wallet</h2>
          <p className="text-muted-foreground text-sm">
            Minimum deposit is{" "}
            {selectedMethod && FormatService.formatToNaira(minimumAmount)}
          </p>
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
          {/* <div className="flex justify-between text-xs border px-4 py-2 rounded-full">
            <p className="text-custom-grey"> $1 </p>
            <p className="font-semibold">
              {selectedMethod && getIOMethodRate(selectedMethod)}
            </p>
          </div> */}
        </div>
      </div>

      {amountToFund && !isMinimumAmount ? (
        <CustomAlert
          variant="warning"
          message={`Minimum deposit is ${FormatService.formatToNaira(
            minimumAmount
          )}`}
        />
      ) : null}

      {error && <CustomAlert variant="destructive" message={error} />}

      <div className="text-xs text-custom-grey flex flex-col gap-2">
        <div className="flex justify-between">
          <p>Amount to deduct</p>
          <p className="font-semibold tracking-wide">
            {FormatService.formatToNaira(amountToFund?.amount)}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Fee</p>
          <p className="font-semibold tracking-wide">
            {FormatService.formatToNaira(calculatedFee)}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Amount you'll receive</p>
          <p className="font-semibold tracking-wide">
            {FormatService.formatToNaira(amountToReceive)}
          </p>
        </div>
      </div>

      <AnimatedWrapper animationKey={String(isRiseAccountLinked)}>
        <RiseAccount currency="ngn" />
      </AnimatedWrapper>
    </DepositWrapper>
  );
}
