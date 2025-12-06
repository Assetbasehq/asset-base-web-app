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
import { CustomAlert } from "../custom/custom-alert";
import { AlertTriangle, Loader } from "lucide-react";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onConfirm: () => void;
  title: string;
  description: string;
  buttonText: string;
  loadingButtonText: string;
  iconImage?: string;
  error?: string | null;
}

export default function ActionModal({
  isOpen,
  onClose,
  iconImage,
  title,
  description,
  buttonText,
  onConfirm,
  isLoading,
  loadingButtonText,
  error,
}: ActionModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md rounded-lg p-6 text-center"
      >
        <div className="flex justify-center">
          <AlertTriangle className="h-10 w-10 text-custom-ticker-red" />
        </div>
        <DialogHeader className="pb-8 flex flex-col gap-0">
          <DialogTitle className="text-lg font-bold text-center">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        {error && <CustomAlert variant="error" message={error} />}
        <div className="flex w-full gap-3">
          <Button
            onClick={onClose}
            className="flex-1 font-medium py-5 rounded-full border-2 cursor-pointer"
          >
            Close
          </Button>

          <Button
            onClick={onConfirm}
            className="flex-1 font-medium py-5 rounded-full btn-primary"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader className="animate-spin" /> {loadingButtonText}
              </span>
            ) : (
              buttonText
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
