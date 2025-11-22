import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCryptoWallets, useWallet } from "@/hooks/useWallet";
import { FormatService } from "@/services/format-service";
import { flags } from "@/constants/images";
import { Skeleton } from "@/components/ui/skeleton";
import { RiErrorWarningLine } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const tabs = [
  { key: "fiat", label: "Fiat" },
  { key: "stable", label: "Stablecoins" },
  // { key: "stocks", label: "Stocks" },
];

export default function Options() {
  const [activeTab, setActiveTab] = useState("fiat");

  return (
    <Card className=" p-0 bg-custom-card border-none text-start shadow-none w-full md:w-3/5">
      <CardContent className="p-2 md:p-4">
        <div className="border-b relative">
          <div className="flex items-center justify-start">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium md:text-lg cursor-pointer",
                  activeTab === tab.key ? "text-custom-orange" : "text-gray-700"
                )}
              >
                {tab.label}

                {/* Underline for active tab */}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-custom-orange rounded"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "fiat" && <FiatTab />}
        {activeTab === "stable" && <StableTab />}
        {activeTab === "stocks" && <StocksTab />}
      </CardContent>
    </Card>
  );
}

function FiatTab() {
  const {
    data: usdWallet,
    isLoading: isUsdWalletLoading,
    isError: isUsdWalletError,
  } = useWallet({ currency: "usd" });

  const usdWalletBalance = FormatService.formatCurrency(
    usdWallet?.balance,
    "usd"
  );

  const {
    data: ngnWallet,
    isLoading: isNgnWalletLoading,
    isError: isNgnWalletError,
  } = useWallet({ currency: "ngn" });

  const ngnWalletBalance = FormatService.formatCurrency(
    ngnWallet?.balance,
    "ngn"
  );

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex items-center justify-between gap-4 border rounded-lg p-2">
        <div className="flex items-center gap-2">
          <img className="w-8 h-8" src={flags.usa.flag} alt={flags.usa.alt} />
          <div className="flex flex-col">
            <span className="font-medium">USD</span>
            <span className="font-light text-sm">US Dollar Wallet</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isUsdWalletLoading ? (
            <Skeleton className="w-26 h-8" />
          ) : (
            <span>{usdWalletBalance}</span>
          )}
          {isUsdWalletError && (
            <Tooltip>
              <TooltipTrigger asChild>
                <RiErrorWarningLine className="text-custom-ticker-red" />
              </TooltipTrigger>

              <TooltipContent>
                <p>Error fetching USD balance</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 border rounded-lg p-2">
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8"
            src={flags.nigeria.flag}
            alt={flags.nigeria.alt}
          />
          <div className="flex flex-col">
            <span className="font-medium">NGN</span>
            <span className=" font-light text-sm">Naira Wallet</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isNgnWalletLoading ? (
            <Skeleton className="w-26 h-8" />
          ) : (
            <span>{ngnWalletBalance}</span>
          )}
          {isNgnWalletError && (
            <Tooltip>
              <TooltipTrigger asChild>
                <RiErrorWarningLine className="text-custom-ticker-red" />
              </TooltipTrigger>

              <TooltipContent>
                <p>Error fetching NGN balance</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}

function StableTab() {
  const {
    data: cryptoWallets,
    isLoading: isCryptoWalletLoading,
    isError: isCryptoError,
  } = useCryptoWallets();

  return (
    <div className="flex flex-col gap-4 py-4">
      {isCryptoWalletLoading && !isCryptoError ? (
        <Skeleton className="w-26 h-8" />
      ) : (
        cryptoWallets?.assets.map((asset) => (
          <div
            key={asset.id}
            className="flex items-center justify-between gap-4 border rounded-lg p-2"
          >
            <div className="flex items-center gap-2">
              <img className="w-8 h-8" src={asset.logoUrl} alt={asset.name} />
              <div className="flex flex-col">
                <span className="font-medium">{asset.name}</span>
                <span className="font-light text-sm">{asset.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span>
                {FormatService.formatCurrency(Number(asset.balance), "usd")}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function StocksTab() {
  return <div>Stocks</div>;
}
