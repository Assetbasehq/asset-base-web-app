import cards from "@/assets/images/cards.svg";
import { Button } from "@/components/ui/button";

export default function WithdrawToBankAccount() {
  const isLinked = false; // Replace with actual logic later

  if (!isLinked) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <img src={cards} alt="rise" className="w-28 h-28" />
        <h2 className="text-sm font-medium max-w-sm">
          You don't have any naira bank account added yet.
        </h2>
        <Button className="btn-primary rounded-full py-6 w-full">
          Add New Bank Account
        </Button>
      </div>
    );
  }

  const accounts = [];

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Continue with Rise Wallet</h2>
      <Button variant="outline" onClick={() => {}}>
        Back
      </Button>
    </div>
  );
}
