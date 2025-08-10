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
import { useForm } from "react-hook-form";
import { Link } from "react-router";

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  otp: string[];
}

export default function ResetPasswordModal({
  isOpen,
  onClose,
}: PasswordResetModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              A reset code has been sent to email. Provide the code read out to
              complete your password reset.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 w-full">
            <InputOTP maxLength={6}>
              {[...Array(6)].map((_, index) => (
                <InputOTPGroup key={index} className="w-full ">
                  <InputOTPSlot
                    index={index}
                    className={cn(
                      `w-full p-2 sm:p-6 data-[active=true]:border-primary data-[active=true]:ring-primary data-[active=true]:ring-0.5`,
                      {
                        "border-primary": !!errors.otp?.[index],
                      }
                    )}
                    {...register(`otp.${index}`, { required: true })}
                  />
                </InputOTPGroup>
              ))}
            </InputOTP>
            {errors.otp && (
              <p className="text-sm text-destructive">
                All fields are required
              </p>
            )}
          </div>

          <div className="">
            <small className="text-muted-foreground">
              This code is valid for 60 seconds
            </small>
          </div>

          <DialogFooter>
            <div className="flex flex-col items-center gap-4 w-full">
              <Button type="submit" className="w-full py-5 bg-black">
                Submit
              </Button>

              <p>
                Not received OTP?{" "}
                <Link
                  className="text-primary underline font-semibold"
                  to="/auth/create-password"
                >
                  Resend OTP
                </Link>
              </p>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
