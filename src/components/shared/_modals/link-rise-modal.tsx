import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { Label } from "@/components/ui/label";
import { LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { CustomAlert } from "@/components/custom/custom-alert";

interface FormValues {
  email_address: string;
  password: string;
}

interface LinkRiseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LinkRiseModal({ open, onOpenChange }: LinkRiseModalProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      email_address: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: authService.loginWithRise,
    onSuccess: () => {
      onOpenChange(false);
    },
    onError: (error) => {
      setError(error.message);
      console.log({ error });
    },
  });

  const onSubmit = (values: FormValues) => {
    setError(null);
    console.log(values);

    mutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Link Rise Account
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="email_address"
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <FormItem>
                  <Label>Username</Label>
                  <FormControl>
                    <div className="flex items-center relative">
                      <Mail
                        size={22}
                        className="text-muted-foreground absolute left-3"
                      />
                      <Input
                        {...field}
                        type="email"
                        placeholder="johnmercy03@gmail.com"
                        className="w-full py-6 pl-10 pr-3"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              rules={{
                required: { value: true, message: "Password is required" },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <Label>Password</Label>
                  <FormControl>
                    <div className="flex items-center relative">
                      <LockKeyhole className="text-muted-foreground absolute left-3" />
                      <Input
                        {...field}
                        type={isPasswordVisible ? "password" : "text"}
                        placeholder="**********"
                        className="w-full py-6 pl-10 pr-3 align-text-bottom"
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <CustomAlert variant="destructive" message={error} />}

            <Button
              type="submit"
              className="w-full py-5 btn-primary rounded-full mt-6"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Linking..." : "Link Account"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
