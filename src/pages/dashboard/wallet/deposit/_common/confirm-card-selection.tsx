import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { CardItem } from "@/interfaces/external-wallets";
import doubleCheckImage from "@/assets/images/check-double-line.svg";
import { FormatService } from "@/services/format-service";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { CustomAlert } from "@/components/custom/custom-alert";

interface CardSelectionModalProps {
  card: CardItem | null;
  amountToFund: number | null;
  isOpen: boolean;
  isLoading: boolean;
  error?: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmCardSelection({
  card,
  amountToFund,
  isLoading,
  error,
  isOpen,
  onClose,
  onConfirm,
}: CardSelectionModalProps) {
  const btnText = isLoading ? (
    <span className="flex items-center gap-2">
      <Loader /> Processing...
    </span>
  ) : (
    <span> Fund with {FormatService.formatToNaira(amountToFund)}</span>
  );

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-50 p-4">
            <img src={doubleCheckImage} className="h-10 w-10" alt="" />
          </div>
        </div>

        <DialogHeader className="pb-8 flex flex-col gap-0">
          <DialogTitle className="text-lg font-bold text-center">
            Proceed with card
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-center">
            You have selected a card ending with{" "}
            <span className="font-medium">
              ••••{card?.details?.last_digits}
            </span>{" "}
            to fund wallet with{" "}
            <span className="font-medium">
              {FormatService.formatToNaira(amountToFund)}
            </span>
            . Are you sure you want to proceed with this transaction?
          </DialogDescription>
        </DialogHeader>

        {error && <CustomAlert variant="destructive" message={error} />}

        <DialogFooter className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 w-full">
            <Button
              onClick={() => {
                onConfirm();
              }}
              disabled={isLoading}
              className="btn-primary w-full rounded-full "
            >
              {btnText}
            </Button>
            <Button
              disabled={isLoading}
              variant="outline"
              onClick={onClose}
              className="w-full rounded-full cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
