import { useState } from "react";
import Options from "./options";
import TotalBalance from "./totalBalance";
import TransactionHistory from "./transaction-history/transaction-history";

export default function WalletPage() {
  const [currency, setCurrency] = useState<"usd" | "ngn">("usd");

  return (
    <div className="text-custom-white-text flex flex-col gap-2">
      <TotalBalance currency={currency} setCurrency={setCurrency} />
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <Options />
        <TransactionHistory currency={currency} />
      </div>
    </div>
  );
}
