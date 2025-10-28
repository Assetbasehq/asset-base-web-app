import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";

import { useState } from "react";
import { cn } from "@/lib/utils";
import AssetTrade from "./asset-trade";
import AssetFinance from "./asset-finance";

const tabs = [
  { key: "trade", label: "Trade", component: <AssetTrade /> },
  { key: "finance", label: "Finance", component: <AssetFinance /> },
];

export default function AssetTradePanel() {
  const [active, setActive] = useState("trade");

  return (
    <Card className="border-none shadow-none bg-custom-card p-0 px-0">
      <CardContent className="p-0">
        {/* Tabs header */}
        <div className="w-full border-b text-custom-white-text">
          <div className="relative flex gap-6 justify-start w-fit max-w-md">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={cn(
                  "flex-1 py-2 px-4 text-center text-sm font-medium relative",
                  {
                    "text-orange-500": active === tab.key,
                    "text-custom-white-text": active !== tab.key,
                  }
                )}
              >
                <span className="text-lg">{tab.label}</span>
                {active === tab.key && (
                  <motion.div
                    layoutId="underlineeee"
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
