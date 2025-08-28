import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Options() {
  const [activeTab, setActiveTab] = useState("stable");

  const tabs = [
    {
      key: "fiat",
      label: "Fiat",
    },
    {
      key: "stable",
      label: "Stable",
    },
    {
      key: "stocks",
      label: "Stocks",
    },
  ];

  return (
    <Card className="bg-custom-card border-none text-start shadow-none w-full md:w-3/5">
      <CardContent className="p-6">
        <div className="flex items-center justify-center border-b pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md",
                activeTab === tab.key
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "fiat" && <StableTab />}
        {activeTab === "stable" && <FiatTab />}
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
