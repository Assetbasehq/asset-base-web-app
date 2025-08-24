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
import { useState } from "react";

interface AccountStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AccountStatementModal({
  isOpen,
  onClose,
  onSuccess,
}: AccountStatementModalProps) {
  const [checked, setChecked] = useState({
    all: false,
    wallet: false,
    deposits: false,
    withdrawals: false,
    portfolio: false,
  });

  const updateAll = (value: boolean) => {
    setChecked({
      all: value,
      wallet: value,
      deposits: value,
      withdrawals: value,
      portfolio: value,
    });
  };

  const updateOne = (key: keyof typeof checked, value: boolean) => {
    setChecked((prev) => {
      const next = { ...prev, [key]: value };

      // If wallet is toggled
      if (key === "wallet" && value) {
        next.deposits = true;
        next.withdrawals = true;
      }

      // If wallet is untoggled
      if (key === "wallet" && !value) {
        next.all = false;
        next.deposits = false;
        next.withdrawals = false;
      }

      // If deposits or withdrawals changed, recalc wallet
      if (key === "deposits" || key === "withdrawals") {
        next.wallet = next.deposits && next.withdrawals;
      }

      // Recalculate all
      next.all =
        next.wallet && next.deposits && next.withdrawals && next.portfolio;

      return next;
    });
  };

  const isAnySelected = Object.values(checked).some(Boolean);

  const handleApply = () => {
    onClose();
    onSuccess();
  };

  if (!isOpen) return null;

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

          <div className="flex flex-col gap-4 py-4 w-full">
            <div className="flex items-center gap-3">
              <Checkbox
                id="all-transactions"
                checked={checked.all}
                onCheckedChange={updateAll}
                className="checkbox-orange cursor-pointer "
              />
              <Label htmlFor="all-transactions">All transactions</Label>
            </div>
            <Separator />
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="terms-2"
                  checked={checked.wallet}
                  className="checkbox-orange cursor-pointer "
                  onCheckedChange={(value: boolean) => {
                    updateOne("wallet", value);
                  }}
                />
                <Label htmlFor="terms-2">Wallet transactions</Label>
              </div>

              <ul className="flex flex-col gap-4 pl-8">
                <li className="flex items-center gap-3">
                  <Checkbox
                    id="terms-2"
                    checked={checked.deposits}
                    className="checkbox-orange cursor-pointer"
                    onCheckedChange={(value: boolean) => {
                      updateOne("deposits", value);
                    }}
                  />
                  <Label htmlFor="terms-2">Deposits</Label>
                </li>
                <li className="flex items-center gap-3">
                  <Checkbox
                    id="terms-2"
                    checked={checked.withdrawals}
                    className="checkbox-orange cursor-pointer"
                    onCheckedChange={(value: boolean) => {
                      updateOne("withdrawals", value);
                    }}
                  />
                  <Label htmlFor="terms-2">Withdrawals</Label>
                </li>
              </ul>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <Checkbox
                id="toggle"
                checked={checked.portfolio}
                onCheckedChange={(value: boolean) => {
                  updateOne("portfolio", value);
                }}
                className="checkbox-orange cursor-pointer"
              />
              <Label htmlFor="toggle">Portfolio transactions</Label>
            </div>
          </div>

          <Button
            disabled={!isAnySelected}
            onClick={handleApply}
            className="mt-4 w-full py-6 btn-secondary"
          >
            Apply
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
