import DepositWrapper from "../../../_components/deposit-wraper";
import { useGetExternalWallets } from "@/hooks/use-external-wallets";
import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useIoMethods } from "@/hooks/useIoMethod";
import {
  getAvailableIOMethods,
  getIOMethodRate,
} from "@/helpers/deposit-methods";
import { FormatService } from "@/services/format-service";
import AnimatedWrapper from "@/components/animations/animated-wrapper";
import { useAuthStore } from "@/store/auth-store";
import ActionRestrictedModal from "@/components/shared/_modals/action-restricted";
import { LinkRiseWallet } from "@/components/shared/link-rise-wallet";
import { RiseAccount } from "@/components/shared/rise-account";

export default function FundUsdWithUsdRiseWallet() {
  const [amountToFund, setAmountToFund] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [actionRestricted, setActionRestricted] = useState(false);
  const { user, isUserVerified } = useAuthStore();

  console.log({ user });

  const { data: ioMethods } = useIoMethods({
    filter_key: "intent",
    filter_value: "funding",
  });

  const { data, isLoading } = useGetExternalWallets({
    fetch_balance: "true",
    currency: "usd",
    // wallet_type: "api_vendor",
    // provider: "api_vendor",
  });

  const selectedMethod = useMemo(() => {
    const availableOptions = getAvailableIOMethods(
      ioMethods || [],
      "usd",
      "usd"
    );

    return availableOptions.find((m) => m.channel === "api_vendor");
  }, [ioMethods]);

  const handleAmountChange = (amount: string) => {
    setError(null);
    const amountNumber = Number(amount);
    if (!isNaN(amountNumber)) setAmountToFund(amountNumber);
  };

  return (
    <DepositWrapper>
      <ActionRestrictedModal
        isOpen={actionRestricted}
        onClose={() => setActionRestricted(false)}
      />

      <div className="flex flex-col gap-4 text-start w-full max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-semibold">Fund With Rise Wallet</h2>
          <p className="text-muted-foreground text-sm">
            Minimum deposit is $10
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-custom-grey text-xs md:text-sm">
            Enter amount to fund
          </Label>
          <Input
            onChange={(e) => handleAmountChange(e.target.value)}
            type="text"
            className="py-6 w-full"
            placeholder="10"
          />
          <div className="flex justify-between text-xs border px-4 py-2 rounded-full">
            <p className="text-custom-grey"> $1 </p>
            <p className="font-semibold">
              {selectedMethod && getIOMethodRate(selectedMethod)}
            </p>
          </div>
        </div>
      </div>

      <div className="text-xs text-custom-grey flex flex-col gap-2">
        <div className="flex justify-between">
          <p>Amount to deduct</p>
          <p className="font-semibold">
            {FormatService.formatToUSD(amountToFund || 0)}
          </p>
        </div>
      </div>

      <AnimatedWrapper animationKey={String(user?.metadata?.rise_account_id)}>
        <RiseAccount isLinked={Boolean(user?.metadata?.rise_account_id)} />
      </AnimatedWrapper>
    </DepositWrapper>
  );
}
