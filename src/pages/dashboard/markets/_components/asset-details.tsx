import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import { ArrowLeft } from "lucide-react";
import AssetInfo from "./asset-info";
import AssetTabs from "./asset-tabs";
import AssetTradePanel from "./asset-trade-panel";
import AssetOrders from "./asset-orders";
import { calculateRaisePercentage, cn } from "@/lib/utils";
import { RiBookmarkLine, RiFlashlightFill, RiShareLine } from "react-icons/ri";
import AssetAbout from "./asset-tabs/asset-about";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { motion } from "motion/react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

interface Asset {
  id: string;
  name: string;
  acronym: string;
  logo: string;
  amount_raised: string;
  goal: string;
  round_closes: string;
  price: string;
  price_change_24hrs: string;
}

interface InvestFormData {
  quantity: number;
  currency: string;
  estimatedAmount: number;
}

const demoAsset: Asset = {
  id: "1",
  name: "Landmark Realty Limited",
  acronym: "LARL",
  logo: assetBaseLogo,
  amount_raised: "$23,500",
  goal: "$1,200,000",
  round_closes: "15 days",
  price: "$3400.00",
  price_change_24hrs: "+2.33%",
};

export default function AssetDetails() {
  const { assetId } = useParams<{ assetId: string }>();
  const navigate = useNavigate();

  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const formattedSegments = segments.map((seg) =>
    seg.toLowerCase() === "dashboard" ? "home" : seg
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Button
          onClick={() => navigate(-1)}
          className=" bg-custom-light-bg text-custom-white-text flex gap-2"
        >
          <ArrowLeft />
          Back
        </Button>

        {/* <div className=" bg-custom-light-bg text-custom-white px-4 py-2 rounded-sm font-semibold">
          Home / Markets /{" "}
          <span className="text-custom-orange">
            {assetId?.toUpperCase() || "LARL"}
          </span>
        </div> */}

        <div className="flex items-center px-2 py-1 bg-custom-light-bg text-custom-white rounded-sm">
          {formattedSegments.map((seg, idx) => {
            const isLast = idx === formattedSegments.length - 1;
            const to = "/" + segments.slice(0, idx + 1).join("/");

            return (
              <div key={idx} className="flex items-center gap-2 ">
                <Link
                  to={to}
                  className={cn(
                    "capitalize px-1 py-1 rounded text-sm",
                    isLast
                      ? "text-custom-orange font-medium uppercase"
                      : "hover:text-custom-white-text"
                  )}
                >
                  {seg}
                </Link>
                {!isLast && <span className="text-muted-foreground">/</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col gap-4 lg:w-3/5">
          <AssetInfo asset={demoAsset} />
          <div className="hidden lg:block">
            <AssetTabs />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-2/5 bg-custom-card rounded-xl p-6">
          <AssetTradePanel />
          <AssetOrders />
        </div>
        <div className="block lg:hidden">
          <AssetTabs />
        </div>
      </div>
    </div>
  );
}

const sampleImages = [
  {
    id: 1,
    name: "Mountain View",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    alt: "Beautiful mountain landscape with sunrise",
  },
  {
    id: 2,
    name: "City Skyline",
    url: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    alt: "City skyline during sunset",
  },
  {
    id: 3,
    name: "Forest Path",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3",
    alt: "Pathway surrounded by lush forest",
  },
  {
    id: 4,
    name: "Ocean Waves",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    alt: "Waves crashing on the beach",
  },
  {
    id: 5,
    name: "Desert Dunes",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    alt: "Golden desert dunes under a clear sky",
  },
];

const tabs = [
  { key: "about", label: "About", component: <AssetAbout /> },
  { key: "discussions", label: "Discussions", component: <AssetAbout /> },
  { key: "updates", label: "Updates", component: <AssetAbout /> },
  { key: "Feedback", label: "Feedback", component: <AssetAbout /> },
];

export function AssetDetailsInvest() {
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false); // Modal state
  const { assetId } = useParams<{ assetId: string }>();
  const navigate = useNavigate();

  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const formattedSegments = segments.map((seg) =>
    seg.toLowerCase() === "dashboard" ? "home" : seg
  );

  const raisePercentage = calculateRaisePercentage(236415, 150000);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Button
          onClick={() => navigate(-1)}
          className=" bg-custom-light-bg text-custom-white-text flex gap-2"
        >
          <ArrowLeft />
          Back Home
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 ">
            <img src={assetBaseLogo} alt="" className="w-12 h-12" />
            <div className="text-start flex flex-col">
              <h2 className="font-semibold text-custom-white">
                Landmark Realty Limited
              </h2>
              <small className="text-xs md:text-sm text-custom-grey">
                World famous hospitable company from Nigeria
              </small>
            </div>
          </div>
          <div className="flex gap-2 items-center w-full">
            <small className="capitalize bg-custom-input-stroke text-custom-white px-2 rounded">
              Private Business
            </small>
            <small className="capitalize bg-custom-input-stroke text-custom-white px-2 rounded">
              Nigeria
            </small>
          </div>
        </div>
        <div className="flex items-center gap-4 mb-2">
          <RiShareLine className="w-9 h-9 bg-custom-input-stroke text-custom-grey p-2 rounded-full" />
          <RiBookmarkLine className="w-9 h-9 bg-custom-input-stroke text-custom-grey p-2 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-3/5">
          <div className="my-2">
            <img
              src={sampleImages[0].url}
              alt=""
              className="h-62 w-full rounded-2xl"
            />
            <div className="flex justify-center gap-4 mt-4">
              {sampleImages.map((image) => (
                <div key={image.id} className="w-8 h-4 md:w-40 md:h-20">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>
          <Card className="border-none shadow-none bg-transparent p-0 px-0">
            <CardContent className="p-0">
              {/* Tabs header */}
              <div className="w-full border-b text-custom-white-text">
                <div className="relative flex gap-6 justify-start w-fit max-w-md">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActive(tab.key)}
                      className={cn(
                        "flex-1 py-1 text-center text-xs font-medium relative cursor-pointer",
                        {
                          "text-orange-500": active === tab.key,
                          "text-custom-grey": active !== tab.key,
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
              <div className="mt-4">
                {tabs.find((tab) => tab.key === active)?.component}
              </div>
            </CardContent>
          </Card>

          <div className="text-start my-4">
            <h2 className="text-sm md:text-lg text-custom-white font-semibold">
              About
            </h2>
            <p>
              Founded in 1997 and headquartered in Lagos, Landmark Africa has
              transformed the hospitality landscape in Nigeria through an
              integrated ecosystem of leisure, real estate, and lifestyle
              assets. The company currently manages over 130,000 square meters
              of premium mixed-use property, including beaches, event centres,
              restaurants, retail hubs, residences, and office spaces. With over
              4 million visitors annually and a loyal clientele base of Fortune
              500 firms, Landmark Africa has become the benchmark for premium
              lifestyle destinations in West Africa. Its visionary leadership,
              proven business model, and commitment to innovation and
              sustainability make this a compelling investment opportunity.
              Landmark seeks to replicate and expand its ecosystem by deploying
              new capital across strategic locations in Nigeria and neighbouring
              countries.
            </p>
          </div>
        </div>

        <Card className="border-none shadow-none p-0 px-0 bg-custom-card text-custom-white h-fit md:w-2/3 md:mx-6">
          <CardContent className="p-4 text-start flex flex-col gap-2">
            <p className="text-xl font-semibold">$234,000</p>
            <Progress
              value={raisePercentage}
              className="w-full bg-custom-input-stroke [&>div]:bg-custom-orange h-1.5"
            />
            <small className="font-semibold text-custom-orange flex items-center gap-1">
              <RiFlashlightFill className="text-custom-orange" />
              {raisePercentage}% raised
            </small>
            <div className="bg-custom-light-bg px-4 py-2 rounded-xl flex justify-between">
              <small className="text-custom-grey">Price per share</small>
              <small className="text-custom-grey">$500</small>
            </div>
            <div className="px-4 py-2 flex justify-between">
              <small className="text-custom-grey">Available Shares</small>
              <small className="text-custom-grey">1,200</small>
            </div>
            <div className="bg-custom-light-bg px-4 py-2 rounded-xl flex justify-between">
              <small className="text-custom-grey">Raising goal</small>
              <small className="text-custom-grey">$1,200,000</small>
            </div>

            <Button
              onClick={() => setOpen(true)}
              className="btn-primary py-4 md:py-6 mt-4 rounded-full"
            >
              Invest Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <AssetInvestModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export function AssetInvestModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [active, setActive] = useState("about");

  const { register, handleSubmit, setValue, watch } = useForm<InvestFormData>({
    defaultValues: {
      quantity: 1,
      currency: "USD",
      estimatedAmount: 500,
    },
  });

  const quantity = watch("quantity");
  const estimatedAmount = watch("estimatedAmount");
  const currency = watch("currency");

  // Simulate calculation for estimated amount
  const calculateEstimatedAmount = (quantity: number) => {
    return quantity * 500; // $500 per share
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qty = Number(e.target.value) || 0;
    setValue("quantity", qty);
    setValue("estimatedAmount", calculateEstimatedAmount(qty));
  };

  const onSubmit = (data: InvestFormData) => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-col gap-2">
      {/* Existing UI */}

      <Card className="border-none shadow-none p-0 px-0 bg-custom-card text-custom-white h-fit md:w-2/3 md:mx-6">
        <CardContent className="p-4 text-start flex flex-col gap-2">
          <p className="text-xl font-semibold">$234,000</p>
          <Progress
            value={calculateRaisePercentage(236415, 150000)}
            className="w-full bg-custom-input-stroke [&>div]:bg-custom-orange h-1.5"
          />
          <small className="font-semibold text-custom-orange flex items-center gap-1">
            <RiFlashlightFill className="text-custom-orange" />
            {calculateRaisePercentage(236415, 150000)}% raised
          </small>
          <div className="bg-custom-light-bg px-4 py-2 rounded-xl flex justify-between">
            <small className="text-custom-grey">Price per share</small>
            <small className="text-custom-grey">$500</small>
          </div>
          <div className="px-4 py-2 flex justify-between">
            <small className="text-custom-grey">Available Shares</small>
            <small className="text-custom-grey">1,200</small>
          </div>
          <div className="bg-custom-light-bg px-4 py-2 rounded-xl flex justify-between">
            <small className="text-custom-grey">Raising goal</small>
            <small className="text-custom-grey">$1,200,000</small>
          </div>

          <Button
            className="btn-primary py-4 md:py-6 mt-4 rounded-full"
            onClick={() => onClose()}
          >
            Invest Now
          </Button>
        </CardContent>
      </Card>

      {/* Invest Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          showCloseButton={false}
          className="max-w-md bg-custom-card text-custom-white rounded-2xl"
        >
          <DialogHeader className="text-start flex- gap-0">
            <DialogTitle className="text-lg font-bold">
              Invest in Asset
            </DialogTitle>
            <DialogDescription className="text-custom-grey">
              Please type in the quantity of shares you want to purchase.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Quantity Input */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-custom-grey">
                Quantity of Shares
              </label>
              <Input
                type="number"
                min={1}
                {...register("quantity")}
                onChange={handleQuantityChange}
                className="bg-custom-light-bg border-custom-input-stroke text-custom-white py-6"
                placeholder="Enter number of shares"
              />
            </div>

            {/* Estimated Amount with Currency Select */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-custom-grey">
                Estimated Amount
              </label>
              <div className="relative">
                <Input
                  type="number"
                  readOnly
                  value={estimatedAmount}
                  className="bg-custom-light-bg border-custom-input-stroke text-custom-white pr-20 py-6"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Select
                    value={currency}
                    onValueChange={(value) => setValue("currency", value)}
                    defaultValue="cNGN"
                  >
                    <SelectTrigger className="w-22 !h-8 mr-2 rounded-full bg-custom-input-stroke text-custom-white py-0">
                      <SelectValue placeholder="cNGN" />
                    </SelectTrigger>
                    <SelectContent className="bg-custom-card">
                      <SelectItem value="cNGN">cNGN</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <DialogFooter>
              <Button
                type="submit"
                className="btn-primary w-full rounded-full py-4"
              >
                Invest
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
