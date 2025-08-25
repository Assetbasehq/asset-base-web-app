import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
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

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  token?: string | null;
  resendOTP: () => void;
  isSendingOTP: boolean;
  setToken: (token: string) => void;
}

interface FormValues {
  token: string;
  verification_code: string;
}

export default function ChangePinRequestModal({
  isOpen,
  onClose,
  onSuccess,
  token,
  resendOTP,
  isSendingOTP,
  setToken,
}: PasswordResetModalProps) {
  const { user } = useAuthStore();

  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      token: token || "",
      verification_code: "",
    },
  });

  const verificationCode = form.watch("verification_code");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: userService.authorizePinChange,
    onSuccess: (data) => {
      console.log({ newToken: data?.token });
      setToken(data?.token);
      onSuccess();
    },
    onError: (error) => {
      console.log({ error });
      setError(error.message);
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
            Confirm your email address
          </DialogTitle>
          <DialogDescription className="text-start">
            We just emailed a one time password to {user?.email_address} Please
            provide the code
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="flex flex-col w-full gap-6">
            {/* Enter PIN */}
            <FormField
              control={form.control}
              name="verification_code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      onComplete={() => {
                        console.log({ verificationCode, token });

                        if (!token) {
                          setError("Somehing went wrong");
                          return setTimeout(() => {
                            setError(null);
                          }, 2000);
                        }

                        mutateAsync({
                          verification_code: verificationCode,
                          token: token as string,
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

            <p>
              Not received the OTP?
              <Button
                variant="link"
                type="button"
                disabled={isSendingOTP}
                onClick={() => resendOTP()}
                className="text-custom-orange underline cursor-pointer px-1"
              >
                {isSendingOTP ? "Sending..." : "Resend"}
              </Button>
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
