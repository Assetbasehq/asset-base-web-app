import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export default function TotalAssets() {
  const balance = "450000000";

  // if (true) {
  //   return <TotalAssetsSkeleton />;
  // }

  return (
    <Card className="flex flex-col gap-1 bg-custom-card text-custom-white-text rounded-lg text-start border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">Total Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-6 w-full">
          <p className="text-lg md:text-2xl font-bold">
            {Number(balance).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <Select defaultValue="usd">
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="USD" className="text-white" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD</SelectItem>
              <SelectItem value="cad">NGN</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 text-sm md:text-lg font-semibold">
          <p className="text-green-400">+1.25%</p>
          <p>+34,000 this week</p>
        </div>

        <div className="text-start grid grid-cols-2 gap-2 w-full mt-4">
          <div className=" bg-custom-light-bg p-4 rounded-xl">
            <small className="text-xs font-semibold text-muted-foreground">
              Holdings
            </small>
            <p className="text-lg md:text-xl font-bold">$150,000.45</p>
            <small className="text-xs text-green-400">+1.25% (24h)</small>
          </div>
          <div className="bg-custom-light-bg p-4 rounded-xl">
            <small className="text-xs font-semibold text-muted-foreground">
              All-Time Profit
            </small>
            <p className="text-lg md:text-xl font-bold">+$150,000.45</p>
            <small className="text-xs text-green-400">+100.25% (24h)</small>
          </div>
          <div className=" bg-custom-light-bg p-4 rounded-xl">
            <small className="text-xs font-semibold text-muted-foreground">
              Avg. Buy Price
            </small>
            <p className="text-lg md:text-xl font-bold">$9,100.45</p>
          </div>
          <div className=" bg-custom-light-bg p-4 rounded-xl">
            <small className="text-xs font-semibold text-muted-foreground">
              Cost Basis
            </small>
            <p className="text-lg md:text-xl font-bold">$50,000.45</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TotalAssetsSkeleton() {
  return (
    <div className="flex flex-col gap-2 items-start bg-custom-card text-white rounded-xl p-4">
      {/* Title */}
      <Skeleton className="h-5 w-28" />

      {/* Balance + Select */}
      <div className="flex items-center justify-between gap-6 w-full">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-20 rounded-md" />
      </div>

      {/* Change percentage + amount */}
      <div className="flex gap-2 text-lg font-semibold">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-28" />
      </div>

      {/* Grid stats */}
      <div className="grid grid-cols-2 gap-2 w-full">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-custom-card-foreground p-6 rounded-xl flex flex-col gap-3 w-full"
          >
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-6 w-44" />
            {i < 3 && <Skeleton className="h-4 w-44" />}
          </div>
        ))}
      </div>
    </div>
  );
}
