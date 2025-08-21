import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FormValues {
  verificationType: string;
  verificationNumber: string;
}

const verificationOptions = [
  "National Identification Number",
  "Bank Verification Number",
  "Passport",
];

export default function VerifyIdentity() {
  const form = useForm<FormValues>({
    defaultValues: {
      verificationType: "",
      verificationNumber: "",
    },
  });

  const verificationType = form.watch("verificationType");
  const verificationNumber = form.watch("verificationNumber");

  const isContinueDisabled = !verificationType || !verificationNumber.trim();

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", { ...data });

    // Handle Submit
  };

  return (
    <div className="py-8 h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full h-full"
        >
          <div className="flex flex-col w-full gap-6">
            {/* Identification Type */}
            <FormField
              control={form.control}
              name="verificationType"
              rules={{ required: "Identification type is required" }}
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs font-semibold">
                    Identification Type
                  </Label>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full py-6 pr-3 align-text-bottom cursor-pointer">
                        <SelectValue placeholder="Select identification type" />
                      </SelectTrigger>
                      <SelectContent>
                        {verificationOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Verification Number */}
            <FormField
              control={form.control}
              name="verificationNumber"
              rules={{ required: "Verification number is required" }}
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs font-semibold">
                    Verification Number
                  </Label>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="000000000000000"
                      className="py-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Buttons */}
          <div className="mt-auto flex gap-4">
            <Button
              type="button"
              className="flex-1 bg-gray-300 border border-black hover:bg-gray-300 dark:bg-custom-card-background dark:text-white dark:border-white py-5 cursor-pointer"
            >
              Back
            </Button>
            <Button
              disabled={isContinueDisabled}
              type="submit"
              className="flex-1 py-5 bg-black text-white dark:bg-primary cursor-pointer"
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
