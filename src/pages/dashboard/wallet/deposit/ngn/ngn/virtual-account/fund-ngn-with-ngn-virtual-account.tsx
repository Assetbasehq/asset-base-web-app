import React, { useState } from "react";
import DepositWrapper from "../../../_components/deposit-wraper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomAlert } from "@/components/custom/custom-alert";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

export default function FundNgnWithNgnVirtualAccount() {
  const [bvn, setBvn] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [error, setError] = React.useState<string | null>(null);

  const [actionRestricted, setActionRestricted] = useState(false);
  const { user, isUserVerified } = useAuthStore();

  const handleInputChange = (newBvn: string) => {
    setError(null);

    if (!newBvn) {
      setError("Please enter your BVN");
      return;
    }

    if (newBvn.length > 11 || newBvn.length < 11) {
      setError("BVN must be 11 digits");
      return;
    }

    if (!/^\d+$/.test(newBvn)) {
      setError("BVN must include only numbers");
      return;
    }

    setBvn(newBvn);
  };

  const handleSubmit = async () => {
    console.log({ bvn });
  };

  return (
    <DepositWrapper>
      <div className="text-custom-white-text flex flex-col gap-4">
        <div className="flex flex-col gap-4 text-start w-full max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">
              Fund With Your Naira Virtual Account
            </h2>
            <p className="text-muted-foreground text-sm">
              Make your transfer into the account number provider and your
              wallet will be funded immediately.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-custom-grey text-xs md:text-sm">
              Please provide your BVN
            </Label>
            <Input
              onChange={(e) => handleInputChange(e.target.value)}
              type="text"
              className="py-6 w-full"
              placeholder="10"
            />
          </div>

          {error && <CustomAlert variant="destructive" message={error} />}

          <Button className="btn-primary py-6 rounded-full mt-auto">
            Validate
          </Button>
        </div>
      </div>
    </DepositWrapper>
  );
}
