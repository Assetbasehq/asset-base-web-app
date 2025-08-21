import ConnectWalletButton from "@/components/custom/connect-wallet-button";
import GoogleLoginButton from "@/components/custom/google-login-button";
import RiseLoginButton from "@/components/custom/rise-login-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed, Loader2, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import AssetBaseBeta from "@/components/shared/asset-base-beta";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";

interface FormValues {
  email_address: string;
  password: string;
}

export default function Login() {
  const [isPasswordVisible, setPasswordVisible] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: () => {
      console.log("success");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    loginMutation.mutateAsync(data);
  };

  return (
    <div className=" w-full px-6 min-h-screen flex flex-col items-center justify-center gap-18 font-neue bg-gradient-to-tr from-white via-pink-50 to-pink-100 dark:from-black dark:via-black dark:to-black">
      {/* <div className=" w-full min-h-screen flex flex-col items-center justify-center gap-18 font-neue [background:linear-gradient(to_top_right,_white_0%,_white_60%,_#f9c5d1_100%)]"> */}
      <AssetBaseBeta />

      <Card className="w-full max-w-lg border text-black bg-white dark:bg-custom-card dark:text-white">
        <CardHeader className="text-start flex flex-col gap-1">
          <CardTitle className="text-lg">Login to your account</CardTitle>
          <CardDescription className="font-neue">
            Hey, you're back. Log in to continue investing in assets
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            <RiseLoginButton />
            <ConnectWalletButton />
            <GoogleLoginButton />
          </div>

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-6">
            <span className="bg-background dark:bg-custom-card text-muted-foreground relative z-10 px-2 text-xs">
              OR
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="">
                  Email
                </Label>
                <div className="flex items-center relative">
                  <Mail
                    size={22}
                    className="text-muted-foreground absolute left-3"
                  />
                  <Input
                    {...register("email_address", { required: true })}
                    id="email"
                    type="email"
                    placeholder="johnmercy03@gmail.com"
                    className="w-full py-6 pl-10 pr-3 "
                  />
                </div>
                {errors.email_address && (
                  <p className="text-sm text-destructive text-right">
                    Email is required
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="">
                  Password
                </Label>
                <div className="flex items-center relative">
                  <LockKeyhole className="text-muted-foreground absolute left-3" />
                  <Input
                    {...register("password", { required: true })}
                    id="password"
                    type={isPasswordVisible ? "password" : "text"}
                    placeholder="**********"
                    className="w-full py-6 pl-10 pr-3 align-text-bottom"
                  />
                  {isPasswordVisible ? (
                    <Eye
                      size={22}
                      className="absolute right-3 cursor-pointer"
                      onClick={() => setPasswordVisible(!isPasswordVisible)}
                    />
                  ) : (
                    <EyeClosed
                      size={22}
                      className="absolute right-3 cursor-pointer"
                      onClick={() => setPasswordVisible(!isPasswordVisible)}
                    />
                  )}
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive text-right">
                    Password is required
                  </p>
                )}
                <Link
                  to="/auth/forgot-password"
                  className="text-sm underline text-muted-foreground text-left"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full btn-primary py-6 font-semibold"
              >
                {loginMutation.isPending ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
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
