import { Button } from "@/components/ui/button";
import { useLocation, useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { calculateRaisePercentage, cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { motion } from "motion/react";
import { Progress } from "@/components/ui/progress";
import { RiBookmarkLine, RiFlashlightFill, RiShareLine } from "react-icons/ri";
import AboutLaunchpad from "./_components/about-launchpad";
import { useAsset } from "@/hooks/useAssets";
import { LaunchpadInvestModal } from "./_modals/launchpad-invest-modal";
import ConfirmationPinModal from "./_modals/confirmation-pin-modal";
import SuccessModal from "./_modals/success-modal";
import { useWallet } from "@/hooks/useWallet";
import { formatService } from "@/services/format-service";

// Primary Market
const tabs = [
  { key: "about", label: "About", component: <AboutLaunchpad /> },
  { key: "discussions", label: "Discussions", component: <AboutLaunchpad /> },
  { key: "updates", label: "Updates", component: <AboutLaunchpad /> },
  { key: "Feedback", label: "Feedback", component: <AboutLaunchpad /> },
];

export default function LaunchpadDetail() {
  const [numberOfShares, setNumberOfShares] = useState(0);
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false); // Modal state
  const [isConfirmationPinModalOpen, setIsConfirmationPinModalOpen] =
    useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { asset_symbol } = useParams<{ asset_symbol: string }>();
  const navigate = useNavigate();

  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const {
    data: asset,
    isLoading,
    isError,
  } = useAsset({ asset_symbol: asset_symbol as string });

  const {
    data: walletData,
    isLoading: isLoadingWallet,
    isError: isErrorWallet,
  } = useWallet({ currency: asset?.currency || "usd" });

  console.log({ walletData });

  const formattedSegments = segments.map((seg) =>
    seg.toLowerCase() === "dashboard" ? "home" : seg
  );

  const raisePercentage = calculateRaisePercentage(
    asset?.number_of_shares,
    asset?.available_shares
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  if (!asset) return <p>Asset not found</p>;

  if (asset && asset.trading_type === "secondary") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="bg-custom-card border-none shadow-none max-w-md w-full">
          <CardContent className="p-6 flex flex-col gap-4 text-center">
            <div className="flex flex-col items-center gap-2 justify-center">
              {/* <RiFlashlightFill className="text-custom-orange w-10 h-10" /> */}
              <img
                src={asset.logo}
                alt={asset.asset_description}
                className="h-12 rounded"
              />
              <h2 className=" font-semibold text-xl">{asset.asset_symbol}</h2>
            </div>

            <h2 className="text-lg font-semibold text-custom-white">
              Trading on the Secondary Market
            </h2>

            <p className="text-sm text-custom-grey">
              This asset is currently trading on the secondary market. You can
              buy or sell shares at the current market price and also create
              limit orders.
            </p>

            <Button
              onClick={() => navigate(`/dashboard/assets/${asset.slug}`)}
              className="btn-primary py-5 rounded-full mt-2"
            >
              Go to Market
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <Button
          onClick={() => navigate(-1)}
          className=" bg-custom-light-bg hover:bg-custom-light-bg/80 text-custom-white-text flex gap-2 cursor-pointer"
        >
          <ArrowLeft />
          Back
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 ">
            <img src={asset?.logo} alt="" className="w-12 h-12" />
            <div className="text-start flex flex-col">
              <h2 className="font-semibold text-custom-white">
                {asset?.asset_name}
              </h2>
              <small className="text-xs md:text-sm text-custom-grey capitalize">
                {asset?.asset_description}
              </small>
            </div>
          </div>
          <div className="flex gap-2 items-center w-full">
            <small className="capitalize bg-custom-input-stroke text-custom-white px-2 rounded">
              {asset?.category}
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
              src={asset?.image_urls[0]}
              alt=""
              className="h-62 w-full rounded-2xl"
            />
            <div className="flex justify-center gap-4 mt-4">
              {asset?.image_urls.map((image) => (
                <div key={image} className="w-8 h-4 md:w-40 md:h-20">
                  <img
                    src={image}
                    alt={image}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>
          <Card className="border-none shadow-none bg-transparent p-0 px-0">
            <CardContent className="p-0">
              {/* Tabs header */}
              <div className="w-full border-b text-custom-white-text my-4">
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
            <p className="text-muted-foreground">
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

        <Card className="border-none shadow-none p-0 px-0 bg-custom-card text-custom-white h-fit md:w-2/3">
          <CardContent className="p-4 text-start flex flex-col gap-2">
            <p className="text-xl font-semibold">
              {formatService.formatCurrency(
                asset?.price_per_share,
                asset?.currency
              )}
            </p>
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
              <small className="text-custom-grey">
                {formatService.formatCurrency(
                  asset?.price_per_share,
                  asset?.currency
                )}
              </small>
            </div>
            <div className="px-4 py-2 flex justify-between">
              <small className="text-custom-grey">Available Shares</small>
              <small className="text-custom-grey">
                {formatService.formatWithCommas(asset?.available_shares)}
              </small>
            </div>
            <div className="bg-custom-light-bg px-4 py-2 rounded-xl flex justify-between">
              <small className="text-custom-grey">Raising goal</small>
              <small className="text-custom-grey">
                {formatService.formatCurrency(
                  asset?.price_per_share * asset?.number_of_shares,
                  asset?.currency
                )}
              </small>
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

      <LaunchpadInvestModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setOpen(true);
          setIsConfirmationPinModalOpen(true);
        }}
        asset={asset}
        setNumberOfShares={setNumberOfShares}
        walletBalance={walletData?.balance || 0}
      />

      <ConfirmationPinModal
        isOpen={isConfirmationPinModalOpen}
        onClose={() => setIsConfirmationPinModalOpen(false)}
        onSuccess={() => {
          setIsConfirmationPinModalOpen(false);
          setOpen(false);
          setIsSuccessModalOpen(true);
        }}
        isLoading={isLoading}
        asset={asset}
        numberOfShares={numberOfShares}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          setNumberOfShares(0);
        }}
        numberOfShares={numberOfShares}
        asset={asset}
      />
    </div>
  );
}
