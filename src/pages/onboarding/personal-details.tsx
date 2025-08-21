import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { useOnboardingStore } from "@/store/onboarding-store";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";

interface FormValues {
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  // email: string;
  country: string;
  date_of_birth: Date | undefined;
  referral_code?: string;
}

const countries = ["Nigeria", "Ghana", "Kenya", "Tanzania", "Uganda", "Rwanda"];

export default function PersonalDetails() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { onboardingData } = useOnboardingStore();

  const form = useForm<FormValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "",
      phone_number: "",
      // email: "",
      country: "",
      date_of_birth: undefined,
      referral_code: undefined,
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const onSubmit = (data: FormValues) => {
    const finalForm = {
      ...onboardingData.step1,
      ...onboardingData.step2,
      ...onboardingData.step3,
      ...data,
    };

    console.log("Final form data:", finalForm);
    registerMutation.mutateAsync(finalForm);
  };

  return (
    <div className=" w-full min-h-screen flex flex-col items-center justify-center gap-18 font-neue bg-gradient-to-tr from-white via-white to-pink-100 dark:from-black dark:via-black dark:to-black">
      <Card className="w-full max-w-lg shadow-none text-black bg-white dark:bg-custom-card dark:text-white dark:border-custom-card">
        <CardHeader className="text-start flex flex-col gap-1">
          <CardTitle className="text-lg text-bold">Personal Account</CardTitle>
          <CardDescription className="font-neue">
            Get started to build your asset portfolio across various asset
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-6 text-start"
            >
              {/* First + Last Name */}
              <div className="grid sm:grid-cols-2 gap-6 items-start">
                <FormField
                  control={form.control}
                  name="first_name"
                  rules={{ required: "First name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs font-semibold">
                        First Name
                      </Label>
                      <FormControl>
                        <Input
                          placeholder="Enter first name"
                          className="w-full py-6 pr-3 align-text-bottom"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  rules={{ required: "Last name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs font-semibold">Last Name</Label>
                      <FormControl>
                        <Input
                          placeholder="Enter last name"
                          className="w-full py-6 pr-3 align-text-bottom"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Gender + Date Of Birth  */}
              <div className="grid sm:grid-cols-2 gap-6 items-start">
                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs font-semibold">Gender</Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full py-6 pr-3 align-text-bottom">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="date_of_birth"
                  rules={{ required: "Date of birth is required" }}
                  render={({ field }) => {
                    const error = form.formState.errors.date_of_birth;

                    return (
                      <FormItem>
                        <Label className="text-xs font-semibold">
                          Date of Birth
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "justify-between font-normal w-full py-6 pr-3 align-text-bottom",
                                  error && "border-red-500 text-red-500" // 👈 conditional error styles
                                )}
                              >
                                {field.value
                                  ? formatDate(field.value)
                                  : "Select date"}
                                <CalendarIcon />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                field.onChange(date);
                                setOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phone_number"
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-xs font-semibold">
                      Phone Number
                    </Label>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number"
                        className="w-full py-6 pr-3 align-text-bottom"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              {/* <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-xs font-semibold">Email</Label>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        className="w-full py-6 pr-3 align-text-bottom"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* Country */}
              <FormField
                control={form.control}
                name="country"
                rules={{ required: "Country is required" }}
                render={({ field }) => {
                  const error = form.formState.errors.country;

                  return (
                    <FormItem>
                      <Label className="text-xs font-semibold">
                        Country Of Residence
                      </Label>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={cn(
                              "w-full py-6 pr-3 align-text-bottom cursor-pointer",
                              error && "border-red-500 text-red-500" // 👈 highlight when invalid
                            )}
                          >
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
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

              {/* Referral Code */}
              <FormField
                control={form.control}
                name="referral_code"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-xs font-semibold">
                      Referral Code
                    </Label>
                    <FormControl>
                      <Input
                        placeholder="Enter referral code"
                        className="w-full py-6 pr-3 align-text-bottom"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full font-semibold py-6 border-2 text-sm cursor-pointer btn-secondary"
              >
                Continue
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
