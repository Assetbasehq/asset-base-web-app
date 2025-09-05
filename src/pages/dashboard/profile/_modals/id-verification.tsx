import { verificationService } from "@/api/verification.api";
import ButtonLoader from "@/components/custom/button-loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface IDVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  setUserData: (data: any) => void;
  switchToManual: () => void;
  switchToDojah: () => void;
}

export default function IDVerification({
  isOpen,
  onClose,
  setUserData,
  switchToManual,
  switchToDojah,
}: IDVerificationProps) {
  const [dojahButtonClicked, setDojahButtonClicked] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: verificationService.initiateDojahVerification,
    onSuccess: (data) => {
      console.log({ data });

      setUserData(data);
      switchToDojah();

      setTimeout(() => {
        setDojahButtonClicked(false);
      }, 2000);
    },
    onError: (error) => {
      setDojahButtonClicked(false);
      console.log({ error });
    },
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-lg rounded-2xl p-6 md:p-8 text-start"
      >
        <DialogHeader className="flex flex-col items-start justify-start gap-0">
          <DialogTitle className="flex items-start gap-2 text-xl text-start">
            ID Verification
          </DialogTitle>
          <DialogDescription className="text-start">
            You will be redirected to a third party provider to verify your
            identity
          </DialogDescription>
        </DialogHeader>

        <ButtonLoader
          className="w-full btn-secondary rounded-full mt-2"
          loadingText="Redirecting..."
          isLoading={isPending || dojahButtonClicked}
          disabled={isPending || dojahButtonClicked}
          onClick={() => {
            setDojahButtonClicked(true);
            mutateAsync();
          }}
        >
          CLICK HERE TO PROCEED
        </ButtonLoader>

        <p>
          Having issues?
          <Button
            onClick={switchToManual}
            variant="link"
            type="button"
            className="text-custom-orange underline cursor-pointer px-1"
          >
            Verify manually
          </Button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
