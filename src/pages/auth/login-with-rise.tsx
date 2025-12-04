import ConnectWalletButton from "@/components/buttons/connect-wallet-button";
import GoogleLoginButton from "@/components/buttons/google-login-button";
import RiseLoginButton from "@/components/buttons/rise-login-button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import AssetBaseBeta from "@/components/shared/asset-base-beta";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { CustomAlert } from "@/components/custom/custom-alert";
import ButtonLoader from "@/components/custom/button-loader";
import { Label } from "@/components/ui/label";
import { RiArrowLeftLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import riselogo from "@/assets/images/rise-r-logo.png";
import { Button } from "@/components/ui/button";

interface FormValues {
  email_address: string;
  password: string;
}

export default function LoginWithRise() {
  const [isPasswordVisible, setPasswordVisible] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      email_address: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: authService.loginWithRise,
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const onSubmit = (data: FormValues) => {
    setError(null);
    loginMutation.mutateAsync(data);
  };

  return (
    <div className="w-full px-6 min-h-screen flex flex-col items-center justify-center gap-18 font-geist bg-gradient-to-tr from-white via-pink-50 to-pink-100 dark:from-black dark:via-black dark:to-black">
      {/* <AssetBaseBeta /> */}

      <Card className="w-full max-w-lg border text-black bg-white dark:bg-custom-card dark:text-white font-neue">
        <CardHeader className="text-start flex flex-col gap-1">
          <div className="flex flex-col justify-center items-center w-full text-center col-span-2 relative">
            <Button
              variant={"ghost"}
              onClick={() => navigate(-1)}
              className="absolute left-0 top-0 cursor-pointer"
            >
              <RiArrowLeftLine />
            </Button>
            <img
              src={riselogo}
              alt="rise"
              className="w-12 h-12 bg-custom-card p-2 rounded-full"
            />
            <CardTitle className="text-xl font-medium">
              Login with Rise
            </CardTitle>
            <CardDescription className="font-neue">
              Login with your Rise account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <div className="flex flex-col gap-6">
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
                            className="w-full py-6 pl-10 pr-3 align-text-bottom"
                          />
                          {isPasswordVisible ? (
                            <RiEyeLine
                              size={22}
                              className="absolute right-3 cursor-pointer"
                              onClick={() =>
                                setPasswordVisible(!isPasswordVisible)
                              }
                            />
                          ) : (
                            <RiEyeOffLine
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
              </div>

              {/* Error Alert */}
              {error && <CustomAlert variant="destructive" message={error} />}

              <ButtonLoader
                isLoading={loginMutation.isPending}
                disabled={loginMutation.isPending || !form.formState.isValid}
                type="submit"
                className="w-full btn-rise py-6 mt-6 font-medium"
                loadingText="Please wait..."
              >
                Log In
              </ButtonLoader>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
