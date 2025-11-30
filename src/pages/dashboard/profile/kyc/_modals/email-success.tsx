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

export function EmailSuccessDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md rounded-lg p-6 text-center"
      >
        <div className="flex justify-center">
          <div className="rounded-full bg-green-50 p-4">
            <img src={doubleCheckImage} className="h-10 w-10" alt="" />{" "}
          </div>
        </div>
        <DialogHeader className="pb-8 flex flex-col gap-0">
          <DialogTitle className="text-lg font-bold text-center">
            Email Verified
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-center">
            Your email has been verified successfully
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <Button
            onClick={onClose}
            className="w-full font-medium py-5 rounded-full btn-secondary"
          >
            Okay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
