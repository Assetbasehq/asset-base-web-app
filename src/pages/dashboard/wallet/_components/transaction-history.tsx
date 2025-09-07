import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  RiArrowDownLine,
  RiArrowUpDownLine,
  RiArrowUpLine,
} from "react-icons/ri";
// import { Skeleton } from "@/components/ui/skeleton";

const transactions = [
  {
    icon: <RiArrowUpDownLine className="w-6 h-6" />,
    ticker: "BTC",
    transactionType: "Swap",
    amount: 0.0025,
    type: "SWAP",
    value: "557,000.00",
  },
  {
    icon: <RiArrowDownLine className="w-6 h-6" />,
    ticker: "ETH",
    transactionType: "Buy",
    amount: 1.0,
    type: "BUY",
    value: "200,000.00",
  },
  {
    icon: <RiArrowUpLine className="w-6 h-6" />,
    ticker: "USDT",
    transactionType: "Sell",
    amount: 2000.0,
    type: "SELL",
    value: "2,000,000.00",
  },
  {
    icon: <RiArrowDownLine className="w-6 h-6" />,
    ticker: "ETHH",
    transactionType: "Buy",
    amount: 1.0,
    type: "BUY",
    value: "200,000.00",
  },
];

export default function TransactionHistory() {
  // if (true) {
  //   return <TransactionHistorySkeleton />;
  // }

  return (
    <Card className=" p-0 bg-custom-card border-none text-start shadow-none w-full md:w-2/5">
      <CardContent className=" text-custom-white-text p-2 md:p-4">
        <CardTitle className="text-lg">Transaction History</CardTitle>

        <div className="flex flex-col gap-4 my-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.ticker}
              className="flex items-center justify-between border p-2 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <span className="border p-2 rounded-full border-custom-white-text">
                  {transaction.icon}
                </span>
                <div className="flex flex-col items-start">
                  <span className="font-semibold">{transaction.ticker}</span>
                  <span
                    className={cn("font-semibold", {
                      "text-green-500": transaction.type === "BUY" || "SWAP",
                      "text-red-500": transaction.type === "SELL",
                    })}
                  >
                    {transaction.transactionType}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="font-semibold">{transaction.value}</span>
                <span className="font-semibold">
                  {transaction.value.slice(0, 2)}k
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TransactionHistorySkeleton() {
  return (
    <Card className="bg-custom-card border-none shadow-none w-full md:w-2/5">
      <CardContent>
        <CardTitle className="text-lg mb-4 text-start">
          Transaction History
        </CardTitle>

        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between border p-3 rounded-lg"
            >
              <div className="flex items-center gap-4">
                {/* Circle Icon */}
                <Skeleton className="h-12 w-12 rounded-full" />

                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
