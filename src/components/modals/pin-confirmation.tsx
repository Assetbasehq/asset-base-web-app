import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { CustomAlert } from "@/components/custom/custom-alert";
import { Loader } from "lucide-react";

type PinConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (pin: string) => void;
  title?: string;
  description?: string;
  error?: string | null;
  btnText?: string;
  btnLoadingText?: string;
  isLoading?: boolean;
};

interface FormValues {
  pin: string;
}

export function PinConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Enter PIN",
  description = "Provide your 6-digit PIN to continue",
  error,
  btnText = "Confirm",
  btnLoadingText = "Please wait...",
  isLoading = false,
}: PinConfirmationModalProps) {
  const form = useForm<FormValues>({
    defaultValues: { pin: "" },
  });

  function handlePinSubmit(values: FormValues) {
    onConfirm(values.pin);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6 md:p-8 text-start">
        <DialogHeader className="text-start">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      value={field.value}
                      onChange={(val) => {
                        field.onChange(val);

                        // Auto-submit ONLY when 6 digits are filled
                        if (val.length === 6 && !isLoading) {
                          form.handleSubmit(handlePinSubmit)();
                        }
                      }}
                      maxLength={6}
                      disabled={isLoading}
                      pattern={REGEXP_ONLY_DIGITS}
                      className="flex justify-center"
                    >
                      <InputOTPGroup className=" flex justify-center items-center gap-2 md:gap-3">
                        {[...Array(6)].map((_, i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="w-10 h-10 sm:h-12 sm:w-12 rounded-lg border"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                </FormItem>
              )}
            />

            {error && <CustomAlert message={error} variant="destructive" />}

            <Button
              className="w-full py-5 rounded-full btn-primary"
              disabled={isLoading}
              onClick={() => form.handleSubmit(handlePinSubmit)()}
              type="button"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin" /> {btnLoadingText}
                </span>
              ) : (
                btnText
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
