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
import { CalendarIcon, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { userService } from "@/api/user.api";
import { useState } from "react";
import { CustomAlert } from "@/components/custom/custom-alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { countryCodes } from "@/constants/countries";
export default function PersonalInformation() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { user } = useAuthStore();

  const personalInformationForm = useForm({
    mode: "onChange",
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      phone_number: user?.phone_number || "",
      date_of_birth: user?.date_of_birth || new Date(),
      country: user?.country || "nigeria",
    },
  });

  const upadateUserMutation = useMutation({
    mutationFn: (data: any) =>
      userService.updateUserInformation(user?.id as string, data),
    onSuccess: (updatedUser) => {
      console.log({ updatedUser });
      setError(null);
      setSuccess(`Profile updated successfully`);
      setTimeout(() => setSuccess(null), 2000);

      personalInformationForm.reset(updatedUser);
    },
    onError: (error) => {
      console.log({ error });
      setError(error.message);
      setSuccess(null);
    },
  });

  const onSubmit = (data: any) => {
    console.log({ data });
    upadateUserMutation.mutateAsync(data);
  };

  const btnText = upadateUserMutation.isPending ? (
    <span className="flex items-center">
      <Loader className="mr-2 h-4 w-4 animate-spin" />
      Saving...
    </span>
  ) : (
    "Save Changes"
  );

  return (
    <div>
      <Form {...personalInformationForm}>
        <form
          onSubmit={personalInformationForm.handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row gap-4"
        >
          <div className="flex flex-col items-start lg:w-2/5">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <p className="text-muted-foreground">
              Update your personal details here
            </p>
            <Button
              type="submit"
              disabled={
                !personalInformationForm.formState.isValid ||
                !personalInformationForm.formState.isDirty ||
                upadateUserMutation.isPending
              }
              className="mt-4 text-muted-foreground bg-custom-input-mute cursor-pointer"
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
              control={personalInformationForm.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="py-6  capitalize"
                      placeholder="John"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={personalInformationForm.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="py-6  capitalize"
                      placeholder="Doe"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={personalInformationForm.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      className="py-6  capitalize"
                      placeholder="+2345678901"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={personalInformationForm.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal py-6",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value as Date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          const formattedDate = format(date as Date, "PPP");

                          console.log({ formattedDate });

                          field.onChange(date);
                          setOpen(false);
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={personalInformationForm.control}
              name="country"
              rules={{ required: "Country is required" }}
              render={({ field }) => {
                const error = personalInformationForm.formState.errors.country;

                return (
                  <FormItem>
                    <FormLabel>Country Of Residence</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={cn(
                            "w-full py-6 pr-3 align-text-bottom cursor-pointer capitalize",
                            error && "border-red-500 text-red-500" // 👈 highlight when invalid
                          )}
                        >
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
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
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
