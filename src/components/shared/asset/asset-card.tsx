import type { IAsset } from "@/interfaces/asset.interface";
import { Progress } from "@/components/ui/progress";
import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import {
  calculateRaisePercentage,
  cn,
  formatNumber,
  formatUSD,
} from "@/lib/utils";
import { RiBookmarkLine, RiFlashlightFill, RiShareLine } from "react-icons/ri";
import { Link } from "react-router";
import { Separator } from "@/components/ui/separator";
import { FormatService } from "@/services/format-service";
import { Card, CardContent } from "@/components/ui/card";
import cardCover from "@/assets/images/card-cover.png";
import {
  useAddToWatchlist,
  useRemoveFromWatchlist,
} from "@/hooks/useWatchlist";

interface Props {
  asset: IAsset;
  variant?: "card" | "compact" | "card-detailed";
  // userWatchlist?: IAsset[];
  userWatchlist?: { asset: IAsset }[];
}

export default function AssetCard({
  asset,
  userWatchlist = [],
  variant = "card",
}: Props) {
  const raisePercentage = calculateRaisePercentage(
    asset?.number_of_shares,
    asset?.available_shares
  );

  const isInWatchlist = userWatchlist?.some(
    (item) => item.asset.id === asset.id
  );

  const addToWatchlistMutation = useAddToWatchlist({ asset_id: asset.id });
  const removeFromWatchlistMutation = useRemoveFromWatchlist({
    asset_id: asset.id,
  });

  const handleAddToWatchlist = async () => {
    if (isInWatchlist) {
      await removeFromWatchlistMutation.mutateAsync();
      // console.log("removed");
      return;
    }

    await addToWatchlistMutation.mutateAsync();
  };

  if (variant === "compact") {
    return (
      <Link
        key={asset.id}
        to={`/dashboard/markets/${asset?.slug}`}
        className="cursor-pointer"
      >
        <Card className="p-0 border-none shadwo-none">
          <CardContent className="bg-custom-light-bg text-custom-white flex items-center justify-between rounded-xl p-4 gap-4">
            <div className="text-start">
              <div className="flex items-center gap-3">
                <img
                  src={asset?.image_urls[0]}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="font-semibold">{asset?.asset_symbol}</h2>
                  <small className="text-sm">
                    {FormatService.formatName(asset?.asset_name)}
                  </small>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex gap-1 items-center">
                <RiFlashlightFill className="text-custom-orange" />
                <small className="font-semibold text-custom-orange">
                  {raisePercentage}% raised
                </small>
              </div>
              <small className="font-semibold">
                {formatNumber(asset?.available_shares)} available
              </small>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  if (variant === "card-detailed") {
    return (
      <div key={asset.id} className="cursor-pointer">
        <div className="bg-custom-light-bg text-custom-white flex flex-col gap-3 items-start rounded-lg p-2 min-w-66 sm:min-w-96 shadow-lg">
          <div className="relative overflow-hidden flex flex-col gap-4 items-start text-start w-full p-2 rounded-lg bg-[#93939417]">
            <img
              src={assetBaseLogo}
              alt=""
              className=" absolute w-35 -top-3 -right-20 opacity-10"
            />
            <div className="flex items-center gap-2">
              <img
                src={asset?.image_urls[0]}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <h2 className="font-medium">{asset?.asset_symbol}</h2>
                <small>{asset?.asset_name}</small>
              </div>
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="flex justify-between items-center w-full">
                <small>Price per share</small>
                <small className="font-semibold">
                  {formatUSD(asset?.price_per_share)}
                </small>
              </div>
              <div className="flex justify-between items-center w-full">
                <small>Funding round closes</small>
                <small className="font-semibold">
                  In <span className="font-bold">15 days</span>
                </small>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start w-full pb-1">
            <Progress
              value={raisePercentage}
              className="w-full bg-custom-input-stroke [&>div]:bg-custom-orange"
            />
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-1 items-center text-custom-orange">
                <RiFlashlightFill className="text-custom-orange" />
                <small>{raisePercentage}% raised</small>
              </div>
              <small className="font-semibold text-custom-grey-text">
                {formatNumber(asset?.available_shares)} available
              </small>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-start w-full">
            <div className="flex justify-between items-center w-full">
              <p className="text-sm text-custom-grey">Category</p>
              <small className="capitalize bg-custom-input-stroke text-custom-grey px-2 rounded">
                {asset?.category}
              </small>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-sm text-custom-grey">Location</p>
              <p className="capitalize text-custom-grey px-2 rounded">
                {asset?.iso_country_code === "NG" ? "Nigeria" : "Ghana"}
              </p>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-4 mb-2">
              <RiShareLine className="w-8 h-8 bg-custom-input-stroke text-custom-grey p-2 rounded-full" />
              <RiBookmarkLine
                onClick={handleAddToWatchlist}
                className={cn(
                  "w-8 h-8 p-2 rounded-full cursor-pointer transition-colors",
                  isInWatchlist
                    ? "bg-custom-orange text-white"
                    : "bg-custom-input-stroke text-custom-grey"
                )}
              />
            </div>
            <Link
              to={`/dashboard/markets/${asset.slug}`}
              className="text-xs text-custom-orange font-light underline w-fit"
            >
              See More Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default "card" variant
  return (
    <Link
      key={asset?.id}
      // to={`/dashboard/markets/${asset.slug}`}
      to={`/dashboard/assets/${asset.slug}`}
      className="cursor-pointer"
    >
      <div
        key={asset?.id}
        className="bg-custom-light-bg text-custom-white flex flex-col gap-2 items-start rounded-2xl p-2 min-w-76 shadow-lg h-full"
      >
        <div className="relative overflow-hidden flex justify-between gap-2 items-start text-start w-full rounded-lg">
          <div className="flex items-center gap-2">
            <img
              src={asset?.image_urls[0]}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <h2 className="font-light">{asset?.asset_symbol}</h2>
              <small className="text-custom-grey font-light text-xs">
                {FormatService.formatName(asset?.asset_name)}
              </small>
            </div>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-custom-grey font-light">
          {FormatService.truncateString(asset?.asset_description, 30)}
        </p>
        <div className="flex flex-col gap-1 items-start w-full">
          <Progress
            value={raisePercentage}
            className="w-full bg-custom-white [&>div]:bg-custom-orange h-1.5"
          />
          <div className="flex justify-between items-center w-full text-sm">
            <div className="flex gap-1 items-center">
              <RiFlashlightFill className="text-custom-orange" />
              <small className="font-semibold text-custom-orange">
                {raisePercentage}% raised
              </small>
            </div>
            <small className="">
              {formatNumber(asset?.available_shares)} available
            </small>
          </div>
        </div>

        <div className="relative overflow-hidden flex flex-col gap-2 items-start text-start w-full p-2 rounded-lg bg-[#93939417] mt-2">
          <img
            src={assetBaseLogo}
            alt=""
            className=" absolute w-35 top-0 -right-5 opacity-10"
          />

          <div className="w-full flex flex-col text-sm">
            <div className="flex justify-between items-center w-full">
              <small className="text-custom-grey">Price per share</small>
              <small className="">{formatUSD(asset?.price_per_share)}</small>
            </div>
            <div className="flex justify-between items-center w-full">
              <small className="text-custom-grey">Funding round closes</small>
              <small className="font-medium">
                in <span className="font-semibold">15 days</span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  // Default "card" variant
  return (
    <Link
      key={asset.id}
      // to={`/dashboard/markets/${asset.slug}`}
      to={`/dashboard/assets/${asset.slug}`}
      className="cursor-pointer"
    >
      <div
        key={asset.id}
        className="bg-custom-light-bg text-custom-white flex flex-col gap-2 items-start rounded-2xl p-2 min-w-66 sm:min-w-96 shadow-lg h-full"
      >
        <img src={cardCover} alt="" className="w-full" />
        <div className="relative overflow-hidden flex justify-between gap-2 items-start text-start w-full rounded-lg">
          <div className="flex items-center gap-2">
            <img
              src={asset?.image_urls[0]}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <h2 className="font-semibold">{asset?.asset_symbol}</h2>
              <small className="text-custom-grey">
                {FormatService.formatName(asset?.asset_name)}
              </small>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 mb-2">
            <RiShareLine className="w-9 h-9 bg-custom-input-stroke text-custom-grey p-2 rounded-full" />
            <RiBookmarkLine className="w-9 h-9 bg-custom-input-stroke text-custom-grey p-2 rounded-full" />
          </div>
        </div>
        <p className="text-sm text-custom-grey">
          {FormatService.truncateString(asset?.asset_description, 50)}
        </p>
        <div className="flex flex-col gap-2 items-start w-full pb-1">
          <Progress
            value={raisePercentage}
            className="w-full bg-custom-white [&>div]:bg-custom-orange h-1.5"
          />
          <div className="flex justify-between items-center w-full text-sm">
            <div className="flex gap-1 items-center">
              <RiFlashlightFill className="text-custom-orange" />
              <small className="font-semibold text-custom-orange">
                {raisePercentage}% raised
              </small>
            </div>
            <small className="font-semibold">
              {formatNumber(asset?.available_shares)} available
            </small>
          </div>
        </div>

        {/* Only on desktop  */}
        {/* <div className="hidden md:flex flex-col gap-4 w-full ">
          <div className="flex flex-col gap-2 items-start w-full">
            <div className="flex justify-between items-center w-full">
              <p className="text-sm text-custom-grey">Category</p>
              <small className="capitalize bg-custom-input-stroke text-custom-white px-2 rounded">
                {item?.asset?.category}
              </small>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-sm text-custom-grey">Location</p>
              <p className="capitalize text-custom-grey px-2 rounded">
                {item?.asset?.iso_country_code === "NG" ? "Nigeria" : "Ghana"}
              </p>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-4 mb-2">
              <RiShareLine className="w-10 h-10 bg-custom-input-stroke text-custom-grey p-2 rounded-full" />
              <RiBookmarkLine className="w-10 h-10 bg-custom-input-stroke text-custom-grey p-2 rounded-full" />
            </div>
            <Link
              to={`/dashboard/markets/${item?.asset.slug}`}
              className="text-sm text-custom-orange font-light underline w-fit"
            >
              See More Details
            </Link>
          </div>
        </div> */}

        <div className="relative overflow-hidden flex flex-col gap-2 items-start text-start w-full p-2 rounded-lg bg-[#93939417] mt-auto">
          <img
            src={assetBaseLogo}
            alt=""
            className=" absolute w-35 top-0 -right-5 opacity-10"
          />

          <div className="w-full flex flex-col">
            <div className="flex justify-between items-center w-full">
              <small className="text-custom-grey">Price per share</small>
              <small className="font-semibold">
                {formatUSD(asset?.price_per_share)}
              </small>
            </div>
            <div className="flex justify-between items-center w-full">
              <small className="text-custom-grey">Funding round closes</small>
              <small className="font-medium">
                in <span className="font-bold">15days</span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
