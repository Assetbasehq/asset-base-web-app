import React, { useMemo, useState } from "react";
import DepositWrapper from "../../../_components/deposit-wraper";
import ActionRestrictedModal from "@/components/shared/_modals/action-restricted";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import {
  transactionRequestService,
  type ITransactionRequest,
} from "@/api/transaction-request";
import { useGetExternalWallets } from "@/hooks/use-external-wallets";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  calculateIOMethodFee,
  getAvailableIOMethods,
  getIOMethodRate,
  normalizeCurrencyInput,
} from "@/helpers/deposit-methods";
import { CustomAlert } from "@/components/custom/custom-alert";
import { useIoMethods } from "@/hooks/useIoMethod";
import { FormatService } from "@/services/format-service";
import ExternalWallets from "../../../_common/external-wallets";
import { Button } from "@/components/ui/button";
import type { CardItem } from "@/interfaces/external-wallets";
import SaveCardModal from "../../../_components/save-card-modal";
import ConfirmCardSelection from "../../../_common/confirm-card-selection";

interface IAmountToFund {
  amount: number;
  formattedAmount: string;
}

export default function FundUsdWithUsdBankAccount() {
  const [amountToFund, setAmountToFund] = useState<IAmountToFund | null>(null);
  const [shouldSaveCard, setShouldSaveCard] = useState(false);
  const [isSavingCard, setIsSavingCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmingCardSelection, setIsConfirmingCardSelection] =
    useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isActionRestricted, setIsActionRestricted] = useState(false);
  const [isPlaidModalOpen, setIsPlaidModalOpen] = useState(false);

  const { user, isUserVerified } = useAuthStore();

  const { data: ioMethods } = useIoMethods({
    filter_key: "intent",
    filter_value: "funding",
  });

  const { data: externalWallets, isLoading: isExternalWalletsLoading } =
    useGetExternalWallets({
      currency: "usd",
      wallet_type: "bank_account",
    });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: transactionRequestService.initiateNewTransaction,
    onSuccess: (data) => {
      console.log({ data });
      // setClientSecret(data.metadata.client_secret);
      setIsPlaidModalOpen(true);
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
      "usd"
    );

    return availableOptions.find((m) => m.channel === "bank_account");
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

  const handleSubmit = async () => {
    if (!isUserVerified()) return setIsActionRestricted(true);

    const payload: ITransactionRequest = {
      currency: "usd",
      provider: "stripe",
      request_type: "funding",
      wallet_type: "card",
      amount: amountToFund?.amount as number,
      dest_wallet_currency: "usd",
    };

    // if (selectedCard) {
    //   payload.external_wallet_id = selectedCard.id;
    // }

    // if (!selectedCard) {
    //   payload.external_wallet = { should_save: shouldSaveCard };
    // }

    console.log({ payload });

    await mutateAsync(payload);
  };

  const calculatedFee = calculateIOMethodFee(
    amountToFund?.amount,
    selectedMethod
  );
  const amountToDeduct = amountToFund?.amount ?? 0;
  const amountToReceive = amountToDeduct - calculatedFee;
  const isMinimumAmount = amountToDeduct ? amountToDeduct >= 10 : false;

  console.log({
    // ioMethods,
    // selectedMethod,
    externalWallets,
  });

  return (
    <DepositWrapper>
      <div className="text-custom-white-text flex flex-col gap-4">
        <div className="flex flex-col gap-4 text-start w-full max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Fund With Bank Account</h2>
            <p className="text-muted-foreground text-sm">
              Minimum deposit is $10
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
                {FormatService.formatToUSD(amountToFund?.amount || 0)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Fee</p>
              <p className="font-semibold tracking-wide">
                {FormatService.formatToUSD(calculatedFee)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>You'll receive</p>
              <p className="font-semibold">
                {FormatService.formatToUSD(amountToReceive || 0)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 ">
            <p className="text-custom-black text-xs">Select Funding Card</p>
            {/* <ExternalWallets
              wallets={externalWallets?.items || []}
              isLoading={isExternalWalletsLoading}
              isMinimumAmount={!isMinimumAmount}
              amountToFund={amountToFund?.amount as number}
              handleSelectCard={handleSelectCard}
            /> */}
            {/* <Button
              disabled={!isMinimumAmount}
              onClick={handleOpenSaveCardModal}
              className="mt-1 bg-custom-blue-shade text-custom-white hover:bg-custom-blue-shade/90 cursor-pointer rounded text-sm py-8 px-4 flex justify-between items-center gap-4 w-full"
            >
              <div className="flex items-center gap-2">
                <RiBankCardLine size={40} className="!w-6 !h-6" />
                <div className="text-start">
                  <p className="text-sm">Pay with a new card</p>
                  <p className="text-xs">
                    We support Visa, Mastercard, Discover and American Express
                  </p>
                </div>
              </div>
              <RiArrowRightSLine size={20} />
            </Button> */}

            <Button
              disabled={!isMinimumAmount}
              onClick={handleOpenSaveCardModal}
              className="btn-primary rounded-full py-6"
            >
              Pay
            </Button>
          </div>
        </div>
      </div>

      <SaveCardModal
        isOpen={isSavingCard}
        isLoading={isPending}
        onClose={() => setIsSavingCard(false)}
        onSelect={(shouldSaveCard) => {
          setShouldSaveCard(shouldSaveCard);
          setIsSavingCard(false);
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
        isOpen={isActionRestricted}
        onClose={() => setIsActionRestricted(false)}
      />
    </DepositWrapper>
  );
}

//Design Accounts Swipable grid like external wallets
