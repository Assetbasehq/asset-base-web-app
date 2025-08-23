import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { userService } from "@/api/user.api";
import { PinSuccessDialog } from "@/components/shared/_modals/pin-setup-success";
import { useState } from "react";
import { CustomAlert } from "@/components/custom/custom-alert";

type FormValues = {
  pin: string;
  confirmPin: string;
};

export default function PINSetup() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    defaultValues: {
      pin: "",
      confirmPin: "",
    },
  });

  const createPinMutation = useMutation({
    mutationFn: userService.createSecurityPin,
    onSuccess: () => {
      setShowSuccessDialog(true);
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const onSubmit = (data: FormValues) => {
    const { pin } = data;
    createPinMutation.mutate({ pin });
  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    navigate("/dashboard");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center font-neue bg-gradient-to-tr from-white via-white to-pink-100 dark:from-black dark:via-black dark:to-black">
      <Card className="w-full max-w-lg shadow-none text-black bg-white dark:bg-custom-card dark:text-white dark:border-custom-card">
        <CardHeader className="text-start flex flex-col gap-1">
          <CardTitle className="text-lg font-bold">
            Setup your transaction PIN
          </CardTitle>
          <CardDescription>
            This PIN will be used for all transactions and withdrawals.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-6"
            >
              {/* Enter PIN */}
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                        pattern={REGEXP_ONLY_DIGITS}
                      >
                        <InputOTPGroup className="gap-2 md:gap-4">
                          {[...Array(6)].map((_, i) => (
                            <InputOTPSlot
                              key={i}
                              index={i}
                              className=" w-12 h-12 md:h-14 md:w-14 rounded-lg border"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Confirm PIN */}
              <FormField
                control={form.control}
                name="confirmPin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                        pattern={REGEXP_ONLY_DIGITS}
                      >
                        <InputOTPGroup className=" gap-2 md:gap-4">
                          {[...Array(6)].map((_, i) => (
                            <InputOTPSlot
                              key={i}
                              index={i}
                              className=" w-12 h-12 md:h-14 md:w-14 rounded-lg border"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </FormItem>
                )}
              />

              {error && <CustomAlert message={error} variant="destructive" />}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={createPinMutation.isPending}
                className="w-full font-semibold py-6 border-2 cursor-pointer btn-secondary"
              >
                {createPinMutation.isPending ? "Creating..." : "Create PIN"}
              </Button>
            </form>
          </Form>

          <PinSuccessDialog
            open={showSuccessDialog}
            onClose={handleSuccessDialogClose}
          />
        </CardContent>
      </Card>
    </div>
  );
}
