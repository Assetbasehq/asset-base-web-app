import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { IYellowcardMetaData } from "@/interfaces/yellow-card.interface";
import { Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";

interface DepositAccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  yellowCardMetaData: IYellowcardMetaData | null;
}

export default function DepositAccountDetailsModal({
  isOpen,
  onClose,
  onSuccess,
  yellowCardMetaData,
}: DepositAccountDetailsModalProps) {
  const [copied, setCopied] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const navigate = useNavigate();

  // 🕒 Handle Copy
  const handleCopy = async () => {
    if (yellowCardMetaData?.bankInfo?.accountNumber) {
      await navigator.clipboard.writeText(
        yellowCardMetaData.bankInfo.accountNumber
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ⏳ Countdown logic
  useEffect(() => {
    if (!yellowCardMetaData?.expiresAt) return;

    const expiresAt = new Date(yellowCardMetaData.expiresAt).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, expiresAt - now);
      setRemainingTime(diff);

      if (diff <= 0) {
        clearInterval(interval);
        onClose(); // close modal
        navigate(0); // refresh page
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [yellowCardMetaData?.expiresAt, onClose, navigate]);

  // ⌛ Format mm:ss
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md bg-background border border-border rounded-2xl p-6"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Payment Details
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Please make payment using the details below.
          </DialogDescription>
        </DialogHeader>

        {yellowCardMetaData ? (
          <>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <p>Bank Name</p>
                <p className="font-semibold">
                  {yellowCardMetaData.bankInfo?.name || "-"}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p>Account Name</p>
                <p className="font-semibold">
                  {yellowCardMetaData.bankInfo?.accountName || "-"}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p>Account Number</p>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">
                    {yellowCardMetaData.bankInfo?.accountNumber || "-"}
                  </p>

                  <button
                    onClick={handleCopy}
                    className={cn(
                      "transition-all duration-200 text-muted-foreground hover:text-primary cursor-pointer",
                      copied && "text-green-500 scale-105"
                    )}
                    aria-label="Copy account number"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Countdown */}
            {yellowCardMetaData.expiresAt && (
              <div className="mt-2 text-center text-sm">
                <p className="text-muted-foreground">
                  Expires in{" "}
                  <span className="font-semibold text-primary">
                    {formatTime(remainingTime)}
                  </span>
                </p>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-muted-foreground mt-4">
            No account details available.
          </p>
        )}

        <DialogFooter className="mt-2">
          <Button onClick={onClose} className="w-full sm:w-auto">
            Close
          </Button>
          <Button onClick={onSuccess} className="btn-primary w-full sm:w-auto">
            I have sent it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
