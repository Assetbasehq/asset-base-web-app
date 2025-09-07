import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import WalletBreadCrumb from "../_components/wallet-bread-crumb";
import { Card } from "@/components/ui/card";
import riseIcon from "@/assets/icons/rise-icon.svg";
import riseLink from "@/assets/images/rise-link.svg";
import cards from "@/assets/images/cards.svg";
import { motion } from "motion/react";
import { useState } from "react";
import { RiBankLine } from "react-icons/ri";

const options = [
  {
    name: "Rise",
    icon: <img src={riseIcon} alt="rise" />,
    label: "Rise wallet",
  },
  {
    name: "Bank",
    icon: <RiBankLine className="w-12 h-12 p-2" />,
    label: "Bank Account",
  },
  {
    name: "Crypto",
    icon: <img src={riseIcon} alt="rise" />,
    label: "Crypto Wallet",
  },
];

export default function Withdraw() {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  return (
    <div className="text-custom-white-text flex flex-col gap-4">
      <WalletBreadCrumb />

      <div className="flex flex-col gap-8 text-start w-full max-w-lg mx-auto">
        <div>
          <h2 className="text-xl font-semibold">Withdraw Funds</h2>
          <p className="text-muted-foreground text-sm">
            Withdraw funds to your bank account
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-muted-foreground">Amount to withdraw</Label>
          <div className="relative">
            <Input className="w-full py-6" placeholder="0" />
            <Button className="absolute text-xs p-2 top-1/2 right-4 -translate-y-1/2 bg-custom-light-bg hover:bg-custom-light-bg text-muted-foreground cursor-pointer">
              max
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            <p>Available: $34,000</p>
          </div>
        </div>
        <Separator />

        {!selectedWallet ? (
          <motion.div
            key="wallet-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2>Select account to withdraw to</h2>
            <div className="flex  items-center gap-4 mt-4 w-full">
              {options.map((option) => (
                <Card
                  key={option.name}
                  className="p-4 bg-custom-input-stroke w-1/3 cursor-pointer"
                  onClick={() => setSelectedWallet(option.name)}
                >
                  <span className="bg-custom-card w-fit p-2 rounded-full">
                    {option.icon}
                  </span>
                  <p>{option.label}</p>
                </Card>
              ))}
            </div>
            <Button
              disabled
              className="btn-primary rounded-full py-6 mt-4 w-full"
            >
              PROCEED TO WITHDRAWAL
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="continue-with-rise"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {selectedWallet === "Rise" && (
              <ContinueWithRiseWallet onBack={() => setSelectedWallet(null)} />
            )}
            {selectedWallet === "Bank" && (
              <ContinueWithBankAccount onBack={() => setSelectedWallet(null)} />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ContinueWithRiseWallet({ onBack }: { onBack: () => void }) {
  const isLinked = false; // Replace with actual logic later

  if (!isLinked) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <img src={riseLink} alt="rise" className="w-28 h-28" />
        <h2 className="text-sm font-medium max-w-sm">
          Your Rise account is not yet linked. Link your account to have access
          to your wallet
        </h2>
        <Button className="btn-primary rounded-full py-6 w-full">
          Link Rise Account
        </Button>
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-custom-orange bg-custom-light-bg cursor-pointer"
          onClick={onBack}
        >
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Continue with Rise Wallet</h2>
      <Button variant="outline" onClick={onBack}>
        Back
      </Button>
    </div>
  );
}

function ContinueWithBankAccount({ onBack }: { onBack: () => void }) {
  const isLinked = false; // Replace with actual logic later

  if (!isLinked) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <img src={cards} alt="rise" className="w-28 h-28" />
        <h2 className="text-sm font-medium max-w-sm">
          You don't have any naira bank account added yet.
        </h2>
        <Button className="btn-primary rounded-full py-6 w-full">
          Add New Bank Account
        </Button>
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-custom-orange bg-custom-light-bg cursor-pointer"
          onClick={onBack}
        >
          Back
        </Button>
      </div>
    );
  }

  const accounts = [];

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Continue with Rise Wallet</h2>
      <Button variant="outline" onClick={onBack}>
        Back
      </Button>
    </div>
  );
}
