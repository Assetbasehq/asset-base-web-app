import React, { useState } from "react";
import DepositWrapper from "../../../_components/deposit-wraper";
import ActionRestrictedModal from "@/components/shared/_modals/action-restricted";
import { useAuthStore } from "@/store/auth-store";

export default function FundUsdWithUsdBankAccount() {
  const [actionRestricted, setActionRestricted] = useState(false);
  const { user, isUserVerified } = useAuthStore();
  return (
    <DepositWrapper>
      <ActionRestrictedModal
        isOpen={actionRestricted}
        onClose={() => setActionRestricted(false)}
      />
      <div>FundUsdWithBankAccount</div>
    </DepositWrapper>
  );
}
