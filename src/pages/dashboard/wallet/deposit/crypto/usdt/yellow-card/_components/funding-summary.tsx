import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FormatService } from "@/services/format-service";
import { CustomAlert } from "@/components/custom/custom-alert";
import { useQuery } from "@tanstack/react-query";
import { transactionService } from "@/api/transaction.api";
import { currencyToCountry } from "@/lib/utils";

interface FundingSummaryProps {
  amountToFund: number;
  currency: string;
}

export default function FundingSummary({
  amountToFund,
  currency,
}: FundingSummaryProps) {
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
    enabled: !!currency && amountToFund > 0,
  });

  const summary = yellowCardFeeData?.data;

  return (
    <div className="flex flex-col gap-1">
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
      <div className="mt-2">
        {!isPending && !isError && (
          <div className="text-sm text-custom-grey flex flex-col gap-2">
            <div className="flex justify-between">
              <p>Amount to Fund</p>
              <p className="font-semibold">
                {FormatService.formatCurrency(
                  summary?.localAmount
                    ? summary.localAmount / 100
                    : amountToFund,
                  currency
                )}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Fee</p>
              <p className="font-semibold">
                {FormatService.formatCurrency(
                  summary?.fee ? summary.feeInLocal / 100 : 0,
                  currency
                )}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Total amount to send</p>
              <p className="font-semibold">
                {FormatService.formatCurrency(
                  summary?.totalAmountInLocal
                    ? summary.totalAmountInLocal / 100
                    : 0,
                  currency
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
