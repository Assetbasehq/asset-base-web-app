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
  icon?: React.ReactNode;
  disabled?: boolean;
  obj?: any;
}

interface SearchableSelectProps {
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (selectedOption: SelectOption) => void;
  contentWidth?: string;
  className?: string;
  icon?: React.ReactNode;
  cancelButton?: boolean;
}

export function SearchableSelect({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  className,
  contentWidth,
  icon,
  cancelButton = false,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <div className="flex items-center">
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-fit justify-between rounded rounded-r-none border-r-0 text-custom-grey capitalize gap-0 cursor-pointer",
              className,
              {
                "rounded-r border-r": !value || cancelButton,
                "border-r rounded-r": !cancelButton,
              }
            )}
          >
            {icon && <span className="mr-2">{icon}</span>}
            <span className="flex items-center gap-2">
              {selectedOption?.icon ? selectedOption.icon : null}
              <span className="text-xs hidden sm:flex">
                {selectedOption ? selectedOption.value : placeholder}
              </span>
            </span>
            {!selectedOption && (
              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            )}
          </Button>
          {cancelButton && selectedOption && (
            <Button
              onClick={(e) => {
                console.log("clicked");
                e.preventDefault();
                e.stopPropagation();
                onChange?.(selectedOption);
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

      <PopoverContent
        className={cn("p-0 ", {
          "w-[var(--radix-popover-trigger-width)]": !contentWidth,
        })}
      >
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value.toLowerCase()}
                  onSelect={() => {
                    onChange?.(option);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "h-4 w-4",
                      option.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.icon && <span className="">{option.icon}</span>}
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
