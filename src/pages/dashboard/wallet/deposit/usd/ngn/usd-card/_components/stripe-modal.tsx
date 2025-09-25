import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface StripeModalProps {
  clientSecret: string;
  amountToFund: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function StripeModal({
  isOpen,
  onClose,
  clientSecret,
  amountToFund,
}: StripeModalProps) {
  if (!isOpen) return null;

  console.log({ clientSecret });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              loader: "always",
              appearance: {
                theme: "flat",
                variables: {
                  fontFamily:
                    "ClashGrotesk, Roboto, Helvetica Neue, sans-serif",
                  fontLineHeight: "1.5",
                  borderRadius: "10px",
                  colorPrimary: "#f46a2f",
                  colorBackground: "#F6F8FA",
                  colorPrimaryText: "#262626",
                },
              },
            }}
          >
            <FundWithStripe
              amountToFund={Number(amountToFund)}
              handleError={(message: string) => console.error(message)}
              handleSuccess={() => console.log("Payment successful!")}
            />
          </Elements>
        ) : (
          <div className="p-6">
            <Loader />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function FundWithStripe({
  amountToFund,
  handleError,
  handleSuccess,
}: {
  amountToFund: number;
  handleError: (message: string) => void;
  handleSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const startTransaction = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    // eventLogger('fund_wallet', {
    //   origin_screen_name: 'FundWallet',
    //   source: 'dollar_card',
    //   amount: amount,
    //   currency: 'USD',
    // })

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.href}` },
      redirect: "if_required",
    });

    if (error) {
      handleError(error.message || "Payment failed");
    } else if (paymentIntent?.status === "succeeded") {
      handleSuccess();
    } else {
      handleError("Unexpected payment status: " + paymentIntent?.status);
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={startTransaction} className="p-6">
      <h3 className="text-xl text-center font-medium mb-4">
        Fund your wallet with ${amountToFund}
      </h3>
      <PaymentElement />
      <Button
        disabled={!stripe || isProcessing}
        id="submit"
        type="submit"
        className="mt-6"
      >
        {isProcessing ? (
          <>
            <Loader color="inherit" className="text-white" size={20} />
            <span className="sr-only">Submitting</span>
          </>
        ) : (
          <>Proceed</>
        )}
      </Button>
    </form>
  );
}
