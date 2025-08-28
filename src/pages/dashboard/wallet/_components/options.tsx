import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Options() {
  const [activeTab, setActiveTab] = useState("stable");

  const tabs = [
    { key: "fiat", label: "Fiat" },
    { key: "stable", label: "Stable" },
    { key: "stocks", label: "Stocks" },
  ];

  return (
    <Card className="bg-custom-card border-none text-start shadow-none w-full md:w-3/5">
      <CardContent className="p-6">
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
  return <div>Fiat Stable</div>;
}

function StableTab() {
  return <div>Crypto</div>;
}

function StocksTab() {
  return <div>Stocks</div>;
}
