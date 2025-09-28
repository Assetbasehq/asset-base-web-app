import React, { useState } from "react";
import DepositWrapper from "../../../_components/deposit-wraper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomAlert } from "@/components/custom/custom-alert";

export default function FundNgnWithNgnVirtualAccount() {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [amountToFund, setAmountToFund] = useState<number | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleAmountChange = (amount: string) => {
    setError(null);
    const amountNumber = Number(amount);
    if (!isNaN(amountNumber)) setAmountToFund(amountNumber);
  };

  return (
    <DepositWrapper>
      <div className="text-custom-white-text flex flex-col gap-4">
        <div className="flex flex-col gap-4 text-start w-full max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Fund With Virtual Account</h2>
            <p className="text-muted-foreground text-sm">
              Minimum deposit is $10
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-custom-grey text-xs md:text-sm">
              Enter amount to fund
            </Label>
            <Input
              onChange={(e) => handleAmountChange(e.target.value)}
              type="text"
              className="py-6 w-full"
              placeholder="10"
            />
            <div className="flex justify-between text-xs border px-4 py-2 rounded-full">
              <p className="text-custom-grey"> $1 </p>
              <p className="font-semibold">
                {/* {selectedMethod && getIOMethodRate(selectedMethod)} */}
              </p>
            </div>
          </div>

          {amountToFund && (
            <CustomAlert variant="warning" message="Minimum deposit is $10" />
          )}
          {error && <CustomAlert variant="destructive" message={error} />}

          <div className="text-xs text-custom-grey mt-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <p>Amount to deduct</p>
              <p className="font-semibold">
                {/* {FormatService.formatToNaira(amountToDeduct)} */}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Dollar equivalent</p>
              <p className="font-semibold">
                {/* {FormatService.formatToUSD(dollarEquivalent)} */}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 ">
            <p className="text-custom-grey text-xs">Select Funding Card</p>
            {/* <ExternalWallets
                    wallets={externalWallets?.items || []}
                    isLoading={isExternalWalletsLoading}
                    isMinimumAmount={isMinimumAmount}
                    selectedCard={selectedCard}
                    amountToFund={amountToFund}
                    handleSelectCard={handleSelectCard}
                    onSubmit={handleSubmit}
                  />
                  <Button
                    disabled={isMinimumAmount}
                    onClick={handleOpenSaveCardModal}
                    className="mt-1 bg-custom-blue-shade text-custom-white hover:bg-custom-blue-shade/90 cursor-pointer rounded text-sm py-8 px-4 flex justify-between items-center gap-4 w-full"
                  >
                    <div className="flex items-center gap-2">
                      <RiBankCardLine size={40} className="!w-6 !h-6" />
                      <div className="text-start">
                        <p className="text-sm">Pay with a new card</p>
                        <p className="text-xs">We support Visa, Mastercard, Verve</p>
                      </div>
                    </div>
                    <RiArrowRightSLine size={20} />
                  </Button> */}
          </div>
        </div>
      </div>
    </DepositWrapper>
  );
}
