import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ChartDropdown({
  onSelect,
}: {
  onSelect?: (val: string) => void;
}) {
  const [selected, setSelected] = useState("12M");

  const handleSelect = (val: string) => {
    setSelected(val);
    onSelect?.(val);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full">
          {selected}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {["12M", "3D", "7D"].map((val) => (
          <DropdownMenuItem key={val} onClick={() => handleSelect(val)}>
            {val}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
