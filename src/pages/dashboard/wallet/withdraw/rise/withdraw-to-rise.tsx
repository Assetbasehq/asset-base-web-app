import { Button } from "@/components/ui/button";
import riseLink from "@/assets/images/rise-link.svg";
import { RiseAccount } from "@/components/shared/rise-account";

export default function WithdrawToRiseWallet() {
  const isLinked = false; // Replace with actual logic later

  return (
    <div className="text-center">
      <RiseAccount currency="usd" />
    </div>
  );
}
