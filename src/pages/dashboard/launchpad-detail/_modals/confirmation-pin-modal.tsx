import { directPurchaseService } from "@/api/direct-purchase";
import { CustomAlert } from "@/components/custom/custom-alert";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";

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

    useEffect(() => {
      if (pin && pin.length === 6) {
        handleSubmit();
      }
    }, [pin]);

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
    console.log({ pin });

    mutation.mutateAsync({
      asset_id: asset.id,
      number_of_shares: numberOfShares,
      pin,
    });
  };

  async function test() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer 2e4f43aaeb0c260570a67ae32ae904ad65258d0715002ef67938f6d44693c794"
      );

      const raw = JSON.stringify({
        asset_id: "9bd3c2a5-241b-4262-b279-3367b8e3cc7a",
        number_of_shares: 1,
        pin: "123456",
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        // redirect: "follow",
      };

      const response = await fetch(
        "https://xapi.assetbase.capital/api/v1/direct-purchases",
        requestOptions
      );

      const data = await response.json();
      console.log(data, "direct purchase");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md bg-custom-card text-custom-white rounded-2xl font-geist"
      >
        <DialogHeader className="text-start flex- gap-0">
          <DialogTitle className="text-lg font-bold">Confirm Pin</DialogTitle>
          <DialogDescription className="text-custom-grey">
            Enter your 6 digit pin
          </DialogDescription>
        </DialogHeader>

        <InputOTP
          disabled={isLoading}
          maxLength={6}
          value={pin}
          onChange={(value) => {
            setError(null);
            setPin(value);

            console.log({ value });
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

        {error && <CustomAlert variant="error" message={error} />}

        {mutation.isPending ? (
          <div>
            <p>Verifying...</p>
          </div>
        ) : null}

        <Button onClick={() => test()}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
}
