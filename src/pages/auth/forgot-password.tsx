import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { userService } from "@/api/user.api";
import { CustomAlert } from "@/components/custom/custom-alert";
import UnauthorizedResetPasswordModal from "./_components/reset-password-modal";
import UnauthorizedPasswordChangeModal from "./_components/password-change-modal";
import ButtonLoader from "@/components/custom/button-loader";

interface FormValues {
  email_address: string;
}

export default function ForgotPassword() {
  const [modals, setModals] = useState({
    resetPassword: false,
    changePassword: false,
    success: false,
  });
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>("");

  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      email_address: "",
    },
  });

  const toggleModal = (key: keyof typeof modals, value: boolean) =>
    setModals((prev) => ({ ...prev, [key]: value }));

  const forgotPasswordMutation = useMutation({
    mutationFn: userService.unauthorizedForgotPasswordRequest,
    onSuccess: (data) => {
      console.log({ data });
      setToken(data?.metadata?.token ?? "");
      toggleModal("resetPassword", true);
    },
    onError: (error) => {
      console.log({ error });
      setError(error.message);
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log({ data });

    forgotPasswordMutation.mutateAsync({ email_address: data.email_address });
  };

  return (
    <div className="w-full px-6 min-h-screen flex flex-col items-center justify-center gap-18 bg-custom-gradient">
      <Card className="w-full max-w-lg shadow-none font-neue">
        <CardHeader className="text-start flex flex-col gap-1">
          <CardTitle className="text-xl font-medium">Forgot Password</CardTitle>
          <CardDescription className="">
            Kindly provide your email address used during registration to
            receive instructions for password reset.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Email */}
              <FormField
                control={form.control}
                name="email_address"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/,
                    message: "Please enter a valid email address",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <Label>Email</Label>
                    <FormControl>
                      <div className="flex items-center relative">
                        <Mail
                          size={22}
                          className="text-muted-foreground absolute left-3"
                        />
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="johnmercy03@gmail.com"
                          className="w-full py-6 pl-10 pr-3"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-end" />
                  </FormItem>
                )}
              />

              {error && <CustomAlert variant="destructive" message={error} />}

              <ButtonLoader
                type="submit"
                className="btn-primary font-medium cursor-pointer py-6 my-4"
                loadingText="Please wait..."
                disabled={
                  forgotPasswordMutation.isPending || !form.formState.isValid
                }
              >
                Submit
              </ButtonLoader>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          {/* Optional footer links can go here */}
        </CardFooter>
      </Card>

      <UnauthorizedResetPasswordModal
        isOpen={modals.resetPassword}
        onClose={() => toggleModal("resetPassword", false)}
        token={token}
        onSuccess={() => {
          toggleModal("resetPassword", false);
          toggleModal("changePassword", true);
        }}
        setToken={setToken}
        isSendingOTP={forgotPasswordMutation.isPending}
        resendOTP={() =>
          forgotPasswordMutation.mutateAsync({
            email_address: form.getValues("email_address"),
          })
        }
      />

      <UnauthorizedPasswordChangeModal
        isOpen={modals.changePassword}
        onClose={() => toggleModal("changePassword", false)}
        onSuccess={() => toggleModal("success", true)}
        token={token}
      />
    </div>
  );
}
