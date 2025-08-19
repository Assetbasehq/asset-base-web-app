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
import { formatDate } from "@/lib/utils";
import type { OnboardingProps } from "@/interfaces/onboarding.interface";

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
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  dateOfBirth: Date | undefined;
}

const countries = ["Nigeria", "Ghana", "Kenya", "Tanzania", "Uganda", "Rwanda"];

export default function PersonalDetails({ userInfo, next }: OnboardingProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: userInfo,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    next(data); // ✅ pass form data forward
  };

  return (
    <div className="w-full flex flex-col py-8 gap-18 font-neue">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-6"
        >
          {/* First + Last Name */}
          <div className="grid sm:grid-cols-2 gap-6 items-start">
            <FormField
              control={form.control}
              name="firstName"
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs font-semibold">First Name</Label>
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
              name="lastName"
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

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <FormItem>
                <Label className="text-xs font-semibold">Phone Number</Label>
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
          <FormField
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
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <FormItem>
                <Label className="text-xs font-semibold">Country</Label>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full py-6 pr-3 align-text-bottom cursor-pointer">
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
            )}
          />

          {/* Date of Birth */}
          <FormField
            control={form.control}
            name="dateOfBirth"
            rules={{ required: "Date of birth is required" }}
            render={({ field }) => (
              <FormItem>
                <Label className="text-xs font-semibold">Date of Birth</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="justify-between font-normal w-full py-6 pr-3 align-text-bottom"
                      >
                        {field.value ? formatDate(field.value) : "Select date"}
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
            )}
          />

          <Button
            type="submit"
            className="w-full font-semibold py-6 border-2 text-sm cursor-pointer hover:bg-custom-black/90 hover:text-white bg-black text-white dark:bg-primary dark:text-white"
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
