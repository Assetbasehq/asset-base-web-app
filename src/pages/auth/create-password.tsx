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
import { Eye, EyeClosed, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

export default function CreatePassword() {
  const [isPasswordVisible, setPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!isConfirmPasswordVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className=" w-full min-h-screen flex flex-col items-center justify-center gap-18 font-neue bg-gradient-to-tr from-white via-white to-pink-100">
      <Card className="w-full max-w-lg shadow-none">
        <CardHeader className="text-start flex flex-col gap-1">
          <CardTitle className="text-lg">Create New Password</CardTitle>
          <CardDescription className="font-neue">
            Kindly provide your email address used during registration to
            receive instructions for password reset.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-1">
                <Label htmlFor="newPassword" className="text-xs font-semibold">
                  New Password
                </Label>
                <div className="flex items-center relative">
                  <LockKeyhole className="text-muted-foreground absolute left-3" />
                  <Input
                    {...register("newPassword", { required: true })}
                    id="newPassword"
                    type={isPasswordVisible ? "password" : "text"}
                    placeholder="**********"
                    className="w-full py-6 pl-10 pr-3 align-text-bottom"
                  />
                  {isPasswordVisible ? (
                    <Eye
                      size={22}
                      className="absolute right-3 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <EyeClosed
                      size={22}
                      className="absolute right-3 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
                {errors.newPassword && (
                  <p className="text-sm text-destructive text-right">
                    New password is required
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                <Label
                  htmlFor="confirmPassword"
                  className=" text-xs font-semibold"
                >
                  Confirm Password
                </Label>
                <div className="flex items-center relative">
                  <LockKeyhole className="text-muted-foreground absolute left-3" />
                  <Input
                    {...register("confirmPassword", { required: true })}
                    id="confirmPassword"
                    type={isConfirmPasswordVisible ? "password" : "text"}
                    placeholder="**********"
                    className="w-full py-6 pl-10 pr-3 align-text-bottom"
                  />
                  {isConfirmPasswordVisible ? (
                    <Eye
                      size={22}
                      className="absolute right-3 cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  ) : (
                    <EyeClosed
                      size={22}
                      className="absolute right-3 cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive text-right">
                    Confirm password is required
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-black py-6 font-normal border-2"
              >
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <p className="mt-4 text-muted-foreground">
            Don't have an AssetBase account?
            <Link
              to="/auth/register"
              className="text-primary font-semibold pl-1"
            >
              Create Account
            </Link>
          </p>
          <p className="mt-4 text-muted-foreground">
            got to key
            <Link
              to="/onboarding/personal-details"
              className="text-primary font-semibold pl-1"
            >
              KYC
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
