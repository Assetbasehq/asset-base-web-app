import { Button } from "@/components/ui/button";
import { RiArrowRightSLine } from "react-icons/ri";
import WalletBreadCrumb from "../_components/wallet-bread-crumb";

export default function Deposit() {
  return (
    <div className="text-custom-white-text flex flex-col gap-4">
      <WalletBreadCrumb />

      <div className="flex flex-col gap-8 text-start max-w-3xl mx-auto">
        <div>
          <h2 className="text-xl font-semibold">Deposit to wallet</h2>
          <p className="text-muted-foreground text-sm">
            Fund your wallet to start trading
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p>Select Wallet to fund</p>
          <div className="flex flex-col items-start  gap-4">
            <Button
              variant="outline"
              className="w-100 flex justify-between rounded px-2 py-6"
            >
              USD Wallet
              <RiArrowRightSLine />
            </Button>
            <Button
              variant="outline"
              className="w-100 flex justify-between rounded px-2 py-6"
            >
              NGN Wallet
              <RiArrowRightSLine />
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
