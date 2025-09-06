import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router";
import {
  RiAddLine,
  RiArrowLeftRightLine,
  RiBox3Line,
  RiDownloadFill,
  RiEyeLine,
} from "react-icons/ri";
// import { Skeleton } from "@/components/ui/skeleton";

export default function AccountSummary() {
  // if (true) {
  //   return <AccountSummarySkeleton />;
  // }

  return (
    <Card className=" p-0 bg-custom-card border-none text-start shadow-none">
      <CardContent className=" p-0 text-custom-white">
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col gap-6 w-full">
            <Select defaultValue="usd">
              <SelectTrigger className="w-fit shadow-none border-none bg-gray-100">
                <SelectValue placeholder="USD" className="text-white" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="cad">NGN</SelectItem>
              </SelectContent>
            </Select>

            <div className="w-full flex flex-col items-start gap-2 md:flex-row md:items-center justify-between text-custom-white-text">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <h2 className="text-3xl font-semibold">$30,000.00</h2>
                  <RiEyeLine className="w-5 h-5 cursor-pointer" />
                </div>
                <p className="text-green-400">+1,966 (2.4%)</p>
              </div>
              <div className="flex justify-between md:justify-end w-full gap-4">
                <Link to="/dashboard/wallet/deposit">
                  <div className="flex flex-col gap-2 text-primary items-center">
                    <RiAddLine className="w-12 h-12 p-3 rounded-full text-white bg-custom-orange border border-custom-orange" />
                    <span className="font-semibold text-xs text-custom-orange">
                      Deposit
                    </span>
                  </div>
                </Link>
                <div className="flex flex-col gap-2 text-primary items-center cursor-pointer">
                  <RiDownloadFill className=" w-12 h-12 p-3 text-custom-orange rounded-full bg-custom-orange/20 border border-custom-orange" />{" "}
                  <span className="font-semibold text-xs text-custom-orange ">
                    Withdraw
                  </span>
                </div>
                <div className="flex flex-col gap-2 items-center cursor-pointer">
                  <RiArrowLeftRightLine className=" h-12 w-12 p-3 rounded-full bg-custom-light-bg text-custom-white " />
                  <span className="font-semibold text-xs">Convert</span>
                </div>
                <div className="flex flex-col gap-2 items-center cursor-pointer">
                  <RiBox3Line className=" h-12 w-12 p-3 rounded-full bg-custom-light-bg text-custom-white" />
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
