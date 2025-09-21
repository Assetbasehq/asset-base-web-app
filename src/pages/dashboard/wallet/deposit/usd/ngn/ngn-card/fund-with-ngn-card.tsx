import React from "react";
import DepositWrapper from "../../../_components/deposit-wraper";

export default function FundWithNGNCard() {
  return (
    <DepositWrapper>
      <div className="text-custom-white-text flex flex-col gap-4">
        <div className="flex flex-col gap-8 text-start w-full max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Fund With Card</h2>
            <p className="text-muted-foreground text-sm">
              Fund your wallet to start trading
            </p>
          </div>

          <div>
            <p>Flutterwave here</p>
          </div>
        </div>
      </div>
    </DepositWrapper>
  );
}
