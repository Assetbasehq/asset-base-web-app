import { CustomAlert } from "@/components/custom/custom-alert";
import WalletBreadCrumb from "../../_components/wallet-bread-crumb";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CryptoDeposit() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="text-custom-white-text flex flex-col gap-4">
      <WalletBreadCrumb />

      <div className="flex flex-col gap-8 text-start w-full max-w-lg  mx-auto">
        <div>
          <h2 className="text-xl font-semibold">Fund with Crypto</h2>
          <p className="text-muted-foreground text-sm">
            Fund your wallet to start trading
          </p>
        </div>

        <div>
          <div className="space-y-2">
            <Label>Enter amount to fund</Label>
            <Input type="text" className="py-6 w-full" />
          </div>
          {error && <CustomAlert variant="destructive" message={error} />}
        </div>
      </div>
    </div>
  );
}
