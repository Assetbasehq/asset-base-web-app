import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import doubleCheckImage from "@/assets/images/check-double-line.svg";
import type { IAsset } from "@/interfaces/asset.interface";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  numberOfShares: number;
  asset: IAsset;
}

export default function SuccessModal({
  isOpen,
  onClose,
  numberOfShares,
  asset,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-lg p-6 text-center bg-custom-card shadow-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-50 p-4">
            <img src={doubleCheckImage} className="h-10 w-10" alt="" />
          </div>
        </div>
        <DialogHeader className="pb-8 flex flex-col gap-0">
          <DialogTitle className="text-lg font-bold text-center">
            Purchase Successful
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-center">
            You have successfully purchased {numberOfShares} shares of{" "}
            {asset.asset_name}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <Button
            onClick={onClose}
            className="w-full font-medium py-5 rounded-full btn-secondary"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
