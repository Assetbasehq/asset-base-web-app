import { useMemo, useState } from "react";
import DepositWrapper from "../../../_components/deposit-wraper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useIoMethods } from "@/hooks/useIoMethod";
import {
  getAvailableIOMethods,
  getIOMethodRate,
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
import { FormatService } from "@/services/format-service";
import { useGetExternalWallets } from "@/hooks/use-external-wallets";
import { RiArrowRightSLine, RiBankCardLine } from "react-icons/ri";
import { Loader } from "lucide-react";
import SaveCardModal from "../../../_components/save-card-modal";
import type { CardItem } from "@/interfaces/external-wallets";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import doubleCheckImage from "@/assets/images/check-double-line.svg";
import { CustomAlert } from "@/components/custom/custom-alert";

export default function FundWithNGNCard() {
  const [amountToFund, setAmountToFund] = useState<number | null>(null);
  const [shouldSaveCard, setShouldSaveCard] = useState(false);
  const [isSavingCard, setIsSavingCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

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
      handleBringUpPaymentModal(data.id);
    },
    onError: (error) => {
      console.log({ error });
      setError(error.message);
    },
  });

  // Available filtered IO methods
  const selectedMethod = useMemo(() => {
    const availableOptions = getAvailableIOMethods(
      ioMethods || [],
      "usd",
      "ngn"
    );

    return availableOptions.find((m) => m.channel === "card");
  }, [ioMethods]);

  const handleAmountChange = (amount: string) => {
    setError(null);
    const amountNumber = Number(amount);
    if (!isNaN(amountNumber)) setAmountToFund(amountNumber);
  };

  const handleBringUpPaymentModal = (ref: string) => {
    if (!ref) {
      console.log("No transaction ref");
      return;
    }

    const handleFlutterPayment = useFlutterwave({
      public_key: env.FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: ref,
      amount: amountToFund as number,
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
        description: `Fund Assetbase Wallet with $1`,
        logo: "",
      },
    });

    handleFlutterPayment({
      callback: (response) => {
        console.log({ response });

        if (response.status === "success") {
          closePaymentModal();
        }
      },
      onClose: () => {},
    });
  };

  const handleSubmit = async () => {
    console.log({ shouldSaveCard });

    const payload: ITransactionRequest = {
      currency: "ngn",
      provider: "flutterwave",
      request_type: "funding",
      wallet_type: "card",
      amount: amountToFund as number,
      dest_wallet_currency: "usd",
    };

    if (selectedCard) {
      payload.external_wallet_id = selectedCard.id;
    }

    if (!selectedCard) {
      payload.external_wallet = { should_save: shouldSaveCard };
    }

    console.log({ payload });

    await mutateAsync(payload);
  };

  const handleOpenSaveCardModal = () => setIsSavingCard(true);
  const handleSelectCard = (card: any) => {
    setShouldSaveCard(true);
    setSelectedCard(card);
  };

  const buyRate = selectedMethod?.currency?.buy_rate || 0;
  const dollarEquivalent = amountToFund ? amountToFund / buyRate : 0;
  const amountToDeduct = amountToFund;
  const isMinimumAmount = amountToDeduct ? dollarEquivalent <= 10 : true;

  return (
    <DepositWrapper>
      <SaveCardModal
        isOpen={isSavingCard}
        onClose={() => setIsSavingCard(false)}
        onSelect={(shouldSaveCard) => {
          setShouldSaveCard(shouldSaveCard);
          setIsSavingCard(false);
          handleSubmit();
        }}
      />

      <div className="text-custom-white-text flex flex-col gap-4">
        <div className="flex flex-col gap-4 text-start w-full max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Fund With Card</h2>
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

          {amountToFund && isMinimumAmount && (
            <CustomAlert variant="warning" message="Minimum deposit is $10" />
          )}
          {error && <CustomAlert variant="destructive" message={error} />}

          <div className="text-xs text-custom-grey mt-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <p>Amount to deduct</p>
              <p className="font-semibold">
                {FormatService.formatToNaira(amountToDeduct)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Dollar equivalent</p>
              <p className="font-semibold">
                {FormatService.formatToUSD(dollarEquivalent)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 ">
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
          </div>
        </div>
      </div>
    </DepositWrapper>
  );
}

interface ExternalWalletProps {
  wallets: CardItem[];
  selectedCard: CardItem | null;
  isLoading: boolean;
  isMinimumAmount: boolean;
  amountToFund: number | null;
  onSubmit: () => void;
  handleSelectCard: (card: any) => void;
}

function ExternalWallets({
  wallets,
  isLoading,
  amountToFund,
  selectedCard,
  isMinimumAmount,
  handleSelectCard,
  onSubmit,
}: ExternalWalletProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    handleSelectCard(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (wallets.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="flex gap-3 min-w-max">
          {wallets
            .sort(
              (a: any, b: any) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((card: any) => (
              <Button
                key={card.id}
                disabled={isMinimumAmount}
                onClick={() => {
                  handleSelectCard(card);
                  setIsModalOpen(true);
                }}
                className="bg-custom-input-fill border-2 border-custom-input-stroke text-custom-grey hover:bg-custom-input-fill/80 cursor-pointer rounded-xl text-sm py-12 px-4 flex justify-between items-center gap-4 min-w-[200px]"
              >
                <div className="flex flex-col items-start gap-2 w-full">
                  <RiBankCardLine className="!w-10 !h-10 bg-custom-card p-2 rounded-full" />
                  <div className="flex justify-between w-full">
                    <div>
                      <p className="capitalize text-xs">{card.details.brand}</p>
                      <p className="text-xs">••••{card.details.last_digits}</p>
                    </div>
                    <RiArrowRightSLine size={20} />
                  </div>
                </div>
              </Button>
            ))}
        </div>
      </div>

      {/* Modal for Confirming Transaction */}
      {selectedCard && (
        <ConfirmCardSelection
          amountToFund={amountToFund}
          card={selectedCard}
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={onSubmit}
        />
      )}
    </div>
  );
}

interface CardSelectionModalProps {
  card: CardItem;
  amountToFund: number | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ConfirmCardSelection({
  card,
  amountToFund,
  isOpen,
  onClose,
  onConfirm,
}: CardSelectionModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-50 p-4">
            <img src={doubleCheckImage} className="h-10 w-10" alt="" />
          </div>
        </div>

        <DialogHeader className="pb-8 flex flex-col gap-0">
          <DialogTitle className="text-lg font-bold text-center">
            Proceed with card
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-center">
            You have selected debit card{" "}
            <span className="font-medium">{card?.details?.last_digits}</span> to
            fund wallet with{" "}
            <span className="font-medium">
              {FormatService.formatToNaira(amountToFund)}
            </span>
            . Are you sure you want to proceed with this transaction?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 w-full">
            <Button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="btn-primary w-full rounded-full "
            >
              Fund with {FormatService.formatToNaira(amountToFund)}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full rounded-full cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
