import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownToLine, ArrowRightLeft, Box, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
// import { Skeleton } from "@/components/ui/skeleton";

const transactions = [
  {
    icon: <ArrowRightLeft />,
    ticker: "BTC",
    transactionType: "Swap",
    amount: 0.0025,
    value: "557,000.00",
  },
  {
    icon: <Box />,
    ticker: "ETH",
    transactionType: "Buy",
    amount: 1.0,
    value: "200,000.00",
  },
  {
    icon: <Plus />,
    ticker: "USDT",
    transactionType: "Sell",
    amount: 2000.0,
    value: "2,000,000.00",
  },
];

export default function TransactionHistory() {
  // if (true) {
  //   return <AccountSummarySkeleton />;
  // }

  return (
    <Card className="bg-custom-card border-none text-start shadow-none w-full md:w-2/5">
      <CardContent className=" text-custom-white-text">
        <CardTitle className="text-lg">Transaction History</CardTitle>

        <div className="flex flex-col gap-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.ticker}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {transaction.icon}
                <span className="font-semibold">{transaction.ticker}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {transaction.transactionType}
                </span>
                <span className="font-semibold">{transaction.amount}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{transaction.value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AccountSummarySkeleton() {
  return (
    <Card className="border-none">
      <CardContent>
        <div className="text-start flex flex-col gap-4">
          {/* Main Card */}
          <div className="flex items-center justify-between bg-custom-gray-muted rounded-lg">
            <div className="flex flex-col gap-6 w-full">
              {/* Currency Select */}
              <Skeleton className="h-10 w-20 rounded-md" />

              {/* Balance + Actions */}
              <div className="w-full flex items-center justify-between">
                {/* Balance Info */}
                <div>
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-4 w-20 mt-2" />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col gap-2 items-center">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
