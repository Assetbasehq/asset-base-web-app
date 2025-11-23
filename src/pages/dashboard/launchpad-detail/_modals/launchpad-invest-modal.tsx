import { Button } from "@/components/ui/button";
import { calculateRaisePercentage, cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { RiFlashlightFill } from "react-icons/ri";

interface InvestFormData {
  quantity: number;
  currency: string;
  estimatedAmount: number;
}

export function LaunchpadInvestModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [active, setActive] = useState("about");

  const { register, handleSubmit, setValue, watch } = useForm<InvestFormData>({
    defaultValues: {
      quantity: 1,
      currency: "USD",
      estimatedAmount: 500,
    },
  });

  const quantity = watch("quantity");
  const estimatedAmount = watch("estimatedAmount");
  const currency = watch("currency");

  // Simulate calculation for estimated amount
  const calculateEstimatedAmount = (quantity: number) => {
    return quantity * 500; // $500 per share
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qty = Number(e.target.value) || 0;
    setValue("quantity", qty);
    setValue("estimatedAmount", calculateEstimatedAmount(qty));
  };

  const onSubmit = (data: InvestFormData) => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-col gap-2">
      {/* Existing UI */}

      <Card className="border-none shadow-none p-0 px-0 bg-custom-card text-custom-white h-fit md:w-2/3 md:mx-6">
        <CardContent className="p-4 text-start flex flex-col gap-2">
          <p className="text-xl font-semibold">$234,000</p>
          <Progress
            value={calculateRaisePercentage(236415, 150000)}
            className="w-full bg-custom-input-stroke [&>div]:bg-custom-orange h-1.5"
          />
          <small className="font-semibold text-custom-orange flex items-center gap-1">
            <RiFlashlightFill className="text-custom-orange" />
            {calculateRaisePercentage(236415, 150000)}% raised
          </small>
          <div className="bg-custom-light-bg px-4 py-2 rounded-xl flex justify-between">
            <small className="text-custom-grey">Price per share</small>
            <small className="text-custom-grey">$500</small>
          </div>
          <div className="px-4 py-2 flex justify-between">
            <small className="text-custom-grey">Available Shares</small>
            <small className="text-custom-grey">1,200</small>
          </div>
          <div className="bg-custom-light-bg px-4 py-2 rounded-xl flex justify-between">
            <small className="text-custom-grey">Raising goal</small>
            <small className="text-custom-grey">$1,200,000</small>
          </div>

          <Button
            className="btn-primary py-4 md:py-6 mt-4 rounded-full"
            onClick={() => onClose()}
          >
            Invest Now
          </Button>
        </CardContent>
      </Card>

      {/* Invest Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          showCloseButton={false}
          className="max-w-md bg-custom-card text-custom-white rounded-2xl"
        >
          <DialogHeader className="text-start flex- gap-0">
            <DialogTitle className="text-lg font-bold">
              Invest in Asset
            </DialogTitle>
            <DialogDescription className="text-custom-grey">
              Please type in the quantity of shares you want to purchase.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Quantity Input */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-custom-grey">
                Quantity of Shares
              </label>
              <Input
                type="number"
                min={1}
                {...register("quantity")}
                onChange={handleQuantityChange}
                className="bg-custom-light-bg border-custom-input-stroke text-custom-white py-6"
                placeholder="Enter number of shares"
              />
            </div>

            {/* Estimated Amount with Currency Select */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-custom-grey">
                Estimated Amount
              </label>
              <div className="relative">
                <Input
                  type="number"
                  readOnly
                  value={estimatedAmount}
                  className="bg-custom-light-bg border-custom-input-stroke text-custom-white pr-20 py-6"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Select
                    value={currency}
                    onValueChange={(value) => setValue("currency", value)}
                    defaultValue="cNGN"
                  >
                    <SelectTrigger className="w-22 !h-8 mr-2 rounded-full bg-custom-input-stroke text-custom-white py-0">
                      <SelectValue placeholder="cNGN" />
                    </SelectTrigger>
                    <SelectContent className="bg-custom-card">
                      <SelectItem value="cNGN">cNGN</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <DialogFooter>
              <Button
                type="submit"
                className="btn-primary w-full rounded-full py-4"
              >
                Invest
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
