import { userService } from "@/api/user.api";
import { CustomAlert } from "@/components/custom/custom-alert";
import SuccessModal from "@/components/modals/success-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";

export default function DeleteAccountPassword({ onBack, formData }: any) {
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const queryClient = useQueryClient();
  const naviagate = useNavigate();

  const form = useForm({
    defaultValues: {
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: userService.deleteUserAccount,
    onSuccess: () => {
      setShowSuccess(true);
    },
    onError: (error) => {
      console.log("Error deleting account");
      setError(error.message);
    },
  });

  const onSubmit = async (values: any) => {
    const payload = {
      ...formData,
      password: values.password,
    };

    console.log({ payload });
    mutation.mutateAsync(payload);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex flex-row gap-2 px-0 cursor-pointer"
          >
            ← <span className="text-lg">Enter your password</span>
          </Button>

          <div>
            <p className="text-sm text-muted-foreground">
              Please enter your password to close your account.
            </p>
          </div>

          <FormField
            control={form.control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Password too short" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-5 pr-12 border rounded-md"
                      placeholder="Enter your password"
                      {...field}
                    />

                    {/* Eye Icon Button */}
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <CustomAlert variant="error" message={error} />}

          <Button
            type="submit"
            className="btn-primary rounded-full py-5 w-full"
            disabled={mutation.isPending}
          >
            Delete My Account
          </Button>
        </form>
      </Form>

      <SuccessModal
        isOpen={showSuccess}
        title="Account Deleted"
        description="Your Assetbase account has been successfully deleted."
        buttonText="Close"
        onClose={() => {
          setShowSuccess(false);
          queryClient.invalidateQueries({ queryKey: ["auth-user"] });
          naviagate("/login");
        }}
      />
    </div>
  );
}
