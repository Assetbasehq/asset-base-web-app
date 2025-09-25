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

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttonText: string;
  iconImage?: string;
}

export default function ActionModal({
  isOpen,
  onClose,
  iconImage,
  title,
  description,
  buttonText,
}: ActionModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md rounded-lg p-6 text-center"
      >
        <div className="flex justify-center">
          <div className="rounded-full bg-green-50 p-4">
            <img
              src={iconImage || doubleCheckImage}
              className="h-10 w-10"
              alt=""
            />
          </div>
        </div>
        <DialogHeader className="pb-8 flex flex-col gap-0">
          <DialogTitle className="text-lg font-bold text-center">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <Button
            onClick={onClose}
            className="w-full font-medium py-5 rounded-full btn-secondary"
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
