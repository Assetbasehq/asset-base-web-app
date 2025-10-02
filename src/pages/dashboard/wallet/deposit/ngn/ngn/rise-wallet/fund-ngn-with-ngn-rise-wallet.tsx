import { Button } from "@/components/ui/button";
import riseLink from "@/assets/images/rise-link.svg";
import DepositWrapper from "../../../_components/deposit-wraper";
import { useGetExternalWallets } from "@/hooks/use-external-wallets";
import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useIoMethods } from "@/hooks/useIoMethod";
import {
  calculateIOMethodFee,
  getAvailableIOMethods,
  getIOMethodRate,
  normalizeCurrencyInput,
} from "@/helpers/deposit-methods";
import riselogo from "@/assets/images/rise-r-logo.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { CustomAlert } from "@/components/custom/custom-alert";
import { FormatService } from "@/services/format-service";
import AnimatedWrapper from "@/components/animations/animated-wrapper";
import { useAuthStore } from "@/store/auth-store";

interface IAmountToFund {
  amount: number | null;
  formattedAmount: string;
}

export default function FundNgnWithNgnRiseWallet() {
  const [amountToFund, setAmountToFund] = useState<IAmountToFund | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRiseAccountLinked, setIsRiseAccountLinked] = useState(false);

  const [actionRestricted, setActionRestricted] = useState(false);
  const { user, isUserVerified } = useAuthStore();

  const isLinked = false; // Replace with actual logic later

  const { data: ioMethods } = useIoMethods({
    filter_key: "intent",
    filter_value: "funding",
  });

  const { data, isLoading } = useGetExternalWallets({
    fetch_balance: "true",
    // currency: "usd",
    // wallet_type: "api_vendor",
    // provider: "api_vendor",
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
        <LinkRiseWallet
          isLinked={isRiseAccountLinked}
          linkRiseAccount={() => setIsRiseAccountLinked(true)}
        />
      </AnimatedWrapper>
    </DepositWrapper>
  );
}

export function LinkRiseWallet({
  isLinked,
  linkRiseAccount,
}: {
  isLinked: boolean;
  linkRiseAccount: () => void;
}) {
  if (!isLinked) {
    return (
      <div className="flex flex-col items-center gap-4 text-center my-12">
        <img src={riseLink} alt="rise" className="w-28 h-28" />
        <h2 className="text-sm font-medium max-w-sm text-custom-grey">
          Your Rise account is not yet linked. Link your account to have access
          to your wallet
        </h2>
        <Button
          onClick={linkRiseAccount}
          className="btn-primary rounded-full py-6 w-full"
        >
          Link Rise Account
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center my-12">
      <Button className="flex items-center justify-between gap-4 w-full bg-custom-rise-green py-10 hover:bg-custom-rise-green/90">
        <div className="flex items-center gap-2 text-custom-grey">
          <img
            src={riselogo}
            alt="rise"
            className="w-12 h-12 bg-custom-card p-2 rounded-full"
          />
          <p>johndoe@gmail.com</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-custom-grey">Logout</p>
          <RiArrowDownSLine className="text-custom-grey" />
        </div>
      </Button>
      {/* <CustomAlert
        variant="warning"
        message="You can fund a minimun of $10 with your Rise Account"
        className="text-xs"
      /> */}
    </div>
  );
}
