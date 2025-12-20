import React, { useEffect, useMemo, useState } from "react";
import DepositWrapper from "../../../_components/deposit-wraper";
import ActionRestrictedModal from "@/components/shared/_modals/action-restricted";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
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
import { Button } from "@/components/ui/button";
import {
  usePlaidLink,
  type PlaidLinkOptionsWithLinkToken,
} from "react-plaid-link";
import { Loader } from "lucide-react";
import { externalWalletService } from "@/api/external-wallets.api";
import ExternalBankAccounts from "../../../_common/external-bank-accounts";
import { formatService } from "@/services/format-service";

interface IAmountToFund {
  amount: number;
  formattedAmount: string;
}

export default function FundUsdWithUsdBankAccount() {
  const [amountToFund, setAmountToFund] = useState<IAmountToFund | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isActionRestricted, setIsActionRestricted] = useState(false);
  const [plaidToken, setPlaidToken] = useState<string | null>(null);

  const { isUserVerified } = useAuthStore();

  const createExternalWalletMutation = useMutation({
    mutationFn: externalWalletService.createExternalWallet,
    onSuccess: (data) => {
      console.log({ data });
      setIsProcessing(false);
    },
    onError: (error) => {
      console.log({ error });
      setError(error.message);
      setIsProcessing(false);
    },
  });

  //Config
  const config: PlaidLinkOptionsWithLinkToken = {
    onSuccess: (public_token) => {
      console.log("Plaid link successful:", public_token);
      createExternalWalletMutation.mutateAsync({
        currency: "usd",
        provider: "plaid",
        wallet_type: "bank_account",
        details: { token: public_token },
      });
      setSuccess("Bank account added successfully.");
      setIsProcessing(false);
    },
    token: plaidToken,
    onExit: () => {
      console.log("User exited Plaid Link flow");
      setIsProcessing(false);
      setError("You exited the bank linking process.");
    },
  };

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (plaidToken && ready) {
      open();
    }
  }, [plaidToken, ready, open]);

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
    mutationFn: externalWalletService.getWalletToken,
    onSuccess: (data) => {
      console.log({ data });
      // setClientSecret(data.metadata.client_secret);
      setPlaidToken(data.token);
    },
    onError: (error) => {
      console.log({ error });
      setError(error.message);
      setIsProcessing(false);
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

  const handleSubmit = async () => {
    if (!isUserVerified()) return setIsActionRestricted(true);

    setIsProcessing(true);

    const payload = {
      currency: "usd",
      provider: "plaid",
      wallet_type: "bank_account" as const,
    };

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
    ready,
    plaidToken,
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
          {success && <CustomAlert variant="success" message={success} />}

          <div className="text-xs text-custom-grey mt-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <p>Amount to deduct</p>
              <p className="font-semibold">
                {formatService.formatToUSD(amountToFund?.amount || 0)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Fee</p>
              <p className="font-semibold tracking-wide">
                {formatService.formatToUSD(calculatedFee)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>You'll receive</p>
              <p className="font-semibold">
                {formatService.formatToUSD(amountToReceive || 0)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 ">
            {/* <p className="text-custom-white text-sm">Select Funding Card</p> */}

            <ExternalBankAccounts
              wallets={externalWallets?.items || []}
              isLoading={isExternalWalletsLoading}
              isMinimumAmount={!isMinimumAmount}
              handleSelectBankAccount={() => {}}
            />

            <Button
              disabled={isProcessing || isPending}
              onClick={handleSubmit}
              className="btn-primary rounded-full py-6"
            >
              {isProcessing || isPending ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin mr-2" />
                  Processing...
                </span>
              ) : (
                "Add New Bank Account"
              )}
            </Button>
          </div>
        </div>
      </div>

      <ActionRestrictedModal
        isOpen={isActionRestricted}
        onClose={() => setIsActionRestricted(false)}
      />

      {/* <PlaidModal
        isOpen={ready && isPlaidModalOpen}
        onClose={() => setIsPlaidModalOpen(false)}
      /> */}
    </DepositWrapper>
  );
}

// interface PlaidModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// function PlaidModal({ isOpen, onClose }: PlaidModalProps) {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Add New Bank Account</DialogTitle>
//           <DialogDescription>
//             Enter your bank account details to continue funding your wallet.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="grid gap-4 py-4">
//           <div className="grid gap-2">
//             <Label htmlFor="accountName">Account Name</Label>
//             <Input id="accountName" placeholder="John Doe" />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="accountNumber">Account Number</Label>
//             <Input id="accountNumber" placeholder="0123456789" />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="bankName">Bank Name</Label>
//             <Input id="bankName" placeholder="Bank of America" />
//           </div>
//         </div>

//         <DialogFooter className="flex justify-end gap-2">
//           <DialogClose asChild>
//             <Button variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//           </DialogClose>
//           <Button className="btn-primary">Save Bank Account</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
