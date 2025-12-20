import { useMemo, useState } from "react";
import DepositWrapper from "../../../_components/deposit-wraper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useIoMethods } from "@/hooks/useIoMethod";
import {
  calculateIOMethodFee,
  getAvailableIOMethods,
  normalizeCurrencyInput,
} from "@/helpers/deposit-methods";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import env from "@/config";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import {
  transactionRequestService,
  type ITransactionRequest,
} from "@/api/transaction-request";
import { Button } from "@/components/ui/button";
import { useGetExternalWallets } from "@/hooks/use-external-wallets";
import { RiArrowRightSLine, RiBankCardLine } from "react-icons/ri";
import SaveCardModal from "../../../_components/save-card-modal";
import type { CardItem } from "@/interfaces/external-wallets";
import { CustomAlert } from "@/components/custom/custom-alert";
import ConfirmCardSelection from "../../../_common/confirm-card-selection";
import ExternalWallets from "../../../_common/external-wallets";
import ActionRestrictedModal from "@/components/shared/_modals/action-restricted";
import { formatService } from "@/services/format-service";

interface IAmountToFund {
  amount: number | null;
  formattedAmount: string;
}

export default function FundNgnWithNgnCard() {
  const [amountToFund, setAmountToFund] = useState<IAmountToFund | null>(null);
  const [shouldSaveCard, setShouldSaveCard] = useState(false);
  const [isSavingCard, setIsSavingCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [isConfirmingCardSelection, setIsConfirmingCardSelection] =
    useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [actionRestricted, setActionRestricted] = useState(false);
  const { user, isUserVerified } = useAuthStore();

  const { data: ioMethods } = useIoMethods({
    filter_key: "intent",
    filter_value: "funding",
  });

  const { data: externalWallets, isLoading: isExternalWalletsLoading } =
    useGetExternalWallets({
      currency: "ngn",
      wallet_type: "card",
    });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: transactionRequestService.initiateNewTransaction,
    onSuccess: (data) => {
      console.log({ data });
      setIsSavingCard(false);
      handleBringUpPaymentModal(data.id);
    },
    onError: (error) => {
      console.log({ error });
      setError(error.message);
      setIsProcessing(false);
    },
  });

  // Available filtered IO methods
  const selectedMethod = useMemo(() => {
    const availableOptions = getAvailableIOMethods(
      ioMethods || [],
      "ngn",
      "ngn"
    );

    return availableOptions.find((m) => m.channel === "card");
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

  const handleBringUpPaymentModal = (ref: string) => {
    if (!ref) {
      console.log("No transaction ref");
      setError("Something went wrong, please try again");
      return;
    }

    const handleFlutterPayment = useFlutterwave({
      public_key: env.FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: ref,
      amount: Number(amountToFund?.amount),
      currency: "NGN",
      payment_options: "card",
      customer: {
        email: `${user?.email_address ?? ""}`,
        phone_number: `${user?.phone_number ?? ""}`,
        name: `${
          user?.organization_name ?? `${user?.first_name} ${user?.last_name}`
        }`,
      },
      customizations: {
        title: `Add your card`,
        description: `Fund Assetbase Wallet with N1`,
        logo: "",
      },
    });

    handleFlutterPayment({
      callback: (response) => {
        setIsProcessing(false);
        console.log({ response });

        if (response.status === "successful") {
          //Open successfull modal
          closePaymentModal();
        }
      },
      onClose: () => {
        console.log("Payment closed");
        setError("You cancelled the transaction");
        setIsProcessing(false);
      },
    });
  };

  const handleSubmit = async () => {
    if (!isUserVerified) return setActionRestricted(true);

    setIsProcessing(true);
    setError(null);
    if (!amountToFund) return setError("Please enter an amount");

    const payload: ITransactionRequest = {
      currency: "ngn",
      provider: "flutterwave",
      request_type: "funding",
      wallet_type: "card",
      amount: Number(amountToFund?.amount),
      dest_wallet_currency: "ngn",
    };

    if (selectedCard) {
      payload.external_wallet_id = selectedCard.id;
    }

    if (!selectedCard && shouldSaveCard) {
      payload.external_wallet = { should_save: shouldSaveCard };
    }

    console.log({ payload });

    await mutateAsync(payload);
  };

  const handleOpenSaveCardModal = () => {
    setError(null);
    setSelectedCard(null);
    setIsSavingCard(true);
  };
  const handleSelectCard = (card: CardItem) => {
    setError(null);
    setShouldSaveCard(true);
    setSelectedCard(card);
    setIsConfirmingCardSelection(true);
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
      <SaveCardModal
        isLoading={isProcessing || isPending}
        isOpen={isSavingCard}
        error={error}
        onClose={() => setIsSavingCard(false)}
        onSelect={(shouldSaveCard) => {
          setShouldSaveCard(shouldSaveCard);
          handleSubmit();
        }}
      />

      <ConfirmCardSelection
        amountToFund={Number(amountToFund?.amount)}
        card={selectedCard}
        isLoading={isProcessing || isPending}
        error={error}
        isOpen={isConfirmingCardSelection}
        onClose={() => {
          setIsConfirmingCardSelection(false);
          setError(null);
        }}
        onConfirm={handleSubmit}
      />

      <ActionRestrictedModal
        isOpen={actionRestricted}
        onClose={() => setActionRestricted(false)}
      />

      <div className="text-custom-white-text flex flex-col gap-4">
        <div className="flex flex-col gap-4 text-start w-full max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Fund With Naira Card</h2>
            <p className="text-muted-foreground text-sm">
              Minimum deposit is{" "}
              {selectedMethod && formatService.formatToNaira(minimumAmount)}
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
          </div>

          {amountToFund && !isMinimumAmount ? (
            <CustomAlert
              variant="warning"
              message={`Minimum deposit is ${formatService.formatToNaira(
                minimumAmount
              )}`}
            />
          ) : null}

          {error && <CustomAlert variant="destructive" message={error} />}

          <div className="text-xs text-custom-grey flex flex-col gap-2">
            <div className="flex justify-between">
              <p>Amount to deduct</p>
              <p className="font-semibold tracking-wide">
                {formatService.formatToNaira(amountToFund?.amount)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Fee</p>
              <p className="font-semibold tracking-wide">
                {formatService.formatToNaira(calculatedFee)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Amount you'll receive</p>
              <p className="font-semibold tracking-wide">
                {formatService.formatToNaira(amountToReceive)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 ">
            <p className="text-custom-grey text-xs font-semibold">
              Select Funding Card
            </p>
            <ExternalWallets
              wallets={externalWallets?.items || []}
              isLoading={isExternalWalletsLoading}
              isMinimumAmount={!isMinimumAmount}
              amountToFund={amountToFund?.amount as number}
              handleSelectCard={handleSelectCard}
            />
            <Button
              disabled={!isMinimumAmount}
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
          </div>
        </div>
      </div>
    </DepositWrapper>
  );
}
