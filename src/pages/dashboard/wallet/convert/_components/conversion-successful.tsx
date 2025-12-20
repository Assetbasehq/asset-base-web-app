import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { images } from "@/constants/images";
import type { ICurrency } from "@/interfaces/wallet.interfae";
import { formatService } from "@/services/format-service";

interface ConversionSuccessfulProps {
  src_currency: ICurrency;
  src_amount: number | null;
  dest_currency: ICurrency;
  dest_amount: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ConversionSuccessful({
  isOpen,
  onClose,
  src_currency,
  src_amount,
  dest_currency,
  dest_amount,
}: ConversionSuccessfulProps) {

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-lg rounded-2xl p-6 text-center "
      >
        <img
          src={images.checkMark.logo}
          alt={images.checkMark.alt}
          className="w-full"
        />
        <DialogHeader className="flex flex-col items-center justify-start gap-0">
          <DialogTitle className="flex items-start gap-2 text-xl text-center">
            Conversion Successful
          </DialogTitle>
          <DialogDescription className="text-start font-semibold text-md">
            {`${src_currency?.symbol}${formatService.formatWithCommas(
              src_amount
            )} = ${dest_currency?.symbol}${formatService.formatWithCommas(
              dest_amount
            )}.`}
          </DialogDescription>
        </DialogHeader>

        <div className="text-xs text-custom-grey mt-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="md:text-sm font-semibold">Convert</p>
            <p className="font-semibold">
              {src_currency &&
                `${src_currency?.symbol || ""}${formatService.formatWithCommas(
                  src_amount
                )}`}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="md:text-sm font-semibold">Receive</p>
            <p className="font-semibold">
              {dest_currency && `${dest_currency?.symbol || ""}${dest_amount}`}
            </p>
          </div>
        </div>
        <Button onClick={onClose} className="btn-primary py-5 rounded-full">
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
}
