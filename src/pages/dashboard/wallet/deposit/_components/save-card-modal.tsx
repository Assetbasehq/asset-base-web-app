import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import doubleCheckImage from "@/assets/images/check-double-line.svg";
import { CustomAlert } from "@/components/custom/custom-alert";
import { Loader } from "lucide-react";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  error?: string | null;
  onSelect: (shouldSaveCard: boolean) => void;
}

export default function SaveCardModal({
  isOpen,
  onClose,
  isLoading,
  error,
  onSelect,
}: ActionModalProps) {
  if (!isOpen) return null;

  const btnText = isLoading ? (
    <span className="flex items-center gap-2">
      <Loader /> Processing...
    </span>
  ) : (
    <span>Save Card</span>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md rounded-lg p-6 text-center"
      >
        <div className="flex justify-center">
          <div className="rounded-full bg-green-50 p-4">
            <img src={doubleCheckImage} className="h-10 w-10" alt="" />
          </div>
        </div>
        <DialogHeader className="pb-8 flex flex-col gap-0">
          <DialogTitle className="text-lg font-bold text-center">
            Save Card?
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-center">
            Do you want to save card for future payments?
          </DialogDescription>
        </DialogHeader>

        {error && <CustomAlert variant="destructive" message={error} />}

        <DialogFooter className="">
          <div className="flex flex-col gap-4 w-full">
            <Button
              disabled={isLoading}
              onClick={() => onSelect(true)}
              className="w-full font-medium py-5 rounded-full btn-primary"
            >
              {btnText}
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => onSelect(false)}
              className="w-full font-medium py-5 rounded-full cursor-pointer"
            >
              No, Thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
