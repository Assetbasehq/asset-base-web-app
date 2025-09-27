import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router";

export default function ConvertFunds() {
  const naviagate = useNavigate();
  return (
    <div>
      <div className="flex justify-start items-start">
        <Button
          asChild
          className="flex items-center gap-2 text-xs cursor-pointer p-2 bg-custom-light-bg text-custom-white-text rounded-lg hover:bg-custom-light-bg/80 transition-all duration-300 ease-in-out"
        >
          <Button
            onClick={() => {
              return naviagate(-1);
            }}
          >
            <RiArrowLeftLine />
            <p>Back </p>
          </Button>
        </Button>
      </div>
      <div className="flex flex-col gap-4 text-start w-full max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-semibold">Convert Funds</h2>
          <p className="text-muted-foreground text-sm">Swap assets</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-muted-foreground">Amount to withdraw</Label>
        <div className="relative">
          <Input className="w-full py-6" placeholder="0" />
          <Button className="absolute text-xs p-2 top-1/2 right-4 -translate-y-1/2 bg-custom-light-bg hover:bg-custom-light-bg text-muted-foreground cursor-pointer">
            max
          </Button>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          <p>Available: $34,000</p>
        </div>
      </div>
    </div>
  );
}
