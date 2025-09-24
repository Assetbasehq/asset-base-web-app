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
import { transactionRequestService } from "@/api/transaction-request";
import { Button } from "@/components/ui/button";
import { FormatService } from "@/services/format-service";

export default function FundWithNGNCard() {
  const [amountToFund, setAmountToFund] = useState<number | null>(null);
  const { user } = useAuthStore();

  const { data: ioMethods } = useIoMethods({
    filter_key: "intent",
    filter_value: "funding",
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: transactionRequestService.initiateNewTransaction,
    onSuccess: (data) => {
      console.log({ data });
      handleBringUpPaymentModal(data.id);
    },
    onError: (error) => {
      console.log({ error });
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

  console.log({ selectedMethod });

  const handleAmountChange = (amount: string) => {
    const amountNumber = Number(amount);
    if (!isNaN(amountNumber)) setAmountToFund(amountNumber);
  };

  console.log({ key: env.FLUTTERWAVE_PUBLIC_KEY });

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
    await mutateAsync({
      currency: "ngn",
      provider: "flutterwave",
      request_type: "funding",
      external_wallet: { should_save: true },
      wallet_type: "card",
      amount: amountToFund as number,
      dest_wallet_currency: "usd",
    });
  };

  const buyRate = selectedMethod?.currency?.buy_rate || 0;
  const dollarEquivalent = amountToFund ? amountToFund / buyRate : 0;
  const amountToDeduct = amountToFund;

  return (
    <DepositWrapper>
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

          <Button
            // disabled={!state.fundingMethod}
            disabled={!amountToFund}
            onClick={() => handleSubmit()}
            className="btn-primary rounded-full py-4 md:py-6 mt-6 w-full text-xs"
          >
            {isPending ? "Processing..." : "Continue"}
          </Button>
        </div>
      </div>
    </DepositWrapper>
  );
}
