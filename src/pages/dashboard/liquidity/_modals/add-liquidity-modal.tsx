import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import CompanySpecific from "../_components/company-specific";
import AssetBasePool from "../_components/asset-base-pool";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const tabs = [
  {
    key: "COMPANY",
    label: "Company Specific",
    component: <CompanySpecific />,
  },
  {
    key: "ASSETBASE",
    label: "Asset Base Pool",
    component: <AssetBasePool />,
  },
];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddLiquidityModal({
  isOpen,
  onClose,
  onSuccess,
}: ModalProps) {
  const [active, setActive] = useState("COMPANY");

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        // showCloseButton={false}
        className="sm:max-w-lg rounded-2xl p-6 md:p-8 text-start h-[550px]"
      >
        <DialogHeader className="flex flex-col items-start justify-start gap-0">
          <DialogTitle className="flex items-start gap-2 text-xl text-start">
            Add Liquidity
          </DialogTitle>
          <DialogDescription className="text-start text-muted-foreground">
            Invest in high-yield pools and company funding rounds
          </DialogDescription>

          <div className="w-full border-b text-custom-white-text my-2">
            <div className="relative flex gap-6 justify-start w-fit-content max-w-xs">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className={cn(
                    "flex-1 py-2 px-2 text-center text-sm font-medium relative",
                    {
                      "text-orange-500": active === tab.key,
                      "text-custom-white-text": active !== tab.key,
                    }
                  )}
                >
                  <span className="text-sm">{tab.label}</span>
                  {active === tab.key && (
                    <motion.div
                      layoutId="underlineeee"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="mt-4 w-full">
            {tabs.find((tab) => tab.key === active)?.component}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
