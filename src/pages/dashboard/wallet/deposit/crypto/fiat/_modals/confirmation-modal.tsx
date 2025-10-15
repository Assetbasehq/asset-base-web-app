import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { FormatService } from "@/services/format-service";
import { transactionService } from "@/api/transaction.api";
import { CustomAlert } from "@/components/custom/custom-alert";

const currencyToCountry: Record<string, string> = {
  NGN: "NG",
  UGX: "UG",
  GHS: "GH",
  KES: "KE",
};

interface ConfirmFundingModalProps {
  isOpen: boolean;
  onClose: () => void;
  amountToFund: number;
  currency: string;
}

export default function ConfirmFundingModal({
  isOpen,
  onClose,
  amountToFund,
  currency,
}: ConfirmFundingModalProps) {
  const {
    data: yellowCardFeeData,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["yellow-card-fee", amountToFund, currency],
    queryFn: async () =>
      transactionService.getYellowCardFee({
        // amountCurrency: currency,
        country: currencyToCountry[currency] || "",
        amount: amountToFund,
        isDeposit: "true",
      }),
    enabled: isOpen && !!currency && amountToFund > 0,
  });

  const summary = yellowCardFeeData?.data;

  console.log({ summary, amountToFund, currency });
  console.log({ yellowCardFeeData });

  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border border-border rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Confirm Deposit
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Review the payment details before funding your wallet.
          </DialogDescription>
        </DialogHeader>

        {isError && (
          <div className="flex flex-col items-center gap-3 mt-4">
            <CustomAlert
              variant="error"
              message="Failed to fetch fee. Please try again."
            />
            <Button
              className="btn-primary rounded-full w-fit"
              onClick={() => refetch()}
            >
              Refetch
            </Button>
          </div>
        )}

        {isPending && (
          <div className="space-y-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        )}

        {/* Summary Section */}
        <div className="mt-4 space-y-4">
          {!isPending && !isError && (
            <div className="text-sm text-custom-grey flex flex-col gap-3">
              <div className="flex justify-between">
                <p>Amount to deduct</p>
                <p className="font-semibold">
                  {FormatService.formatCurrency(
                    summary?.amountToDeduct ?? amountToFund,
                    currency
                  )}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Fee</p>
                <p className="font-semibold">
                  {FormatService.formatCurrency(summary?.fee ?? 0, currency)}
                </p>
              </div>
              <div className="flex justify-between">
                <p>You’ll receive</p>
                <p className="font-semibold">
                  {FormatService.formatToUSD(summary?.amountToReceive ?? 0)}
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            disabled={isPending || isError}
            className="btn-primary w-full sm:w-auto"
          >
            {isPending ? "Loading..." : "Confirm Funding"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
