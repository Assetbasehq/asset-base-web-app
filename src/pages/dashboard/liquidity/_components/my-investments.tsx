import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const liquidities = [
  {
    logo: assetBaseLogo,
    name: "Arik Air",
    description: "Arik Air is a leading airline in Nigeria.",
    positionWorth: "$20,000,000",
    interestWorth: "$12,500",
    priceChange24hrs: "+3.5%",
  },
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
    name: "FSDH",
    description: "FSDH is a leading construction company in Nigeria.",
    positionWorth: "$10,000,000",
    interestWorth: "$7,500",
    priceChange24hrs: "-1.0%",
  },
];

export default function MyInvestments() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 w-full">
      {liquidities.map((liq, index) => (
        <Card
          key={index}
          className="flex flex-col items-start gap-4 text-start border-none shadow-none bg-custom-light-bg                                                                                                                                                           "
        >
          <CardContent className="flex flex-col gap-2 w-full">
            <img src={liq.logo} alt={liq.name} className="w-16 h-16" />

            <div className="flex items-center gap-6 justify-between border-b py-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold max-w-2xs">{liq.name}</h2>
                <p className="text-muted-foreground max-w-lg">
                  {liq.description}
                </p>
              </div>
              <ChevronRight size={45} className="text-custom-orange" />
            </div>

            <div className="flex flex-col gap-1 mt-auto">
              <div className="flex justify-between w-full">
                <p>Position Worth</p>
                <p className={cn("text-green-400")}>{liq.positionWorth}</p>
              </div>
              <div className={cn("flex justify-between w-full")}>
                <p>Interest Worth</p>
                <p
                  className={cn("text-muted-foreground", {
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
