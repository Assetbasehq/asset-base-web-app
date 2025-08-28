import Options from "./_components/options";
import TotalBalance from "./_components/totalBalance";
import TransactionHistory from "./_components/transaction-history";

export default function Wallet() {
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
