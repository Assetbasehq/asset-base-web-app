import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import riseIcon from "@/assets/icons/rise-icon.svg";
import { RiBankLine } from "react-icons/ri";
import { flags } from "@/constants/images";
import { useState } from "react";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";

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
    icon: (
      <img
        src={flags.tetherUSDT.flag}
        alt={flags.tetherUSDT.alt}
        className="w-6 md:w-12"
      />
    ),
    label: "Crypto Wallet",
  },
];
export default function SelectWithdrawAccount() {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleProceed = () => {
    if (selectedWallet) {
      navigate(`/dashboard/wallet/withdraw/${selectedWallet.toLowerCase()}`);
    }
  };

  return (
    <div>
      <h2>Select account to withdraw to</h2>
      <div className="flex  items-center gap-4 mt-4 w-full">
        {options.map((option) => (
          <Card
            key={option.name}
            className={cn(`p-4 bg-custom-card w-1/3 cursor-pointer`, {
              "border-custom-orange": selectedWallet === option.name,
            })}
            onClick={() => {
              setSelectedWallet(option.name);
            }}
          >
            <span className="bg-custom-base w-fit p-2 rounded-full">
              {option.icon}
            </span>
            <p>{option.label}</p>
          </Card>
        ))}
      </div>
      <Button
        onClick={handleProceed}
        disabled={!selectedWallet}
        className="btn-primary rounded-full py-6 mt-4 w-full"
      >
        PROCEED TO WITHDRAWAL
      </Button>
    </div>
  );
}
