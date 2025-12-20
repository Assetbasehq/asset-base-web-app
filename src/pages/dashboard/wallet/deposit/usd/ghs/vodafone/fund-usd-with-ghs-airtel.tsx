import { useMemo, useState } from "react";
import DepositWrapper from "../../../_components/deposit-wraper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useGetExternalWallets } from "@/hooks/use-external-wallets";
import { useIoMethods } from "@/hooks/useIoMethod";
import {
  calculateIOMethodFee,
  getAvailableIOMethods,
  getIOMethodRate,
  normalizeCurrencyInput,
} from "@/helpers/deposit-methods";
import { CustomAlert } from "@/components/custom/custom-alert";
import { Button } from "@/components/ui/button";
import {
  transactionRequestService,
  type ITransactionRequest,
} from "@/api/transaction-request";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import ActionRestrictedModal from "@/components/shared/_modals/action-restricted";
import { useAuthStore } from "@/store/auth-store";
import { formatService } from "@/services/format-service";

interface IAmountToFund {
  amount: number | null;
  formattedAmount: string;
}

export default function FundUsdWithGhsVodafone() {
  const [amountToFund, setAmountToFund] = useState<IAmountToFund | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shouldSaveCard, setShouldSaveCard] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [actionRestricted, setActionRestricted] = useState(false);
  const { user, isUserVerified } = useAuthStore();

  const { data: ioMethods } = useIoMethods({
    filter_key: "intent",
    filter_value: "funding",
  });

  const { data: externalWallets, isLoading: isExternalWalletsLoading } =
    useGetExternalWallets({
      currency: "ghs",
      wallet_type: "card",
    });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: transactionRequestService.initiateNewTransaction,
    onSuccess: (data) => {
      console.log({ data });
      window.location.href = data.metadata.auth_url;
      // handleBringUpPaymentModal(data.id);
    },
    onError: (error) => {
      console.log({ error });
      setError(error.message);
    },
  });

  const selectedMethod = useMemo(() => {
    const availableOptions = getAvailableIOMethods(
      ioMethods || [],
      "usd",
      "ghs"
    );

    return availableOptions.find(
      (m) => m.channel === "mobile_money" && m.network_code === "vodafone"
    );
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

  const handlePhoneChange = (value: string) => {
    let sanitized = value.replace(/\D/g, ""); // Keep only digits

    // If pasted with country code, strip it
    if (sanitized.startsWith("233")) {
      sanitized = sanitized.slice(3);
    }

    setPhoneNumber(sanitized);
  };

  const handleSubmit = async () => {
    if (!isUserVerified) return setActionRestricted(true);

    setError(null);
    const redirectURL = window.location.origin + `/dashboard/wallet`;
    const payload: ITransactionRequest = {
      request_type: "funding",
      amount: amountToFund?.amount as number,
      currency: "ghs",
      provider: "flutterwave",
      wallet_type: "mobile_money",
      dest_wallet_currency: "usd",
      external_wallet: {
        phone_number: phoneNumber,
        network: "vodafone",
        should_save: shouldSaveCard,
        redirect_url: redirectURL,
      },
    };

    console.log({ payload });

    await mutateAsync(payload);
  };

  const calculatedFee = calculateIOMethodFee(
    amountToFund?.amount,
    selectedMethod
  );
  const buyRate = selectedMethod?.currency?.buy_rate || 0;
  const dollarEquivalent = amountToFund
    ? (Number(amountToFund?.amount) - calculatedFee) / buyRate
    : 0;
  const amountToDeduct = amountToFund?.amount;
  const isMinimumAmount = amountToDeduct ? dollarEquivalent >= 10 : false;

  console.log({ selectedMethod });

  return (
    <DepositWrapper>
      {/* <SaveCardModal
          isOpen={isSavingCard}
          onClose={() => setIsSavingCard(false)}
          onSelect={(shouldSaveCard) => {
            setShouldSaveCard(shouldSaveCard);
            setIsSavingCard(false);
            handleSubmit();
          }}
        /> */}
      <ActionRestrictedModal
        isOpen={actionRestricted}
        onClose={() => setActionRestricted(false)}
      />

      <div className="text-custom-white-text flex flex-col gap-4">
        <div className="flex flex-col gap-4 text-start w-full max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">
              Fund With Mobile Money - Vodafone
            </h2>
            <p className="text-muted-foreground text-sm">
              Minimum deposit is $10
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-custom-grey text-xs md:text-sm">
              Enter Phone Number
            </Label>
            <div className="flex items-center">
              <Input
                value={"+233"}
                disabled
                className="w-20 py-6 rounded-none rounded-l-md text-center bg-gray-100 cursor-not-allowed font-medium"
              />
              <Input
                value={phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                type="tel"
                className="flex-1 py-6 rounded-none rounded-r-md"
                placeholder="247365914"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-custom-grey text-xs md:text-sm">
              Enter amount to fund
            </Label>
            <div className="flex items-center">
              <Input
                value={amountToFund?.formattedAmount || ""}
                inputMode="numeric"
                onChange={(e) => handleAmountChange(e.target.value)}
                type="text"
                className="flex-1 py-6"
                placeholder="10"
              />
            </div>
            <div className="flex justify-between text-xs border px-4 py-2 rounded-full">
              <p className="text-custom-grey"> $1 </p>
              <p className="font-semibold">
                {selectedMethod && getIOMethodRate(selectedMethod)}
              </p>
            </div>
          </div>

          {amountToFund && !isMinimumAmount && (
            <CustomAlert variant="warning" message="Minimum deposit is $10" />
          )}
          {error && <CustomAlert variant="destructive" message={error} />}

          <div className="text-xs text-custom-grey mt-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <p>Amount to deduct</p>
              <p className="font-semibold">
                {formatService.formatToGHS(amountToDeduct || 0)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Fee</p>
              <p className="font-semibold tracking-wide">
                {formatService.formatToGHS(calculatedFee)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Dollar equivalent</p>
              <p className="font-semibold">
                {formatService.formatToUSD(dollarEquivalent)}
              </p>
            </div>
          </div>

          <Button
            disabled={!isMinimumAmount || phoneNumber.length < 9 || isPending}
            onClick={handleSubmit}
            className="btn-primary py-6 rounded-full"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader /> Processing...
              </span>
            ) : (
              <span>Pay</span>
            )}
          </Button>

          {/* <div className="flex flex-col gap-2 ">
              <p className="text-custom-grey text-xs">Select Funding Card</p>
              <ExternalWallets
                wallets={externalWallets?.items || []}
                isLoading={isExternalWalletsLoading}
                isMinimumAmount={isMinimumAmount}
                selectedCard={selectedCard}
                amountToFund={amountToFund}
                handleSelectCard={handleSelectCard}
                onSubmit={handleSubmit}
              />
              <Button
                disabled={isMinimumAmount}
                onClick={handleOpenSaveCardModal}
                className="mt-1 bg-custom-blue-shade text-custom-white hover:bg-custom-blue-shade/90 cursor-pointer rounded text-sm py-8 px-4 flex justify-between items-center gap-4 w-full"
              >
                <div className="flex items-center gap-2">
                  <RiBankCardLine size={40} className="!w-6 !h-6" />
                  <div className="text-start">
                    <p className="text-sm">Pay with a new card</p>
                    <p className="text-xs">We support Visa, Mastercard, Verve</p>
                  </div>
                </div>
                <RiArrowRightSLine size={20} />
              </Button>
            </div> */}
        </div>
      </div>
    </DepositWrapper>
  );
}
