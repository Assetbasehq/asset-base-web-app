import { RiseAccount } from "@/components/shared/rise-account";
import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";

export default function WithdrawToRiseWallet() {
  const [amountToWithdraw, setAmountToWithdraw] = useState<number | null>(null);

  const [isConfirmationPinModalOpen, setIsConfirmationPinModalOpen] =
    useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [externalWalletId, setExternalWalletId] = useState<string | null>(null);

  const { user, isUserVerified } = useAuthStore();

  const isMinimumAmount = amountToWithdraw ? amountToWithdraw >= 10 : false;

  return (
    <div className="text-center">
      <RiseAccount
        currency="usd"
        disabled={!isUserVerified() || !isMinimumAmount}
        onSelect={(externalWalletId: string) => {
          setExternalWalletId(externalWalletId);
          setIsConfirmationPinModalOpen(true);
        }}
      />
    </div>
  );
}
