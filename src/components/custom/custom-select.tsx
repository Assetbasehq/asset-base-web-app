import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React from "react";

export interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  icon?: React.ReactNode;
}

export default function CustomSelect({
  options,
  placeholder = "Select an option",
  defaultValue,
  onChange,
  className,
  icon,
}: CustomSelectProps) {
  console.log({ defaultValue });

  return (
    <Select value={defaultValue} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "w-[200px] rounded border focus:ring-1 focus:ring-primary focus:border-primary transition-colors",
          className
        )}
      >
        <span className="mr-1"> {icon}</span>
        <span className="hidden lg:flex">
          <SelectValue placeholder={placeholder} />
        </span>
        {/* <ChevronDown className="ml-2 h-4 w-4 opacity-60" /> */}
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer text-custom-white"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
