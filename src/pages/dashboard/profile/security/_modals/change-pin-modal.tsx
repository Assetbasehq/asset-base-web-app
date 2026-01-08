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
import { userService } from "@/api/user.api";
import { useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { CustomAlert } from "@/components/custom/custom-alert";
import { useAuthStore } from "@/store/auth-store";
import ButtonLoader from "@/components/custom/button-loader";

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  token?: string | null;
}

interface FormValues {
  token: string;
  pin: string;
}

export default function ChangePinModal({
  isOpen,
  onClose,
  onSuccess,
  token,
}: PasswordResetModalProps) {
  const { user } = useAuthStore();

  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      token: token || "",
      pin: "",
    },
  });

  const pin = form.watch("pin");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: userService.changePin,
    onSuccess: () => {
      onSuccess();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

 const handleSubmit = async () => {
  setError(null);

  const pin = form.getValues("pin");

  if (!pin || pin.length !== 6) {
    setError("PIN must be 6 digits.");
    return;
  }

  if (!token) {
    setError("Invalid or missing token.");
    return;
  }

  await mutateAsync({
    token,
    pin,
  });
};


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
            Please provide a new 6-digit PIN code
          </DialogTitle>
          <DialogDescription className="text-start">
            This PIN will be used to authorize transactions on your account.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="flex flex-col w-full gap-6">
            {/* Enter PIN */}
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      //   onComplete={() => {
                      //     console.log({ verificationCode, token });

                      //     if (!token) {
                      //       setError("Somehing went wrong");
                      //       return setTimeout(() => {
                      //         setError(null);
                      //       }, 2000);
                      //     }

                      //     mutateAsync({
                      //       verification_code: verificationCode,
                      //       token: token as string,
                      //     });
                      //   }}
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

            <ButtonLoader
              type="button"
              disabled={isPending || pin.length !== 6}
              isLoading={isPending}
              className="w-full rounded-full py-5 btn-primary "
              loadingText="Please wait..."
              onClick={handleSubmit}
            >
              Confirm
            </ButtonLoader>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
