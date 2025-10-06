import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RiAddLine } from "react-icons/ri";

export default function ProfileBanksAndCards() {
  return (
    <div className="flex flex-col gap-4 text-start p-4">
      <div className="mb-4">
        <h2 className="text-lg md:text-2xl font-semibold">Bank and Cards</h2>
        <p className="text-muted-foreground">Manage cards and bank accounts</p>
      </div>

      <div className="bg-custom-base p-4 rounded-lg flex flex-col items-start gap-4 max-w-xl ">
        <div>
          <h2 className="text-lg md:text-xl font-semibold">Bank accounts</h2>
          <p className="text-muted-foreground">
            Add a bank account to send and receive payments directly
          </p>
        </div>
        <Button
          className={cn(
            `flex items-center gap-2 !px-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out bg-custom-orange/10 text-custom-orange`
          )}
        >
          <RiAddLine />
          <p className="text-sm py-1 font-medium">Add account</p>
        </Button>
      </div>

      <div className="bg-custom-base p-4 rounded-lg flex flex-col items-start gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold">Cards</h2>
          <p className="text-muted-foreground">
            Add a card to spend from directly
          </p>
        </div>
        <Button
          className={cn(
            `flex items-center gap-2 !px-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out bg-custom-orange/10 text-custom-orange`
          )}
        >
          <RiAddLine />
          <p className="text-sm py-1 font-medium">Add account</p>
        </Button>
      </div>
    </div>
  );
}
