import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

interface SearchableSelectProps {
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  icon?: React.ReactNode;
}

export function SearchableSelect({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  className,
  icon,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <div className="flex items-center">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-fit justify-between rounded rounded-r-none border-r-0 text-custom-grey capitalize gap-0 cursor-pointer",
              className,
              {
                "rounded-r border-r": !value,
              }
            )}
          >
            {icon && <span className="mr-2">{icon}</span>}
            <span className="text-xs hidden sm:flex">
              {selectedOption ? selectedOption.value : placeholder}
            </span>
            {!selectedOption && (
              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            )}
          </Button>
          {selectedOption && (
            <Button
              onClick={(e) => {
                console.log("clicked");
                e.preventDefault();
                e.stopPropagation();
                onChange?.("");
              }}
              variant="outline"
              className="rounded-l-none border-l-0"
            >
              {selectedOption && (
                <X className="h-4 w-4 opacity-50 cursor-pointer relative z-100 hover:text-red-400" />
              )}
            </Button>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value.toLowerCase()}
                  onSelect={() => {
                    onChange?.(option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      option.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
