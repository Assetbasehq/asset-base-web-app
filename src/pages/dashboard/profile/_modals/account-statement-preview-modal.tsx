import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AccountStatementPreviewModal({
  isOpen,
  onClose,
  onSuccess,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        // showCloseButton={false}
        className="sm:max-w-lg rounded-2xl p-6 md:p-8 text-start"
      >
        <DialogHeader className="flex flex-col items-start justify-start gap-0">
          <DialogTitle className="flex items-start gap-2 text-xl text-start">
            Select transaction type
          </DialogTitle>
          {/* <DialogDescription className="text-start">
            Select transaction type
          </DialogDescription> */}

          <Button className="mt-4 w-full py-6 btn-secondary">Apply</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
