import React, { useState } from "react";
import AssetOpenOrders from "./asset-orders/asset-open-orders";
import AssetOrderHistory from "./asset-orders/asset-order-history";
import { motion } from "motion/react";

const tabs = [
  { key: "open-orders", label: "Open Orders", component: <AssetOpenOrders /> },
  {
    key: "order-history",
    label: "Order History",
    component: <AssetOrderHistory />,
  },
];

export default function AssetOrders() {
  const [active, setActive] = useState("open-orders");

  return (
    <div className="bg-custom-light-bg rounded-xl p-4">
      {/* Tabs header */}
      <div className="w-full border-b text-custom-white-text">
        <div className="relative flex w-fit-content max-w-xs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`flex-1 py-2 text-center text-sm font-medium relative cursor-pointer ${
                active === tab.key
                  ? "text-orange-500"
                  : "text-custom-white-text"
              }`}
            >
              <span className="text-sm">{tab.label}</span>
              {active === tab.key && (
                <motion.div
                  layoutId="underline-4"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-4 ">
        {tabs.find((tab) => tab.key === active)?.component}
      </div>
    </div>
  );
}
