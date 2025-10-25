import AssetBaseBeta, {
  AssetBaseLogo,
} from "@/components/shared/asset-base-beta";
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
import { useAuthStore } from "@/store/auth-store";
import { format } from "date-fns";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDate: string;
  endDate: string;
}

export default function AccountStatementPreviewModal({
  isOpen,
  onClose,
  startDate,
  endDate,
}: ModalProps) {
  const { user } = useAuthStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        // showCloseButton={false}
        className="sm:max-w-lg rounded-2xl p-6 md:p-8 text-start font-geist"
      >
        <DialogHeader className="flex flex-col items-start justify-start gap-0">
          <DialogTitle className="flex items-start gap-2 text-xl text-start w-full">
            <div className="flex items-start justify-between w-full gap-2 font-geist font-medium pt-6">
              <div className="flex items-center gap-1">
                <AssetBaseLogo className="w-5 h-5" />
                <p className="text-custom-orange">Assetbase</p>
              </div>
              <div className="text-[#191919] dark:text-[#969696] text-right space-y-1 md:space-y-3 text-xs font-normal">
                <p>www.assetbase.capital</p>
                <p>+1 205 529 8525</p>
                <p>@AssetbaseHQ</p>
              </div>
            </div>
          </DialogTitle>
          <div className="flex items-start justify-between w-full my-4">
            <div>
              <h2 className="text-black-2 text-left text-sm font-medium capitalize">
                {user?.first_name} {user?.last_name}
              </h2>
              <p className="text-muted-foreground text-xs font-semibold">
                {user?.email_address}
              </p>
            </div>
            <p className="font-medium tracking-wide text-right space-y-3 text-xs">
              {format(new Date(), "MMMM dd, yyyy")}
            </p>
          </div>

          <Separator className="my-2 bg-white/10" />

          <div className="py-2">
            <h2 className="font-medium text-center">
              Account statement{" "}
              {startDate && (
                <span>from {format(new Date(startDate), "MMMM dd, yyyy")}</span>
              )}
              {endDate && (
                <span>to {format(new Date(endDate), "MMMM dd, yyyy")}</span>
              )}
            </h2>
          </div>
          <Separator className="my-2 bg-white/10" />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
