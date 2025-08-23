import TotalBalance from "./_components/totalBalance";
import TransactionHistory from "./_components/transaction-history";

export default function Wallet() {
  return (
    <div className="text-custom-white-text ">
      <TotalBalance />
      <div>
        <TransactionHistory />
      </div>
    </div>
  );
}
