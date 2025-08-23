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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed, Loader, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import AssetBaseBeta from "@/components/shared/asset-base-beta";
import { useOnboardingStore } from "@/store/onboarding-store";
import { CustomAlert } from "@/components/custom/custom-alert";
import { useMutation } from "@tanstack/react-query";
import { userService } from "@/api/user.api";

interface FormValues {
  email_address: string;
  password: string;
}

export default function CreateAccount() {
  const [isPasswordVisible, setPasswordVisible] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setOnboardingData } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();

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

  const onSubmit = async (data: FormValues) => {
    setError(null);
    registerMutation.mutateAsync(data);
  };

  const btnText = registerMutation.isPending ? (
    <span className="flex items-center">
      <Loader className="mr-2 h-4 w-4 animate-spin" />
      Please wait...
    </span>
  ) : (
    "Continue"
  );

  return (
    <div className="w-full min-h-screen px-6 flex flex-col items-center justify-center gap-18 bg-custom-gradient">
      <AssetBaseBeta />

      <Card className=" font-neue w-full max-w-lg border ">
        <CardHeader className="text-start">
          <CardTitle className="text-lg">Create an account</CardTitle>
          <CardDescription className="">
            Get started to build your asset portfolio across various asset
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
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
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
                    {errors.password.message}
                  </p>
                )}
              </div>
              {error && <CustomAlert variant="destructive" message={error} />}
              <Button
                disabled={registerMutation.isPending}
                type="submit"
                className="w-full btn-primary py-6 font-normal border-2"
              >
                {btnText}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <p className="mt-4 text-muted-foreground">
            I have an AssetBase account?
            <Link to="/auth/login" className="text-primary font-semibold pl-1">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
