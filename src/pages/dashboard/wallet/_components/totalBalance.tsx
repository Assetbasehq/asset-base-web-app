import { Card, CardContent } from "@/components/ui/card";
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

export default function TotalBalance() {
  // if (true) {
  //   return <AccountSummarySkeleton />;
  // }

  return (
    <Card className="bg-custom-card border-none text-start shadow-none">
      <CardContent className=" text-white">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-10 w-full">
            <Select defaultValue="usd">
              <SelectTrigger className="w-fit shadow-none border-none bg-gray-100 px-3">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">
                  <span className="flex items-center gap-2">
                    <img
                      src="https://flagcdn.com/us.svg"
                      alt="US Flag"
                      className="h-6 w-6 rounded-full"
                    />
                    <span>USD</span>
                  </span>
                </SelectItem>

                <SelectItem value="ngn">
                  <span className="flex items-center gap-2">
                    <img
                      src="https://flagcdn.com/ng.svg"
                      alt="Nigeria Flag"
                      className="h-3 w-9 rounded-full"
                    />
                    <span>NGN</span>
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="w-full flex flex-col items-start gap-6 md:flex-row md:items-center justify-between text-custom-white-text">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-semibold">$30,000.00</h2>
                <p className="text-green-400">+1,966 (2.4%)</p>
              </div>
              <div className="flex justify-between md:justify-end w-full gap-4">
                <div className="flex flex-col gap-2 text-primary items-center">
                  <Plus className=" h-10 w-10 p-3 rounded-full text-white bg-custom-orange cursor-pointer" />
                  <span className="font-semibold text-xs text-custom-orange">
                    Deposit
                  </span>
                </div>
                <div className="flex flex-col gap-2 text-primary items-center cursor-pointer">
                  <ArrowDownToLine className="h-10 w-10 p-3 rounded-full text-custom-orange bg-custom-orange/20 border border-custom-orange cursor-pointer " />
                  <span className="font-semibold text-xs text-custom-orange ">
                    Withdraw
                  </span>
                </div>
                <div className="flex flex-col gap-2 items-center cursor-pointer">
                  <ArrowRightLeft className=" h-10 w-10 p-3 rounded-full text-custom-black bg-gray-300 " />
                  <span className="font-semibold text-xs">Convert</span>
                </div>
                <div className="flex flex-col gap-2 items-center cursor-pointer">
                  <Box className=" h-10 w-10 p-3 rounded-full text-custom-black bg-gray-300 " />
                  <span className="font-semibold text-xs">Add Liquidity</span>
                </div>
              </div>
            </div>
          </div>
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
