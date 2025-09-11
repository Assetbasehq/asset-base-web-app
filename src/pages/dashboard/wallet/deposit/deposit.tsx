import { Button } from "@/components/ui/button";
import WalletBreadCrumb from "../_components/wallet-bread-crumb";
import { flags, images } from "@/constants/images";
import AnimatedWrapper from "@/components/animations/animated-wrapper";
import { Card } from "@/components/ui/card";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  useGetCryptoBalance,
  useRequestCryptoDeposit,
} from "@/hooks/useWallet";
import { RiCheckLine, RiFileCopyLine } from "react-icons/ri";
import CryptoDeposit from "./crypto/crypto-deposit";

const options = [
  {
    name: "USD",
    icon: (
      <img src={flags.usa.flag} alt={flags.usa.alt} className="w-6 md:w-12" />
    ),
  },
  {
    name: "Naira",
    icon: (
      <img
        src={flags.nigeria.flag}
        alt={flags.nigeria.alt}
        className="w-6 md:w-12"
      />
    ),
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
  },
];

type WalletToFundOptions = "USD" | "NAIRA" | "CRYPTO";
interface OptionItem {
  name: string;
  logo: ReactNode; // or `ReactNode` if you're using React Icons or components
}

const walletOptionMap: Record<WalletToFundOptions, OptionItem[]> = {
  USD: [
    { name: "PayPal", logo: <img src={flags.usa.flag} alt="" /> },
    { name: "Stripe", logo: "/icons/stripe.svg" },
    { name: "Bank Transfer", logo: "/icons/bank.svg" },
  ],
  NAIRA: [
    {
      name: "GTBank",
      logo: <img src={flags.tetherUSDT.flag} alt={flags.tetherUSDT.alt} />,
    },
    {
      name: "Zenith Bank",
      logo: <img src={flags.tetherUSDT.flag} alt={flags.tetherUSDT.alt} />,
    },
    {
      name: "Access Bank",
      logo: <img src={flags.tetherUSDT.flag} alt={flags.tetherUSDT.alt} />,
    },
  ],
  CRYPTO: [
    {
      name: "USDT",
      logo: <img src={flags.tetherUSDT.flag} alt={flags.tetherUSDT.alt} />,
    },
    {
      name: "USDC",
      logo: <img src={flags.tetherUSDT.flag} alt={flags.tetherUSDT.alt} />,
    },
    {
      name: "cNGN",
      logo: <img src={flags.tetherUSDT.flag} alt={flags.tetherUSDT.alt} />,
    },
  ],
};

export default function Deposit() {
  // const [walletToFund, setWalletToFund] = useState<WalletToFundOptions | null>(
  //   "CRYPTO"
  // );
  // const [selectedOption, setSelectedOption] = useState<string | null>("USDT");
  // const [stage, setStage] = useState(2);
  const [walletToFund, setWalletToFund] = useState<WalletToFundOptions | null>(
    null
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [stage, setStage] = useState(1);

  const goBack = () => setStage(stage - 1);

  return (
    <div className="text-custom-white-text flex flex-col gap-4">
      <WalletBreadCrumb />

      <div className="flex flex-col gap-8 text-start w-full max-w-md mx-auto">
        <div>
          <h2 className="text-xl font-semibold">Deposit to wallet</h2>
          <p className="text-muted-foreground text-sm">
            Fund your wallet to start trading
          </p>
        </div>

        <AnimatedWrapper animationKey={String(stage)}>
          {/* Stage 1  */}
          {stage === 1 && (
            <div>
              <div>
                <h2>Wallet to fund</h2>
                <div className="flex items-stretch gap-4 mt-1 w-full">
                  {options.map((option) => (
                    <Card
                      key={option.name}
                      className={cn(
                        `p-2 md:p-4 border-2 bg-custon-input-fill border-custom-input-stroke w-1/3 cursor-pointer`,
                        {
                          "border-custom-orange":
                            option.name.toUpperCase() === walletToFund,
                        }
                      )}
                      onClick={() => {
                        setWalletToFund(
                          option.name.toUpperCase() as WalletToFundOptions
                        );
                        setSelectedOption(null);
                      }}
                    >
                      <span className="bg-custom-card w-fit p-2 rounded-full">
                        {option.icon}
                      </span>
                      <p className="text-xs md:text-sm font-semibold mt-auto">
                        {option.name}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator className="my-4 p-0.25 rounded-full" />

              <div>
                <h2 className="text-sm md:text-">Select Currency to fund</h2>
                <div className="flex items-center gap-4 mt-1 w-full">
                  <Select
                    value={selectedOption || ""}
                    onValueChange={(value) => {
                      setSelectedOption(value);
                    }}
                  >
                    <SelectTrigger className="w-full py-6 rounded">
                      <SelectValue
                        placeholder={
                          walletToFund
                            ? walletOptionMap[walletToFund][0].name
                            : "Please select a destination wallet"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {walletToFund &&
                        walletOptionMap[walletToFund].map((option) => (
                          <SelectItem key={option.name} value={option.name}>
                            {option.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                disabled={!selectedOption}
                onClick={() => setStage(2)}
                className="btn-primary rounded-full py-4 md:py-6 mt-6 w-full text-xs"
              >
                PROCEED TO DEPOSIT
              </Button>
            </div>
          )}

          {/* Stage 2  */}
          {stage === 2 && walletToFund === "CRYPTO" && (
            <CryptoDeposit goBack={goBack} />
          )}
        </AnimatedWrapper>
      </div>
    </div>
  );
}

// function FundWithCrypto({ goBack }: { goBack: () => void }) {
//   const [amountToFund, setAmountToFund] = useState<number | null>(null);

//   const handleAmountChange = (amount: string) => {
//     const amountNumber = Number(amount);
//     if (!isNaN(amountNumber)) setAmountToFund(amountNumber);
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="flex flex-col gap-1">
//         <Label className="text-custom-grey text-xs md:text-sm">
//           Enter amount to fund
//         </Label>
//         <Input
//           onChange={(e) => handleAmountChange(e.target.value)}
//           type="text"
//           className="py-6 w-full"
//           placeholder="10"
//         />
//       </div>

//       <Button
//         variant="outline"
//         className="flex justify-between bg-custom-base w-full rounded-full !py-0"
//       >
//         <small className="text-custom-grey">$1</small>
//         <small>$1,576.03</small>
//       </Button>

//       <div className="flex flex-col gap-2">
//         <p className="text-custom-grey text-xs md:text-sm">
//           Fund to crypto wallet
//         </p>
//         <Button
//           disabled={!amountToFund}
//           className="py-6 md:py-8 bg-custom-light-bg flex justify-start text-custom-grey hover:bg-custom-light-bg/80 cursor-pointer"
//         >
//           <img src={images.assetBase.logo} alt={images.assetBase.alt} /> Send
//           directly to an external address
//         </Button>
//         <Button
//           disabled={!amountToFund}
//           className="py-6 md:py-8 bg-custom-light-bg flex justify-start text-custom-grey hover:bg-custom-light-bg/80 cursor-pointer"
//         >
//           <img src={images.assetBase.logo} alt={images.assetBase.alt} /> Send to
//           my connected wallet
//         </Button>
//       </div>

//       <Button
//         variant="ghost"
//         className="text-muted-foreground hover:text-custom-orange bg-custom-light-bg cursor-pointer"
//         onClick={goBack}
//       >
//         Back
//       </Button>
//     </div>
//   );
// }
