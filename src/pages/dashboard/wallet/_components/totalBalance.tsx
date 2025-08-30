import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RiAddLine,
  RiArrowLeftRightLine,
  RiDownloadFill,
  RiEyeOffLine,
} from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";

export default function TotalBalance() {
  // if (true) {
  //   return <AccountSummarySkeleton />;
  // }

  return (
    <Card className=" bg-transparent py-0 md:py-6 md:bg-custom-card border-none text-start shadow-none">
      <CardContent className="flex flex-col gap-4 px-0 md:px-6">
        <CardTitle className="text-lg font-medium">Total Balance</CardTitle>

        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-10 w-full">
            <div className="w-full flex flex-col items-start gap-6 md:flex-row md:items-center justify-between text-custom-white-text">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl md:text-4xl font-semibold">
                    $30,000.00
                  </h2>
                  <RiEyeOffLine />
                </div>
                <p className="text-green-400">+1,966 (2.4%)</p>
              </div>
            </div>
          </div>
          <Select defaultValue="usd">
            <SelectTrigger className="w-fit min-w-[110px] shadow-none border-none bg-gray-100 px-3">
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
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-6">
          <div className="flex gap-10 h-22">
            <div className="flex flex-col gap-1">
              <h2 className=" text-muted-foreground">Wallet Balance</h2>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold">$30,000.00</h2>
                <small className="text-green-400">+0.4%</small>
              </div>
            </div>
            <Separator orientation="vertical" className="hidden md:block" />
            <div className="flex flex-col gap-1">
              <h2 className=" text-muted-foreground">Investment Balance</h2>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold">$30,000.00</h2>
                <small className="text-green-400">+1.5%</small>
              </div>
            </div>
          </div>

          <div className="flex justify-between md:justify-end w-fit gap-4 md:gap-12">
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
              <RiArrowLeftRightLine className=" w-12 h-12 p-3 rounded-full bg-custom-input-mute text-custom-white-text" />{" "}
              <span className="font-semibold text-xs">Convert</span>
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
