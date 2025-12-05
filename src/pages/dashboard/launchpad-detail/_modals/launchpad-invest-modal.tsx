import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import type { IAsset } from "@/interfaces/asset.interface";
import { FormatService } from "@/services/format-service";
import { normalizeCurrencyInput } from "@/helpers/deposit-methods";
import { useWallet } from "@/hooks/useWallet";
import { CustomAlert } from "@/components/custom/custom-alert";

interface InvestFormData {
  quantity: number;
  quantityFormatted: string;
}

interface LaunchpadInvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  asset: IAsset;
  setNumberOfShares: (amount: number) => void;
  walletBalance: number;
}

export function LaunchpadInvestModal({
  isOpen,
  onClose,
  asset,
  onSuccess,
  setNumberOfShares,
  walletBalance,
}: LaunchpadInvestModalProps) {
  const { register, handleSubmit, setValue, watch } = useForm<InvestFormData>({
    defaultValues: {
      quantity: 0,
      quantityFormatted: "",
    },
  });

  const quantity = watch("quantity"); // raw number for backend
  const quantityFormatted = watch("quantityFormatted"); // UI field
  const estimatedAmount = quantity * asset.price_per_share;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const { amount, formattedAmount } = normalizeCurrencyInput(value);

    setValue("quantity", Number(amount || 0));
    setValue("quantityFormatted", formattedAmount);

    setNumberOfShares(Number(amount || 0));
  };

  const onSubmit = (data: InvestFormData) => {
    console.log({ data });
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md bg-custom-card text-custom-white rounded-2xl font-geist"
      >
        <DialogHeader className="text-start flex- gap-0">
          <DialogTitle className="text-lg font-bold">
            Invest in Asset
          </DialogTitle>
          <DialogDescription className="text-custom-grey">
            Please type in the quantity of shares you want to purchase.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          {/* Quantity Input */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-custom-grey">
                Quantity of Shares
              </label>
              <Input
                type="text"
                {...register("quantityFormatted")}
                value={quantityFormatted}
                onChange={handleQuantityChange}
                className="bg-custom-light-bg border-custom-input-stroke text-custom-white py-6"
                placeholder="Enter number of shares"
              />
            </div>

            {/* Estimated Amount Display */}
            <div className="relative">
              <label className="text-sm text-custom-grey">
                Estimated Amount
              </label>
              <Input
                type="text"
                readOnly
                value={FormatService.formatCurrency(
                  estimatedAmount || 0,
                  asset.currency
                )}
                className="bg-custom-light-bg border-custom-input-stroke text-custom-white pr-20 py-6 tracking-wide"
              />
            </div>
          </div>

          {estimatedAmount > walletBalance && (
            <CustomAlert
              variant="warning"
              message="Insufficient Balance"
              className="my-2"
            />
          )}

          <div className="my-1">
            <small>
              Available Balance:{" "}
              {FormatService.formatCurrency(walletBalance, asset.currency)}
            </small>
          </div>

          {/* Modal Footer */}
          <DialogFooter>
            <Button
              disabled={
                quantity <= 0 ||
                estimatedAmount > walletBalance ||
                walletBalance <= 0
              }
              type="submit"
              className="btn-primary w-full rounded-full py-5"
            >
              Purchase
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
