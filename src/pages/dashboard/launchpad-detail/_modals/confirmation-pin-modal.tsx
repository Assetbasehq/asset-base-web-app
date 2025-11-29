import { directPurchaseService } from "@/api/direct-purchase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import type { IAsset } from "@/interfaces/asset.interface";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";

interface ConfirmationPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isLoading: boolean;
  asset: IAsset;
  numberOfShares: number;
}

export default function ConfirmationPinModal({
  isOpen,
  onClose,
  onSuccess,
  isLoading,
  asset,
  numberOfShares,
}: ConfirmationPinModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [pin, setPin] = useState<string>("");

  const mutation = useMutation({
    mutationFn: directPurchaseService.initiaiteDirectPurchase,
    onSuccess: (data) => {
      console.log({ data });

      onSuccess();
    },
    onError: (error) => {
      setError(error.message);
      // console.log({ error });
    },
  });

  const handleSubmit = async () => {
    mutation.mutateAsync({
      asset_id: asset.id,
      number_of_shares: numberOfShares,
      pin,
    });
  };

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

        <InputOTP
          disabled={isLoading}
          maxLength={6}
          value={pin}
          onChange={(value) => {
            setError(null);
            setPin(value);

            if (value && value?.length === 6) {
              handleSubmit();
            }
          }}
          pattern={REGEXP_ONLY_DIGITS}
        >
          <InputOTPGroup className="gap-2 md:gap-4">
            {[...Array(6)]?.map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className={cn(
                  ` w-10 h-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-lg border`,
                  {
                    "bg-custom-light-bg border-custom-input-stroke text-custom-white":
                      !pin,
                  }
                )}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </DialogContent>
    </Dialog>
  );
}
