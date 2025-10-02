import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/store/auth-store";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router";

interface ActionRestrictedModal {
  isOpen: boolean;
  onClose: () => void;
}

export default function ActionRestrictedModal({
  isOpen,
  onClose,
}: ActionRestrictedModal) {
  const { user } = useAuthStore();

  const link = user?.organization_name
    ? `/dashboard/account/kyb`
    : `/dashboard/account/kyc`;

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="sm:max-w-xl">
        <div className="flex justify-center">
          <AlertTriangle className="w-24 h-24 text-yellow-700" />
        </div>

        <DialogHeader className="pb-8 flex flex-col gap-0">
          <DialogTitle className="text-lg font-bold text-center">
            Action Restricted
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-center">
            <p>
              This action has been restricted because you have not verified your
              account.
            </p>
            <p>Verify your account now to get unrestricted access.</p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 w-full">
            <Link to={link} onClick={onClose}>
              <Button className="btn-primary w-full rounded-full py-6 ">
                Verify Account
              </Button>
            </Link>
            <Button
              onClick={onClose}
              className="w-full rounded-full cursor-pointer py-6"
            >
              Do This Later
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
