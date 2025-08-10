import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PersonDetailsProps {
  totalSteps: number;
  currentStep: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
}

interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  dateOfBirth: string;
}

const verificationOptions = [
  "National Identification Number",
  "Bank Verification Number",
  "Passport",
];

export default function VerifyIdentity({ goTo, prev }: PersonDetailsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };

  console.log(prev);

  return (
    <div className="py-8 h-full">
      <form className="flex flex-col w-full h-full">
        <div className="flex flex-col w-full gap-6">
          {/* Identification Type  */}
          <div className="grid gap-1">
            <Label
              htmlFor="identificationType"
              className="text-xs font-semibold"
            >
              Identification Type
            </Label>
            <div className="flex items-center relative">
              <Select>
                <SelectTrigger className="w-full py-6 pr-3 align-text-bottom cursor-pointer">
                  <SelectValue placeholder="National Identification Number" />
                </SelectTrigger>
                <SelectContent>
                  {verificationOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Verification Number  */}
          <div className="grid gap-1">
            <Label>Verification Number</Label>
            <Input type="text" placeholder="000000000000000" className="py-6" />
          </div>
        </div>

        <div className="mt-auto flex gap-4">
          <Button
            onClick={() => {
              prev();
            }}
            className="flex-1 bg-gray-400 border border-black py-5 cursor-pointer"
          >
            Back
          </Button>
          <Button className="flex-1 py-5 bg-black cursor-pointer">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
