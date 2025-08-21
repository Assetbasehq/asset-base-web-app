import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function PINSetup() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      country: "Nigeria",
      dateOfBirth: undefined,
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
  };

  return (
    <div className=" w-full min-h-screen flex flex-col items-center justify-center gap-18 font-neue bg-gradient-to-tr from-white via-white to-pink-100 dark:from-black dark:via-black dark:to-black">
      <Card className="w-full max-w-lg shadow-none text-black bg-white dark:bg-custom-card dark:text-white dark:border-custom-card">
        <CardHeader className="text-start flex flex-col gap-1">
          <CardTitle className="text-lg text-bold">
            Setup your treansaction PIN
          </CardTitle>
          <CardDescription className="font-neue">
            This PIN will be used for all transactions and withdrawals
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-6"
            >
              <Button
                type="submit"
                onClick={() => navigate("/dashboard")}
                className="w-full font-semibold py-6 border-2 cursor-pointer btn-secondary"
              >
                Create PIN
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
