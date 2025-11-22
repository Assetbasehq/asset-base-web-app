import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionDetail from "./transaction-detail";
import { useNavigate } from "react-router";
import { useWalletTransactions } from "@/hooks/useWallet";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TransactionHistory({ currency }: { currency: string }) {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useWalletTransactions({
    currency,
  });

  console.log(data);

  const navigate = useNavigate();

  const handleScroll = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 20;

    console.log({ bottom, hasNextPage, isFetchingNextPage });

    if (bottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) return <TransactionHistorySkeleton />;

  if (isError) return <div>Something went wrong</div>;

  const transactions = data?.pages.flatMap((page) => page.items) || [];

  return (
    <Card className=" p-0 bg-custom-card border-none text-start shadow-none w-full md:w-2/5">
      <CardContent className=" text-custom-white-text p-2 md:p-4">
        <CardTitle className="text-lg">Transaction History</CardTitle>

        <ScrollArea
          onScroll={handleScroll}
          className="flex flex-col my-4 max-h-[400px] overflow-y-auto mb-16 no-scrollbar"
        >
          <div className="flex flex-col gap-4 no-scrollbar">
            {transactions?.map((transaction: any) => (
              <div className="relative" key={transaction.id}>
                <TransactionDetail
                  currency={currency}
                  transaction={transaction}
                />
                {/* <button
                className="absolute inset-0  w-full bg-transparent"
                onClick={() => {
                  navigate(`transactions/${currency}/all?id=${transaction.id}`);
                }}
              >
                <span className="sr-only">view transaction details</span>
              </button> */}
              </div>
            ))}
            {isFetchingNextPage && (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-between border p-2 rounded-lg w-full">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-5 w-44" />
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function TransactionHistorySkeleton() {
  return (
    <Card className=" p-0 bg-custom-card border-none text-start shadow-none w-full md:w-2/5">
      <CardContent className=" text-custom-white-text p-2 md:p-4">
        <CardTitle className="text-lg mb-4 text-start">
          Transaction History
        </CardTitle>

        <div className="flex flex-col gap-4 my-4 max-h-[400px] overflow-y-auto">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between border p-2 rounded-lg"
            >
              <div className="flex items-center gap-4">
                {/* Circle Icon */}
                <Skeleton className="h-10 w-10 rounded-full" />

                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-44" />
                  {/* <Skeleton className="h-4 w-12" /> */}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <Skeleton className="h-5 w-20" />
                {/* <Skeleton className="h-4 w-12" /> */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
