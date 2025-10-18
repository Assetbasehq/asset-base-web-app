import { useQuery } from "@tanstack/react-query";
import { transactionService } from "@/api/transaction.api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { currencyToCountry } from "@/lib/utils";

interface PaymentMethodsProps {
  amountToFund: number;
  currency: string;
  selectedPaymentMethod: "bank" | "momo" | null;
  handleSelectPaymentMethod: (method: "bank" | "momo") => void;
}

export default function PaymentMethods({
  amountToFund,
  currency,
  selectedPaymentMethod,
  handleSelectPaymentMethod,
}: PaymentMethodsProps) {
  const {
    data: paymentMethodsData,
    // isPending,
    // isError,
    // refetch,
  } = useQuery({
    queryKey: ["payment-methods", amountToFund, currency],
    queryFn: async () =>
      transactionService.getPaymentMethods({
        country: currencyToCountry[currency] || "",
        isDeposit: true,
      }),
    enabled: !!currency && amountToFund > 0,
  });

  const paymentMethods = paymentMethodsData?.data || [];

  return (
    <div className="flex flex-col gap-1">
      <Label className="text-custom-grey text-xs md:text-sm">
        Select Payment Method
      </Label>
      <Select
        defaultValue={selectedPaymentMethod ? selectedPaymentMethod : ""}
        onValueChange={handleSelectPaymentMethod}
      >
        <SelectTrigger className="w-full py-6 rounded">
          <SelectValue placeholder="Select an option">
            <span className="capitalize">{selectedPaymentMethod}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {paymentMethods?.map((paymentMethod: string, i: number) => {
            return (
              <SelectItem key={i} value={paymentMethod}>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium capitalize">
                    {paymentMethod}
                  </p>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
