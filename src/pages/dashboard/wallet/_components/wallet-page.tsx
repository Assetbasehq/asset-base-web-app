import Options from "./options";
import TotalBalance from "./totalBalance";
import TransactionHistory from "./transaction-history";

export default function WalletPage() {
  return (
    <div className="text-custom-white-text flex flex-col gap-4">
      <TotalBalance />
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <Options />
        <TransactionHistory />
      </div>
    </div>
  );
}
