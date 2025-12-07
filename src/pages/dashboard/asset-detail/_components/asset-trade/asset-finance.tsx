import { directPurchaseService } from "@/api/direct-purchase";
import { CustomAlert } from "@/components/custom/custom-alert";
import { PinConfirmationModal } from "@/components/modals/pin-confirmation";
import SuccessModal from "@/components/modals/success-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { normalizeCurrencyInput } from "@/helpers/deposit-methods";
import { useWallet } from "@/hooks/useWallet";
import type { IAsset } from "@/interfaces/asset.interface";
import { calculateRaisePercentage } from "@/lib/utils";
import { FormatService } from "@/services/format-service";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiFlashlightFill } from "react-icons/ri";

interface InvestFormData {
  quantity: number;
  quantityFormatted: string;
}

export default function AssetFinance({ asset }: { asset: IAsset }) {
  const [numberOfShares, setNumberOfShares] = useState(0);
  const [isConfirmationPinModalOpen, setIsConfirmationPinModalOpen] =
    useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<InvestFormData>({
      defaultValues: {
        quantity: 0,
        quantityFormatted: "",
      },
    });

  const quantity = watch("quantity"); // raw number for backend
  const quantityFormatted = watch("quantityFormatted"); // UI field
  const estimatedAmount = quantity * asset.price_per_share;

  const {
    data: walletData,
    isLoading: isLoadingWallet,
    isError: isErrorWallet,
  } = useWallet({ currency: asset?.currency || "usd" });

  const mutation = useMutation({
    mutationFn: directPurchaseService.initiaiteDirectPurchase,
    onSuccess: (data) => {
      console.log({ data });
      setIsConfirmationPinModalOpen(false);
      setIsSuccessModalOpen(true);
      reset();

      // invalidate asset to update available shares
    },
    onError: (error) => {
      setError(error.message);
      // console.log({ error });
    },
  });

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const { amount, formattedAmount } = normalizeCurrencyInput(value);

    setValue("quantity", Number(amount || 0));
    setValue("quantityFormatted", formattedAmount);

    setNumberOfShares(Number(amount || 0));
  };

  const onSubmit = (data: InvestFormData) => {
    console.log({ data });
    setIsConfirmationPinModalOpen(true);
  };

  const onConfirm = async (pin: string) => {
    mutation.mutateAsync({
      asset_id: asset.id,
      number_of_shares: numberOfShares,
      pin,
    });
  };

  const raisePercentage = calculateRaisePercentage(
    asset?.number_of_shares,
    asset?.available_shares
  );

  const walletBalance = walletData?.balance || 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-custom-light-bg p-6 rounded-xl flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p>Price Per Share</p>
            <p className=" font-medium">
              {FormatService.formatCurrency(
                asset.price_per_share,
                asset.currency
              )}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Available Shares</p>
            <p className=" font-medium">
              {FormatService.formatWithCommas(asset?.available_shares)}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Price Per Share</p>
            <p className=" font-medium">
              {FormatService.formatCurrency(
                asset?.price_per_share,
                asset.currency
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start w-full pb-1">
          <Progress
            value={raisePercentage}
            className="w-full bg-custom-input-stroke [&>div]:bg-custom-orange h-2"
          />
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-1 items-center">
              <RiFlashlightFill className="text-custom-orange" />
              <small className="font-semibold text-custom-orange">
                {raisePercentage}% raised
              </small>
            </div>
            {/* <small className="font-semibold">
              {asset.available_shares} available
            </small> */}
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="">Quantity of Shares</Label>
          <Input
            type="text"
            {...register("quantityFormatted")}
            value={quantityFormatted}
            onChange={handleQuantityChange}
            className="bg-custom-light-bg border-custom-input-stroke text-custom-white py-6"
            placeholder="Enter number of shares"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="">Estimated Amount</Label>
          <Input
            type="text"
            readOnly
            disabled
            value={FormatService.formatCurrency(
              estimatedAmount || 0,
              asset.currency
            )}
            className="bg-custom-light-bg border-custom-input-stroke text-custom-white pr-20 py-6 tracking-wide"
          />
        </div>

        <div className="text-start">
          <small>
            <span className=""> Available Balance: </span>
            <span className="font-medium">
              {FormatService.formatCurrency(walletBalance, asset.currency)}
            </span>
          </small>
        </div>

        {estimatedAmount > walletBalance && (
          <CustomAlert
            variant="warning"
            message="Insufficient Balance"
            className="my-2"
          />
        )}

        <Button
          type="submit"
          disabled={
            quantity <= 0 ||
            estimatedAmount > walletBalance ||
            walletBalance <= 0
          }
          className="py-6 rounded-full btn-primary"
        >
          Place Order
        </Button>
      </form>

      <PinConfirmationModal
        isOpen={isConfirmationPinModalOpen}
        onClose={() => setIsConfirmationPinModalOpen(false)}
        onConfirm={onConfirm}
        title="Authorize Transaction"
        description="Enter your 6-digit PIN to authorize this transaction"
        error={error}
        btnText="Confirm"
        btnLoadingText="Processing..."
        isLoading={mutation.isPending}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          setNumberOfShares(0);
        }}
        title="Purchase Successful"
        description={`You have successfully purchased ${numberOfShares} shares of ${asset.asset_name}.`}
        buttonText="Close"
      />
    </div>
  );
}
