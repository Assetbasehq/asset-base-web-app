import ConnectWalletButton from "@/components/buttons/connect-wallet-button";
import GoogleLoginButton from "@/components/buttons/google-login-button";
import RiseLoginButton from "@/components/buttons/rise-login-button";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed, Loader, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import AssetBaseBeta from "@/components/shared/asset-base-beta";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { CustomAlert } from "@/components/custom/custom-alert";
import ButtonLoader from "@/components/custom/button-loader";
import { Label } from "@/components/ui/label";

interface FormValues {
  email_address: string;
  password: string;
}

export default function Login() {
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
    mutationFn: authService.signIn,
    onSuccess: () => {
      console.log("success");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log({ message: error.message });
      setError(error.message);
    },
  });

  const onSubmit = (data: FormValues) => {
    setError(null);
    loginMutation.mutateAsync(data);
  };

  return (
    <div className="w-full px-6 min-h-screen flex flex-col items-center justify-center gap-18 font-neue bg-gradient-to-tr from-white via-pink-50 to-pink-100 dark:from-black dark:via-black dark:to-black">
      <AssetBaseBeta />

      <Card className="w-full max-w-lg border text-black bg-white dark:bg-custom-card dark:text-white">
        <CardHeader className="text-start flex flex-col gap-1">
          <CardTitle className="text-lg">Login to your account</CardTitle>
          <CardDescription className="font-neue">
            Hey, you're back. Log in to continue investing in assets
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Social login buttons */}
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
                          className="w-full py-6 pl-10 pr-3 align-text-bottom"
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

              {/* Forgot password link */}
              <Link
                to="/auth/forgot-password"
                className="text-sm underline text-muted-foreground text-left"
              >
                Forgot password?
              </Link>

              <ButtonLoader
                isLoading={loginMutation.isPending}
                disabled={loginMutation.isPending || !form.formState.isValid}
                type="submit"
                className="w-full btn-primary py-6 font-semibold cursor-pointer"
                loadingText="Please wait..."
              >
                Login
              </ButtonLoader>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <p className="mt-4 text-muted-foreground">
            Don't have an AssetBase account?
            <Link
              to="/auth/register"
              className="text-custom-orange font-medium pl-1"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
