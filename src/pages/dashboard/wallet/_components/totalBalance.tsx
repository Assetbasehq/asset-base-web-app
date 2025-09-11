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
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import { useGetCryptoBalance, useGetWallet } from "@/hooks/useWallet";
import { useState } from "react";
import { FormatService } from "@/services/format-service";
import { flags } from "@/constants/images";

export default function TotalBalance() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [currency, setCurrency] = useState<"usd" | "ngn">("usd");

  const { data, isLoading, isError } = useGetWallet({ currency });

  const { data: cryptoWalletBalance } = useGetCryptoBalance();

  console.log({ cryptoWalletBalance });

  const handleCurrencyChange = (value: string) => {
    setCurrency(value as "usd" | "ngn");
  };

  const handleGetAllBalance = () => {
    let finalAmount = 0;

    if (cryptoWalletBalance) {
      finalAmount =
        cryptoWalletBalance?.assets[0]?.balance +
        cryptoWalletBalance?.assets[1]?.balance;
    }
    if (data) {
      finalAmount += data.balance;
    }

    return finalAmount;
  };

  // if (true) {
  //   return <AccountSummarySkeleton />;
  // }

  return (
    <Card className=" bg-transparent p-0 md:bg-custom-card border-none text-start shadow-none">
      <CardContent className="flex flex-col gap-4 p-2 md:p-4">
        <CardTitle className="text-lg font-medium">Total Balance</CardTitle>

        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-10 w-full">
            <div className="w-full flex flex-col items-start gap-6 md:flex-row md:items-center justify-between text-custom-white-text">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl md:text-3xl font-semibold">
                    {isBalanceVisible
                      ? currency === "usd"
                        ? FormatService.formatToUSD(handleGetAllBalance() || 0)
                        : FormatService.formatToNaira(data?.balance || 0)
                      : "******"}
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
                  <p className="text-green-400">+1,966 (2.4%)</p>
                ) : (
                  "*****"
                )}
              </div>
            </div>
          </div>
          <Select defaultValue={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-fit min-w-[110px] shadow-none border-none bg-gray-100 px-3">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">
                <span className="flex items-center gap-2">
                  <img
                    className="w-5 h-5"
                    src={flags.usa.flag}
                    alt={flags.usa.alt}
                  />
                  <span>USD</span>
                </span>
              </SelectItem>

              <SelectItem value="ngn">
                <span className="flex items-center gap-2">
                  <img
                    className="w-5 h-5"
                    src={flags.nigeria.flag}
                    alt={flags.nigeria.alt}
                  />
                  <span>NGN</span>
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-6">
          <div className="flex gap-5 sm:gap-10 items-center my-6 md:my-0 md:h-14">
            <div className="flex flex-col gap-1">
              <h2 className=" text-sm">Wallet Balance</h2>
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-2xl font-semibold">
                  {isBalanceVisible
                    ? currency === "usd"
                      ? FormatService.formatToUSD(handleGetAllBalance() || 0)
                      : FormatService.formatToNaira(data?.balance)
                    : "******"}
                </h2>
                <small className="text-green-400">+0.4%</small>
              </div>
            </div>
            <Separator orientation="vertical" className="hidden md:block" />
            <div className="flex flex-col gap-1">
              <h2 className="text-sm">Investment Balance</h2>
              <div className="flex items-center gap-2">
                <h2 className=" text-lg md:text-2xl font-semibold">
                  $30,000.00
                </h2>
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
            <Link to="/dashboard/wallet/withdraw">
              <div className="flex flex-col gap-2 text-primary items-center cursor-pointer">
                <RiDownloadFill className=" w-12 h-12 p-3 text-custom-orange rounded-full bg-custom-orange/20 border border-custom-orange" />{" "}
                <span className="font-semibold text-xs text-custom-orange ">
                  Withdraw
                </span>
              </div>
            </Link>
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
