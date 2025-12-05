import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { CustomAlert } from "@/components/custom/custom-alert";
import { useAuthStore } from "@/store/auth-store";
import ButtonLoader from "@/components/custom/button-loader";
import { walletService } from "@/api/wallet.api";

interface PinConfirmationModalProps {
  amount: number | null;
  src_currency: string;
  dest_currency: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PinConfirmationModal({
  amount,
  src_currency,
  dest_currency,
  isOpen,
  onClose,
  onSuccess,
}: PinConfirmationModalProps) {
  const { user } = useAuthStore();

  const [error, setError] = useState<string | null>(null);

  const form = useForm<{ credential: string }>({
    defaultValues: {
      credential: "",
    },
  });

  const credential = form.watch("credential");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: walletService.walletExchange,
    onSuccess: (data) => {
      console.log({ data });
      form.reset();
      onSuccess();
    },
    onError: (error) => {
      setError(error.message || "Something went wrong");
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
            Authorize Transaction
          </DialogTitle>
          <DialogDescription className="text-start">
            Please provide your security pin to authorize this transaction.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="flex flex-col w-full gap-6">
            {/* Enter PIN */}
            <FormField
              control={form.control}
              name="credential"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      onComplete={() => {
                        console.log({ verificationCode: field.value });

                        if (!credential) {
                          setError("Somehing went wrong");
                          return setTimeout(() => {
                            setError(null);
                          }, 2000);
                        }

                        if (!amount) {
                          setError("Somehing went wrong");
                          return setTimeout(() => {
                            setError(null);
                          }, 2000);
                        }

                        mutateAsync({
                          amount: amount,
                          src_currency,
                          dest_currency,
                          credential,
                        });
                      }}
                      disabled={isPending}
                      maxLength={6}
                      value={field.value}
                      onChange={(value) => {
                        setError(null);
                        field.onChange(value);
                      }}
                      pattern={REGEXP_ONLY_DIGITS}
                    >
                      <InputOTPGroup className="gap-2 md:gap-4">
                        {[...Array(6)].map((_, i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className=" w-10 h-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-lg border"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                </FormItem>
              )}
            />

            {error && <CustomAlert message={error} variant="destructive" />}

            {/* <ButtonLoader
              type="submit"
              disabled={isPending}
              isLoading={isPending}
              className="w-full btn-primary rounded-full py-5"
              loadingText="Please wait..."
            >
              Confirm
            </ButtonLoader> */}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
