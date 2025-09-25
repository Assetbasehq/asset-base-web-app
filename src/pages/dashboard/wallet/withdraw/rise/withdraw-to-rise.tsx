import { Button } from "@/components/ui/button";
import riseLink from "@/assets/images/rise-link.svg";

export default function WithdrawToRiseWallet({
  onBack,
}: {
  onBack: () => void;
}) {
  const isLinked = false; // Replace with actual logic later

  if (!isLinked) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <img src={riseLink} alt="rise" className="w-28 h-28" />
        <h2 className="text-sm font-medium max-w-sm">
          Your Rise account is not yet linked. Link your account to have access
          to your wallet
        </h2>
        <Button className="btn-primary rounded-full py-6 w-full">
          Link Rise Account
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Continue with Rise Wallet</h2>
      <Button variant="outline" onClick={onBack}>
        Back
      </Button>
    </div>
  );
}
