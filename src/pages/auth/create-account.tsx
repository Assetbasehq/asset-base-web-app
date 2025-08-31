import ConnectWalletButton from "@/components/buttons/connect-wallet-button";
import GoogleLoginButton from "@/components/buttons/google-login-button";
import RiseLoginButton from "@/components/buttons/rise-login-button";
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
import { Eye, EyeClosed, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import AssetBaseBeta from "@/components/shared/asset-base-beta";
import { useOnboardingStore } from "@/store/onboarding-store";
import { CustomAlert } from "@/components/custom/custom-alert";
import { useMutation } from "@tanstack/react-query";
import { userService } from "@/api/user.api";
import { Label } from "@/components/ui/label";
import ButtonLoader from "@/components/custom/button-loader";

interface FormValues {
  email_address: string;
  password: string;
}

export default function CreateAccount() {
  const [isPasswordVisible, setPasswordVisible] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setOnboardingData } = useOnboardingStore();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      email_address: "",
      password: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: userService.checkIfUserExists,
    onSuccess: (data, variables) => {
      setOnboardingData({ step1: variables });
      navigate("/onboarding/account-type");
    },
    onError: (error) => {
      console.log({ error });
      setError(error.message);
    },
  });

  const onSubmit = (data: FormValues) => {
    setError(null);
    registerMutation.mutateAsync(data);
  };

  return (
    <div className="w-full min-h-screen px-6 flex flex-col items-center justify-center gap-18 bg-custom-gradient">
      <AssetBaseBeta />

      <Card className="font-neue w-full max-w-lg border">
        <CardHeader className="text-start">
          <CardTitle className="text-lg">Create an account</CardTitle>
          <CardDescription>
            Get started to build your asset portfolio across various asset
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Social Login Buttons */}
          <div className="flex flex-col gap-4">
            <RiseLoginButton />
            <ConnectWalletButton />
            <GoogleLoginButton />
          </div>

          {/* Divider */}
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-6">
            <span className="bg-background dark:bg-custom-card text-muted-foreground relative z-10 px-2 text-xs">
              OR
            </span>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
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

              {/* Password */}
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
                    <Label>Password</Label>
                    <FormControl>
                      <div className="flex items-center relative">
                        <LockKeyhole className="text-muted-foreground absolute left-3" />
                        <Input
                          {...field}
                          type={isPasswordVisible ? "password" : "text"}
                          placeholder="**********"
                          className="w-full py-6 pl-10 pr-3"
                        />
                        {isPasswordVisible ? (
                          <Eye
                            size={22}
                            className="absolute right-3 cursor-pointer"
                            onClick={() =>
                              setPasswordVisible(!isPasswordVisible)
                            }
                          />
                        ) : (
                          <EyeClosed
                            size={22}
                            className="absolute right-3 cursor-pointer"
                            onClick={() =>
                              setPasswordVisible(!isPasswordVisible)
                            }
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-end" />
                  </FormItem>
                )}
              />

              {/* Error Alert */}
              {error && <CustomAlert variant="destructive" message={error} />}

              <ButtonLoader
                disabled={registerMutation.isPending || !form.formState.isValid}
                isLoading={registerMutation.isPending}
                className="w-full btn-primary py-6 font-normal border-2"
                loadingText="Please wait..."
              >
                Continue
              </ButtonLoader>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <p className="mt-4 text-muted-foreground">
            I have an AssetBase account?
            <Link
              to="/login"
              className="text-custom-orange font-semibold pl-1"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
