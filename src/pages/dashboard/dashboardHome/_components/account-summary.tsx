import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useSearchParams } from "react-router";
import {
  RiAddLine,
  RiArrowLeftRightLine,
  RiBox3Line,
  RiDownloadFill,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import { useState } from "react";
import { useGetWallet } from "@/hooks/useWallet";
import { FormatService } from "@/services/format-service";
import { flags } from "@/constants/images";
// import { Skeleton } from "@/components/ui/skeleton";

export default function AccountSummary() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [currency, setCurrency] = useState<"usd" | "ngn">("usd");

  const { data, isLoading, isError } = useGetWallet({ currency });

  const handleCurrencyChange = (value: string) => {
    setCurrency(value as "usd" | "ngn");
  };

  if (isLoading) {
    return <AccountSummarySkeleton />;
  }

  return (
    <Card className=" p-0 bg-custom-card border-none text-start shadow-none">
      <CardContent className=" p-0 text-custom-white">
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col gap-4 w-full">
            <Select
              defaultValue={currency}
              onValueChange={handleCurrencyChange}
            >
              <SelectTrigger className="w-fit shadow-none border-none bg-gray-100">
                <SelectValue placeholder="USD" className="text-white" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">
                  <img
                    className="w-5 h-5"
                    src={flags.usa.flag}
                    alt={flags.usa.alt}
                  />
                  USD
                </SelectItem>
                <SelectItem value="ngn">
                  <img
                    className="w-5 h-5"
                    src={flags.nigeria.flag}
                    alt={flags.nigeria.alt}
                  />
                  NGN
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="w-full flex flex-col items-start gap-2 md:flex-row md:items-center justify-between text-custom-white-text">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-1">
                  <h2 className="text-2xl font-semibold">
                    {isBalanceVisible
                      ? currency === "usd"
                        ? FormatService.formatToUSD(data?.balance || 0)
                        : FormatService.formatToNaira(data?.balance || 0)
                      : "*****"}
                  </h2>

                  {isBalanceVisible ? (
                    <RiEyeLine
                      onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                      className="w-5 h-5 cursor-pointer"
                    />
                  ) : (
                    <RiEyeOffLine
                      onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                      className="w-5 h-5 cursor-pointer"
                    />
                  )}
                </div>
                {isBalanceVisible ? (
                  <small className="text-green-400">+1,966 (2.4%)</small>
                ) : (
                  <small className="text-green-400">******</small>
                )}
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
                <Link to="/dashboard/wallet/withdraw">
                  <div className="flex flex-col gap-2 text-primary items-center cursor-pointer">
                    <RiDownloadFill className=" w-12 h-12 p-3 text-custom-orange rounded-full bg-custom-orange/20 border border-custom-orange" />{" "}
                    <span className="font-semibold text-xs text-custom-orange ">
                      Withdraw
                    </span>
                  </div>
                </Link>
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
              <div className="w-full flex flex-col items-start gap-4 md:flex-row md:items-center justify-between">
                {/* Balance Info */}
                <div>
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-4 w-20 mt-2" />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between w-full md:w-fit gap-4">
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
