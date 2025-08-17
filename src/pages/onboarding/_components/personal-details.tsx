import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  dateOfBirth: string;
}

interface PersonDetailsProps {
  totalSteps: number;
  currentStep: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
}

const countries = ["Nigeria", "Ghana", "Kenya", "Tanzania", "Uganda", "Rwanda"];

export default function PersonalDetails({ next }: PersonDetailsProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="w-full flex flex-col py-8 gap-18 font-neue ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full gap-6">
          {/* FirstName and Lastname  */}
          <div className="grid grid-cols-2 gap-6">
            <div className="grid gap-1">
              <Label htmlFor="firstName" className="text-xs font-semibold">
                First Name
              </Label>
              <div className="flex items-center relative">
                <Input
                  {...register("firstName", { required: true })}
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  className="w-full py-6 pr-3 align-text-bottom"
                />
              </div>
              {errors.firstName && (
                <small className="text-xs text-destructive text-right">
                  First name is required
                </small>
              )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="lastName" className="text-xs font-semibold">
                Last Name
              </Label>
              <div className="flex items-center relative">
                <Input
                  {...register("lastName", { required: true })}
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  className="w-full py-6 pr-3 align-text-bottom"
                />
              </div>
              {errors.firstName && (
                <small className="text-xs text-destructive text-right">
                  Last name is required
                </small>
              )}
            </div>
          </div>
          {/* PhoneNumber   */}
          <div className="grid gap-1">
            <Label htmlFor="phoneNumber" className="text-xs font-semibold">
              Phone Number
            </Label>
            <div className="flex items-center relative">
              <Input
                {...register("phoneNumber", { required: true })}
                id="phoneNumber"
                type="text"
                placeholder="Enter phone number"
                className="w-full py-6 pr-3 align-text-bottom"
              />
            </div>
          </div>
          {/* Email  */}
          <div className="grid gap-1">
            <Label htmlFor="email" className="text-xs font-semibold">
              Email
            </Label>
            <div className="flex items-center relative">
              <Input
                {...register("email", { required: true })}
                id="email"
                type="email"
                placeholder="Enter email"
                className="w-full py-6 pr-3 align-text-bottom"
              />
            </div>
          </div>
          {/* Country  */}
          <div className="grid gap-1">
            <Label htmlFor="country" className="text-xs font-semibold">
              Country
            </Label>
            <div className="flex items-center relative">
              <Select>
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
            </div>
          </div>
          {/* Date of birth  */}
          <div className="grid gap-1">
            <Label htmlFor="date" className="text-xs font-semibold">
              Date of birth
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="justify-between font-normal w-full py-6 pr-3 align-text-bottom"
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    console.log({ date });

                    const formattedDate = formatDate(date);

                    console.log({ formattedDate });

                    setDate(date);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            type="submit"
            onClick={() => {
              next();
              console.log("click");
            }}
            className="w-full bg-black py-6 border-2 text-sm font-normal cursor-pointer hover:bg-custom-black/90 hover:text-white"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
