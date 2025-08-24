import { verificationService } from "@/api/verification.api";
import { Button } from "@/components/ui/button";
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
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "lucide-react";
import ButtonLoader from "@/components/custom/button-loader";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { countryCodes } from "@/constants/countries";
import { CustomAlert } from "@/components/custom/custom-alert";
import { useState } from "react";
import { identification_types } from "@/constants/identification-types";
import { Input } from "@/components/ui/input";
import { userService } from "@/api/user.api";

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  token?: string | null;
  OnSuccess: () => void;
}

interface FormValues {
  password: string;
  confirm_password: string;
}

export default function PasswordChangeModal({
  isOpen,
  onClose,
  token,
  OnSuccess,
}: PasswordChangeModalProps) {
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
      OnSuccess();
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

    console.log({ data, token });

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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="py-6  capitalize"
                      placeholder="**************"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="py-6  capitalize"
                      placeholder="**************"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {error && <CustomAlert variant="destructive" message={error} />}

            <ButtonLoader
              disabled={isPending}
              type="submit"
              className="w-full btn-secondary rounded-full mt-2 py-6"
            >
              RESET PASSWORD
            </ButtonLoader>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
