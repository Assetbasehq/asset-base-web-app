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
import { useCryptoWallets, useWallet } from "@/hooks/useWallet";
import { useMemo, useState } from "react";
import { FormatService } from "@/services/format-service";
import { flags } from "@/constants/images";
import { useGetPortfolioOverview } from "@/hooks/use-portfolio";

interface TotalBalanceProps {
  currency: "usd" | "ngn";
  setCurrency: (value: "usd" | "ngn") => void;
}

export default function TotalBalance({
  currency,
  setCurrency,
}: TotalBalanceProps) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const {
    data: walletData,
    isLoading: isWalletLoading,
    isError: isWalletError,
  } = useWallet({ currency });

  const {
    data: cryptoWallets,
    isLoading: isCryptoWalletLoading,
    isError: isCryptoError,
  } = useCryptoWallets();

  const {
    data: portfolioOverview,
    isLoading: isPortfolioLoading,
    isError: isPortfolioError,
  } = useGetPortfolioOverview({
    currency,
  });

  console.log({ portfolioOverview });

  const handleCurrencyChange = (value: string) => {
    setCurrency(value as "usd" | "ngn");
  };

  const isLoading = isWalletLoading || isCryptoWalletLoading;

  /**
   * Utility to calculate and format the total balance
   */
  const formattedTotalBalance = useMemo(() => {
    if (!walletData && !cryptoWallets) return 0;

    let total = 0;

    // Add crypto wallet balances
    if (cryptoWallets?.assets?.length) {
      const totalCryptoBalance = cryptoWallets.assets.reduce(
        (sum: number, asset: { balance: string | number }) =>
          sum + Number(asset.balance || 0),
        0
      );

      // console.log({ totalCryptoBalance });

      total += totalCryptoBalance;
    }

    // Add fiat wallet balance
    if (walletData?.balance) {
      total += walletData.balance;
    }

    // Add portfolio balance
    if (portfolioOverview?.balance) {
      total += portfolioOverview.balance;
    }

    // Format based on selected currency
    return FormatService.formatCurrency(total, currency);
  }, [cryptoWallets, walletData, portfolioOverview, currency]);

  const walletBalance = useMemo(() => {
    if (!walletData && !cryptoWallets) return 0;

    let total = 0;

    // Add crypto wallet balances
    if (cryptoWallets?.assets?.length) {
      const totalCryptoBalance = cryptoWallets.assets.reduce(
        (sum: number, asset: { balance: string | number }) =>
          sum + Number(asset.balance || 0),
        0
      );

      // console.log({ totalCryptoBalance });

      total += totalCryptoBalance;
    }

    // Add fiat wallet balance
    if (walletData?.balance) {
      total += walletData?.balance;
    }

    // Format based on selected currency
    return FormatService.formatCurrency(total, currency);
  }, [cryptoWallets, walletData, portfolioOverview, currency]);

  const InvestmentBalance = FormatService.formatCurrency(
    portfolioOverview?.balance,
    currency
  );

  // if (true) {
  //   return <AccountSummarySkeleton />;
  // }

  return (
    <Card className=" bg-transparent p-0 md:bg-custom-card border-none text-start shadow-none">
      <CardContent className="flex flex-col gap-2 md:gap-4 p-2 md:p-4">
        <CardTitle className="text-sm font-medium p-0">Total Balance</CardTitle>

        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col gap-10 w-full">
            <div className="w-full flex flex-col items-start gap-6 md:flex-row md:items-center justify-between text-custom-white-text">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {isLoading ? (
                    <Skeleton className="h-8 w-32 rounded-md" />
                  ) : (
                    <h2 className="text-xl md:text-3xl font-semibold">
                      {isBalanceVisible ? formattedTotalBalance : "******"}
                    </h2>
                  )}
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
                {/* {isLoading ? (
                  <Skeleton className="h-4 w-20 mt-1 rounded-md" />
                ) : isBalanceVisible ? (
                  <p className="text-green-400">+1,966 (2.4%)</p>
                ) : (
                  "*****"
                )} */}
              </div>
            </div>
          </div>
          <Select defaultValue={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-fit min-w-fit shadow-none border-none bg-gray-100 px-3">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent className="min-w-fit">
              <SelectItem value="usd">
                <img
                  className="w-5 h-5"
                  src={flags.usa.flag}
                  alt={flags.usa.alt}
                />
                <span className="hidden md:inline">USD</span>
              </SelectItem>
              <SelectItem value="ngn">
                <img
                  className="w-5 h-5"
                  src={flags.nigeria.flag}
                  alt={flags.nigeria.alt}
                />
                <span className="hidden md:inline">NGN</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex gap-5 sm:gap-10 items-center my-6 md:my-0 md:h-14 md:gap-4 ">
            <div className="flex flex-col gap-1 md:bg-custom-light-bg md:px-4 md:py-2 rounded-md">
              <h2 className=" text-sm font-light">Wallet Balance</h2>
              <div className="flex items-center gap-1">
                <div className="text-md md:text-xl font-medium">
                  {isLoading ? (
                    <Skeleton className="h-6 w-24 rounded-md" />
                  ) : (
                    <h2 className="text-md md:text-xl font-medium">
                      {isBalanceVisible ? walletBalance : "******"}
                    </h2>
                  )}
                </div>
                {/* <small className="text-green-400">+0.4%</small> */}
              </div>
            </div>
            <Separator orientation="vertical" className="hidden md:block" />
            <div className="flex flex-col gap-1  md:bg-custom-light-bg md:px-4 md:py-2 rounded-md">
              <h2 className="text-sm">Investment Balance</h2>
              <div className="flex items-center gap-2">
                {isPortfolioLoading ? (
                  <Skeleton className="h-8 w-28 rounded-md" />
                ) : (
                  <h2 className="text-md md:text-xl font-medium">
                    {isBalanceVisible ? InvestmentBalance : "******"}
                  </h2>
                )}
                {/* <small className="text-green-400">+1.5%</small> */}
              </div>
            </div>
          </div>

          <div className="flex justify-around md:justify-end w-fit gap-4 md:gap-12">
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
            <Link to="/dashboard/wallet/swap">
              <div className="flex flex-col gap-2 items-center cursor-pointer">
                <RiArrowLeftRightLine className=" w-12 h-12 p-3 rounded-full bg-custom-input-mute text-custom-white-text" />{" "}
                <span className="font-semibold text-xs">Convert</span>
              </div>
            </Link>
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
