import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import AssetTrade from "./asset-trade/asset-trade";
import AssetFinance from "./asset-trade/asset-finance";
import { useState } from "react";

const tabs = [
  { key: "trade", label: "Trade", component: <AssetTrade /> },
  { key: "finance", label: "Finance", component: <AssetFinance /> },
];

export default function AssetTradePanel() {
  const [active, setActive] = useState("trade");

  return (
    <Card className="bg-custom-card border-none shadow-none">
      <CardContent className="">
        {/* Tabs header */}
        <div className="w-full border-b text-custom-white-text">
          <div className="relative flex w-full max-w-md">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`flex-1 py-2 text-center text-sm font-medium relative ${
                  active === tab.key
                    ? "text-orange-500"
                    : "text-custom-white-text"
                }`}
              >
                <span className="text-lg">{tab.label}</span>
                {active === tab.key && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="mt-4">
          {tabs.find((tab) => tab.key === active)?.component}
        </div>
      </CardContent>
    </Card>
  );
}
