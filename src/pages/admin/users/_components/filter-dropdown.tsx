import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

export default function FilterDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-md flex items-center gap-2"
        >
          <Filter className="h-4 w-4" /> Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Verified Users</DropdownMenuItem>
        <DropdownMenuItem>Pending KYC</DropdownMenuItem>
        <DropdownMenuItem>Active Accounts</DropdownMenuItem>
        <DropdownMenuItem>Suspended Accounts</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
