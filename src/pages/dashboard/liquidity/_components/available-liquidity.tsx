import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const liquidities = [
  {
    logo: assetBaseLogo,
    name: "Dangote Refinery",
    description: "Dangote Refinery is one of the largest refineries in Africa.",
    positionWorth: "$10,000,000",
    interestWorth: "$5,000",
    priceChange24hrs: "-2.0%",
  },
  {
    logo: assetBaseLogo,
    name: "Zenith Bank",
    description: "Zenith Bank is a leading bank in Nigeria.",
    positionWorth: "$5,000,000",
    interestWorth: "$2,500",
    priceChange24hrs: "+1.5%",
  },
  {
    logo: assetBaseLogo,
    name: "Guinness Peat",
    description:
      "Guinness Peat is a leading manufacturer of peat-based biofuels in Nigeria.",
    positionWorth: "$3,000,000",
    interestWorth: "$1,500",
    priceChange24hrs: "+0.5%",
  },
  {
    logo: assetBaseLogo,
    name: "FSDH",
    description: "FSDH is a leading construction company in Nigeria.",
    positionWorth: "$10,000,000",
    interestWorth: "$7,500",
    priceChange24hrs: "-1.0%",
  },
  {
    logo: assetBaseLogo,
    name: "Arik Air",
    description: "Arik Air is a leading airline in Nigeria.",
    positionWorth: "$20,000,000",
    interestWorth: "$12,500",
    priceChange24hrs: "+3.5%",
  },
];

export default function AvailableLiquidity() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 w-full">
      {liquidities.map((liq, index) => (
        <Card
          key={index}
          className="flex flex-col items-start gap-4 text-start border shadow-none bg-custom-light-bg p-0 "
        >
          <CardContent className="flex flex-col w-full p-4">
            <img src={liq.logo} alt={liq.name} className="w-8 h-8" />

            <div className="flex items-center gap-4 justify-between py-2">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium max-w-2xs">{liq.name}</h2>
                <p className="text-custom-grey max-w-lg text-xs">
                  {liq.description}
                </p>
              </div>
              <ChevronRight size={45} className="text-custom-orange" />
            </div>

            <Separator className="my-2" />

            <div className="flex flex-col gap-1 mt-auto">
              <div className="flex justify-between w-full">
                <p className="text-xs">Position Worth</p>
                <p className={cn("text-green-400 text-xs")}>
                  {liq.positionWorth}
                </p>
              </div>
              <div className={cn("flex justify-between w-full")}>
                <p className="text-xs">Interest Worth</p>
                <p
                  className={cn("text-custom-grey text-xs", {
                    "text-green-400": liq.priceChange24hrs.includes("+"),
                    "text-red-400": liq.priceChange24hrs.includes("-"),
                  })}
                >
                  ({liq.priceChange24hrs}) {liq.interestWorth}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
