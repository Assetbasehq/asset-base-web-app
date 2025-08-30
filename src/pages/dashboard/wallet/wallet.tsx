import { Outlet } from "react-router";
import Options from "./_components/options";
import TotalBalance from "./_components/totalBalance";
import TransactionHistory from "./_components/transaction-history";

export default function Wallet() {
  return (
    <div className="text-custom-white-text flex flex-col gap-4">
      <h2 className="text-3xl font-semibold text-left">Wallets</h2>
      <Outlet />
    </div>
  );
}
