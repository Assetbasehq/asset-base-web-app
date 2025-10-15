import { userService } from "@/api/user.api";
import { CustomAlert } from "@/components/custom/custom-alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

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
  otp: string[];
}

export default function UnauthorizedResetPasswordModal({
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

  const { mutateAsync, isPending } = useMutation({
    mutationFn: userService.authorizePasswordReset,

    onSuccess: (data) => {
      setToken(data?.token);
      onSuccess();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            A reset code has been sent to email. Provide the code read out to
            complete your password reset.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 w-full">
          <InputOTP
            onComplete={() => {
              if (!token) {
                setError("Somehing went wrong");
                return setTimeout(() => {
                  setError(null);
                }, 2000);
              }

              // mutateAsync({
              //   verification_code: verificationCode,
              //   token: token as string,
              // });
            }}
            disabled={isPending}
            maxLength={6}
          >
            {[...Array(6)].map((_, index) => (
              <InputOTPGroup key={index} className="w-full ">
                <InputOTPSlot
                  index={index}
                  className={cn(
                    `w-full p-2 sm:p-6 data-[active=true]:border-primary data-[active=true]:ring-primary data-[active=true]:ring-0.5`
                  )}
                />
              </InputOTPGroup>
            ))}
          </InputOTP>
        </div>

        {error && <CustomAlert message={error} variant="destructive" />}

        <small className="text-muted-foreground">
          This code is valid for 60 seconds
        </small>

        <DialogFooter>
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <p>
              Not received OTP?
              <Button
                variant="link"
                className="text-custom-orange cursor-pointer underline font-semibold px-0"
                onClick={() => resendOTP()}
                disabled={isSendingOTP}
              >
                {isSendingOTP ? "Resending OTP..." : "Resend OTP"}
              </Button>
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
