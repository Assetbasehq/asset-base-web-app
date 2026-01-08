import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import ButtonLoader from "@/components/custom/button-loader";
import { Label } from "@/components/ui/label";
import { CustomAlert } from "@/components/custom/custom-alert";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { userService } from "@/api/user.api";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  token?: string | null;
  onSuccess: () => void;
}

interface FormValues {
  password: string;
  confirm_password: string;
}

export default function PasswordChangeModal({
  isOpen,
  onClose,
  token,
  onSuccess,
}: PasswordChangeModalProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: userService.changePassword,
    onSuccess: (data) => {
      console.log({ data });
      onSuccess();
    },
    onError: (error) => {
      console.log({ error });
      setError(error.message);
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!token) {
      setError("Something went wrong");
      return setTimeout(() => {
        setError(null);
      }, 2000);
    }

    mutateAsync({ password: data.password, token });
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
            Change Password
          </DialogTitle>
          <DialogDescription className="text-start">
            Enter your new password to proceed
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-6 text-start"
          >
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <Label>New Password</Label>
                  <FormControl>
                    <div className="flex items-center relative">
                      <Input
                        type={isPasswordVisible ? "password" : "text"}
                        className="py-6  capitalize"
                        placeholder="**************"
                        {...field}
                      />
                      {isPasswordVisible ? (
                        <RiEyeLine
                          size={22}
                          className="absolute right-3 cursor-pointer"
                          onClick={() => setPasswordVisible(!isPasswordVisible)}
                        />
                      ) : (
                        <RiEyeOffLine
                          size={22}
                          className="absolute right-3 cursor-pointer"
                          onClick={() => setPasswordVisible(!isPasswordVisible)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-end" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <Label>Confirm New Password</Label>
                  <FormControl>
                    <div className="flex items-center relative">
                      <Input
                        type={isConfirmPasswordVisible ? "password" : "text"}
                        className="py-6  capitalize"
                        placeholder="**************"
                        {...field}
                      />
                      {isConfirmPasswordVisible ? (
                        <RiEyeLine
                          size={22}
                          className="absolute right-3 cursor-pointer"
                          onClick={() =>
                            setConfirmPasswordVisible(!isConfirmPasswordVisible)
                          }
                        />
                      ) : (
                        <RiEyeOffLine
                          size={22}
                          className="absolute right-3 cursor-pointer"
                          onClick={() =>
                            setConfirmPasswordVisible(!isConfirmPasswordVisible)
                          }
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-end" />
                </FormItem>
              )}
            />

            {error && <CustomAlert variant="destructive" message={error} />}

            <ButtonLoader
              disabled={isPending}
              isLoading={isPending}
              type="submit"
              className="w-full btn-secondary rounded-full mt-2 py-6"
              loadingText="Please wait..."
            >
              RESET PASSWORD
            </ButtonLoader>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
