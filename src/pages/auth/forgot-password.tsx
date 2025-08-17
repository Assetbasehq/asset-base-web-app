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
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import ResetPasswordModal from "./_components/reset-password-modal";
import { useState } from "react";

interface FormValues {
  email: string;
}

export default function ForgotPassword() {
  const [openModal, setOpenModal] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const closeModal = () => {
    setOpenModal(false);
  };

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className=" w-full px-6 min-h-screen flex flex-col items-center justify-center gap-18 font-neue bg-gradient-to-tr from-white via-white to-pink-100">
      <Card className="w-full max-w-lg shadow-none">
        <CardHeader className="text-start flex flex-col gap-1">
          <CardTitle className="text-lg text-bold">Forgot Password</CardTitle>
          <CardDescription className="font-neue">
            Kindly provide your email address used during registration to
            receive instructions for password reset.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="email" className="font-semibold">
                Email
              </Label>
              <div className="flex items-center relative">
                <Mail
                  size={22}
                  className="text-muted-foreground absolute left-3"
                />
                <Input
                  {...register("email", { required: true })}
                  id="email"
                  type="email"
                  placeholder="johnmercy03@gmail.com"
                  className="w-full py-6 pl-10 pr-3"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive text-right">
                  Email is required
                </p>
              )}
            </div>
            <Button className="bg-custom-black cursor-pointer hover:bg-custom-black py-6 my-4">
              Submit
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {/* <p className="mt-4 text-muted-foreground">
            I have an AssetBase account?
            <Link to="/login" className="text-primary font-semibold pl-1">
              Sign In
            </Link>
          </p> */}
        </CardFooter>
      </Card>

      <ResetPasswordModal isOpen={openModal} onClose={closeModal} />
    </div>
  );
}
