import { Button } from "@/components/ui/button";
import WalletBreadCrumb from "./_components/wallet-bread-crumb";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Withdraw() {
  return (
    <div className="text-custom-white-text flex flex-col gap-4">
      <WalletBreadCrumb />

      <div className="flex flex-col gap-8 text-start w-md max-w-3xl mx-auto">
        <div>
          <h2 className="text-xl font-semibold">Withdraw Funds</h2>
          <p className="text-muted-foreground text-sm">
            Withdraw funds to your bank account
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-muted-foreground">Amount to withdraw</Label>
          <div className="relative">
            <Input className="w-full py-6" placeholder="0" />
            <Button className="absolute text-xs p-2 top-1/2 right-4 -translate-y-1/2 bg-custom-light-bg text-muted-foreground">
              max
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            <p>Available: $34,000</p>
          </div>
        </div>
        <Separator />

        <div>
          <h2>Select account to withdraw to</h2>
          <div className="flex flex-col gap-4 mt-4">
            <Button variant={"outline"} className="w-full py-6">
              Rise Wallet
            </Button>
            <Button variant={"outline"} className="w-full py-6">
              Naira Bank Account
            </Button>
          </div>
        </div>

        <Button className="btn-primary rounded-full py-6">
          PROCEED TO DEPOSIT
        </Button>
      </div>
    </div>
  );
}
