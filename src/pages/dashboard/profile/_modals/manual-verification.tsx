import { verificationService } from "@/api/verification.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "lucide-react";
import ButtonLoader from "@/components/custom/button-loader";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { countryCodes } from "@/constants/countries";
import { CustomAlert } from "@/components/custom/custom-alert";
import { useState } from "react";
import { identification_types } from "@/constants/identification-types";
import { Input } from "@/components/ui/input";

interface ManualVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormValues {
  country: string;
  identification_type: string;
  identification_number: string;
}

export default function ManualVerification({
  isOpen,
  onClose,
  onSuccess,
}: ManualVerificationProps) {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      country: "",
      identification_type: "",
      identification_number: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: verificationService.initiateSystemVerification,
    onSuccess: (data) => {
      console.log({ data });
      onSuccess();
    },
    onError: (error) => {
      console.log({ error });
      setError(error.message);

      setTimeout(() => {
        setError(null);
      }, 2000);
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log({ data });

    const payload = {
      request_type: "identity",
      provider: "system",
      user_data: {
        id_type: "",
        id_number: "",
      },
    };

    mutateAsync(payload);
  };

  if (!isOpen) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-lg rounded-2xl p-6 md:p-8 text-start"
      >
        <DialogHeader className="flex flex-col items-start justify-start gap-0">
          <DialogTitle className="flex items-start gap-2 text-xl text-start">
            Manual Verification
          </DialogTitle>
          <DialogDescription className="text-start">
            Provide the details required to compete your verification
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-6 text-start"
          >
            {/* Country */}
            <FormField
              control={form.control}
              name="country"
              rules={{ required: "Country is required" }}
              render={({ field }) => {
                const error = form.formState.errors.country;

                return (
                  <FormItem>
                    <Label>Country Of Residence</Label>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue="nigeria"
                      >
                        <SelectTrigger
                          className={cn(
                            "w-full py-6 pr-3 align-text-bottom cursor-pointer capitalize",
                            error && "border-red-500 text-red-500"
                          )}
                        >
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectContent className="max-h-[300px]">
                            {countryCodes.map((country) => (
                              <SelectItem
                                key={country.name}
                                value={country.name}
                                className="capitalize"
                              >
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* Identification Type */}
            <FormField
              control={form.control}
              name="identification_type"
              rules={{
                required: "Identification Type is required",
              }}
              render={({ field }) => {
                const error = form.formState.errors.country;
                return (
                  <FormItem>
                    <Label>Identification Type</Label>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={cn(
                            "w-full py-6 pr-3 align-text-bottom cursor-pointer",
                            error && "border-red-500 text-red-500"
                          )}
                        >
                          <SelectValue placeholder="Select Identification Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectContent className="max-h-[300px]">
                            {identification_types.map((identification_type) => (
                              <SelectItem
                                key={identification_type.shortCode}
                                value={identification_type.shortCode.toLowerCase()}
                                className="capitalize"
                              >
                                {identification_type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              rules={{
                required: "Identification Number is required",
                minLength: {
                  value: 11,
                  message: "Identification Number must be at least 11 digits",
                },
                maxLength: {
                  value: 11,
                  message: "Identification Number must be at most 11 digits",
                },
              }}
              name="identification_number"
              render={({ field }) => (
                <FormItem>
                  <Label>Idenification Number</Label>
                  <FormControl>
                    <Input
                      className="py-6  capitalize"
                      placeholder="Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <CustomAlert variant="destructive" message={error} />}

            <ButtonLoader
              disabled={isPending}
              type="submit"
              className="w-full btn-secondary rounded-full mt-2 py-6"
            >
              CLICK HERE TO PROCEED
            </ButtonLoader>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
