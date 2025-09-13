import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/auth-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userService } from "@/api/user.api";
import { useEffect, useState } from "react";
import { CustomAlert } from "@/components/custom/custom-alert";
export default function NextOfKin() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { user } = useAuthStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["next-of-kin", user?.id],
    queryFn: () => userService.getUserNextOfKin(user?.id as string),
    enabled: !!user?.id,
  });

  const nextOfKinInformation = useForm({
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email_address: "",
      phone_number: "",
      relationship: "",
    },
  });

  useEffect(() => {
    if (data) {
      nextOfKinInformation.reset({
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
        email_address: data?.email_address || "",
        phone_number: data?.phone_number || "",
        relationship: data?.relationship || "",
      });
    }
  }, [data, nextOfKinInformation.reset]);

  const nextOfKinMutation = useMutation({
    mutationFn: (data: any) =>
      userService.updateUserNextOfKin(user?.id as string, data),
    onSuccess: (updatedData) => {
      console.log({ updatedData });
      setError(null);
      setSuccess(`Next of kin updated successfully`);
      setTimeout(() => setSuccess(null), 3000);

      nextOfKinInformation.reset(updatedData);
    },
    onError: (error) => {
      console.log({ error });
      setError(error.message);
      setSuccess(null);
    },
  });

  const onSubmit = (data: any) => {
    setError(null);
    setSuccess(null);
    console.log({ data });
    nextOfKinMutation.mutateAsync(data);
  };

  const btnText = nextOfKinMutation.isPending ? (
    <span className="flex items-center">
      <Loader className="mr-2 h-4 w-4 animate-spin" />
      Saving...
    </span>
  ) : (
    "Save Changes"
  );

  return (
    <div>
      <Form {...nextOfKinInformation}>
        <form onSubmit={nextOfKinInformation.handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col items-start lg:w-2/5">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                Next Of Kin Information{" "}
                <small className="text-custom-orange bg-custom-orange/10 px-3 py-1 rounded-full">
                  Optional
                </small>
              </h2>
              <p className="text-muted-foreground">
                Update your personal details here
              </p>
              <Button
                type="submit"
                disabled={
                  !nextOfKinInformation.formState.isValid ||
                  !nextOfKinInformation.formState.isDirty ||
                  nextOfKinMutation.isPending
                }
                className="mt-4 text-muted-foreground bg-custom-input-mute cursor-pointer hidden lg:block"
              >
                {btnText}
              </Button>

              {error && (
                <CustomAlert
                  variant="destructive"
                  message={error}
                  className="w-fit"
                />
              )}

              {success && (
                <CustomAlert
                  variant="success"
                  message={success}
                  className="w-fit"
                />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:w-3/5">
              <FormField
                control={nextOfKinInformation.control}
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="py-6"
                        placeholder="Johndoe@gmail.com"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={nextOfKinInformation.control}
                rules={{ required: true }}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 capitalize"
                        placeholder="John"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={nextOfKinInformation.control}
                rules={{ required: true }}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 capitalize"
                        placeholder="Doe"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={nextOfKinInformation.control}
                rules={{ required: true }}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6"
                        placeholder="+2345678901"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={nextOfKinInformation.control}
                rules={{ required: true }}
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6"
                        placeholder="Brother"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-start">
            <Button
              type="submit"
              disabled={
                !nextOfKinInformation.formState.isValid ||
                !nextOfKinInformation.formState.isDirty ||
                nextOfKinMutation.isPending
              }
              className="mt-4 text-muted-foreground bg-custom-input-mute cursor-pointer lg:hidden"
            >
              {btnText}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
