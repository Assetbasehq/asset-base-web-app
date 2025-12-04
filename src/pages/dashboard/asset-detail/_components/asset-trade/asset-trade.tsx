import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { IAsset } from "@/interfaces/asset.interface";
import AssetBuy from "./_components/asset-buy";
import AssetSell from "./_components/asset-sell";

const tabs = [
  {
    key: "buy",
    label: "Buy",
    component: (asset: IAsset) => <AssetBuy asset={asset} />,
  },
  {
    key: "sell",
    label: "Sell",
    component: (asset: IAsset) => <AssetSell asset={asset} />,
  },
];

export default function AssetTrade({ asset }: { asset: IAsset }) {
  const [active, setActive] = useState("buy");

  return (
    <div>
      <div className="w-full border-b text-custom-white-text ">
        <div className="relative flex w-full bg-custom-light-bg rounded-full px-2 py-1 my-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={cn(
                "flex-1 py-1 sm:py-2 text-center text-sm font-medium relative cursor-pointer"
              )}
            >
              <span className="text-sm relative z-50">{tab.label}</span>
              {active === "buy" && tab.key === "buy" && (
                <motion.div
                  layoutId="pill-underline"
                  className="absolute bottom-0 left-0 right-0 h-full bg-custom-ticker-green rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              {active === "sell" && tab.key === "sell" && (
                <motion.div
                  layoutId="pill-underline"
                  className="absolute bottom-0 left-0 right-0 h-full bg-red-500 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Tab content */}
      <div className="mt-4">
        {tabs.find((tab) => tab.key === active)?.component(asset)}
      </div>
    </div>
  );
}
