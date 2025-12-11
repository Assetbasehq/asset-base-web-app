import DepositWrapper from "../../../_components/deposit-wraper";
import { useGetExternalWallets } from "@/hooks/use-external-wallets";
import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useIoMethods } from "@/hooks/useIoMethod";
import {
  getAvailableIOMethods,
  getIOMethodRate,
  normalizeCurrencyInput,
} from "@/helpers/deposit-methods";
import { FormatService } from "@/services/format-service";
import AnimatedWrapper from "@/components/animations/animated-wrapper";
import { useAuthStore } from "@/store/auth-store";
import ActionRestrictedModal from "@/components/shared/_modals/action-restricted";
import { RiseAccount } from "@/components/shared/rise-account";
import { PinConfirmationModal } from "@/components/modals/pin-confirmation";
import { useMutation } from "@tanstack/react-query";
import SuccessModal from "@/components/modals/success-modal";
import {
  transactionRequestService,
  type ITransactionRequest,
} from "@/api/transaction-request";
import { CustomAlert } from "@/components/custom/custom-alert";

interface IAmountToFund {
  amount: number;
  formattedAmount: string;
}

export default function FundUsdWithUsdRiseWallet() {
  const [amountToFund, setAmountToFund] = useState<IAmountToFund | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmationPinModalOpen, setIsConfirmationPinModalOpen] =
    useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [externalWalletId, setExternalWalletId] = useState<string | null>(null);
  
  const [actionRestricted, setActionRestricted] = useState(false);
  const { user, isUserVerified } = useAuthStore();

  const { data: ioMethods } = useIoMethods({
    filter_key: "intent",
    filter_value: "funding",
  });

  const selectedMethod = useMemo(() => {
    const availableOptions = getAvailableIOMethods(
      ioMethods || [],
      "usd",
      "usd"
    );

    return availableOptions.find((m) => m.channel === "api_vendor");
  }, [ioMethods]);

  const mutation = useMutation({
    mutationFn: transactionRequestService.initiateNewTransaction,
    onSuccess: (data) => {
      console.log({ data });
      setIsConfirmationPinModalOpen(false);
      setIsSuccessModalOpen(true);
      setAmountToFund({ amount: 0, formattedAmount: "" });
    },
    onError: (error) => {
      setError(error.message);
      // console.log({ error });
    },
  });

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

  const onConfirm = async (pin: string) => {
    //Send request

    if (!amountToFund) {
      setError("Please provide an amount");
    }
    if (!externalWalletId) {
      setError("Something went wrong");
    }

    const payload: ITransactionRequest = {
      amount: amountToFund?.amount as number,
      currency: "usd",
      dest_wallet_currency: "usd",
      external_wallet_id: externalWalletId as string,
      request_type: "funding",
      wallet_type: "api_vendor",
      credential: pin,
    };

    mutation.mutateAsync(payload);
  };

  const isMinimumAmount = amountToFund ? amountToFund?.amount >= 10 : false;

  // console.log({ isMinimumAmount, v: !isUserVerified() });

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
            {FormatService.formatToUSD(amountToFund?.amount || 0)}
          </p>
        </div>
      </div>

      {amountToFund && !isMinimumAmount && (
        <CustomAlert variant="warning" message={"Minimum deposit is $10"} />
      )}

      <AnimatedWrapper animationKey={String(user?.metadata?.rise_account_id)}>
        <RiseAccount
          currency="usd"
          disabled={!isUserVerified() || !isMinimumAmount}
          onSelect={(externalWalletId: string) => {
            setExternalWalletId(externalWalletId);
            setIsConfirmationPinModalOpen(true);
          }}
        />
      </AnimatedWrapper>

      <PinConfirmationModal
        isOpen={isConfirmationPinModalOpen}
        onClose={() => setIsConfirmationPinModalOpen(false)}
        onConfirm={onConfirm}
        title="Authorize Transaction"
        description="Enter your Rise 6-digit PIN to authorize this transaction"
        error={error}
        setError={setError}
        btnText="Confirm"
        btnLoadingText="Processing..."
        isLoading={mutation.isPending}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
        }}
        title="Funnding Successful"
        description={`You have successfully funded your wallet with ${FormatService.formatCurrency(
          amountToFund?.amount,
          "usd"
        )}.`}
        buttonText="Close"
      />
    </DepositWrapper>
  );
}
