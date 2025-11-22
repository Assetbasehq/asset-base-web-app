import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const tabs = [
  { key: "buy", label: "Buy", component: <BuyWindow /> },
  { key: "sell", label: "Sell", component: <SellWindow /> },
];

export default function AssetTrade() {
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
        {tabs.find((tab) => tab.key === active)?.component}
      </div>
    </div>
  );
}

function BuyWindow() {
  return (
    <div>
      <form action="" className="flex flex-col gap-4">
        <div>
          <Label className="text-muted-foreground text-sm">Order Type</Label>
          <Input className="w-full py-6" />
        </div>
        <div>
          <Label className="text-muted-foreground text-sm">
            Price per Share
          </Label>
          <Input className="w-full py-6" />
        </div>
        <div>
          <Label className="text-muted-foreground text-sm">Quantity</Label>
          <Input className="w-full py-6" />
        </div>
        <Button
          disabled
          className="w-full py-6 rounded-full text-custom-white bg-custom-ticker-green hover:bg-custom-ticker-green/90"
        >
          Buy Code
        </Button>
      </form>
    </div>
  );
}

function SellWindow() {
  return (
    <div>
      <form action="" className="flex flex-col gap-4">
        <div>
          <Label className="text-muted-foreground text-sm">Order Type</Label>
          <Input className="w-full py-6" />
        </div>
        <div>
          <Label className="text-muted-foreground text-sm">
            Price per Share
          </Label>
          <Input className="w-full py-6" />
        </div>
        <div>
          <Label className="text-muted-foreground text-sm">Quantity</Label>
          <Input className="w-full py-6" />
        </div>
        <Button
          disabled
          className="w-full py-6 rounded-full text-custom-white bg-custom-ticker-red hover:bg-custom-ticker-red"
        >
          Sell Code
        </Button>
      </form>
    </div>
  );
}
