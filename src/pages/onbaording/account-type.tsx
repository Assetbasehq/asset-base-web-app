import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";

export default function AccountType() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ accountType: string }>();

  const onSubmit = async (data: { accountType: string }) => {
    console.log(data);
  };

  return (
    <div className=" w-full min-h-screen flex flex-col items-center justify-center gap-18 font-neue bg-gradient-to-tr from-white via-white to-pink-100">
      <Card className="w-full max-w-lg shadow-none">
        <CardHeader className="text-start">
          <CardTitle className="text-lg">Create an account</CardTitle>
          <CardDescription className="font-neue">
            Get started to build your asset portfolio across various asset
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-6">
            <span className="bg-background text-muted-foreground relative z-10 px-2 text-xs">
              OR
            </span>
          </div>

         
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
    </div>
  );
}
