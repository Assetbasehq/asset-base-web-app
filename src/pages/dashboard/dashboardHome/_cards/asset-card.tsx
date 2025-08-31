import type { IAsset } from "@/interfaces/asset.interface";
import { Progress } from "@/components/ui/progress";
import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import { calculateRaisePercentage, formatNumber, formatUSD } from "@/lib/utils";
import { RiFlashlightFill } from "react-icons/ri";

interface Props {
  item: {
    asset: IAsset;
  };
}

export default function AssetCard({ item }: Props) {
  return (
    <div
      key={item?.asset.id}
      className=" bg-custom-light-bg flex flex-col gap-4 items-start rounded-2xl p-2 min-w-96"
    >
      <div className="relative overflow-hidden flex flex-col gap-6 items-start text-start w-full p-4 rounded-lg bg-[#93939417]">
        <img
          src={assetBaseLogo}
          alt=""
          className=" absolute w-35 top-0 -right-5 opacity-10"
        />
        <div className="flex items-center gap-2">
          <img
            src={item?.asset?.image_urls[0]}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-semibold">{item?.asset?.asset_symbol}</h2>
            <small>{item?.asset?.asset_name}</small>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="flex justify-between items-center w-full">
            <small>Price per share</small>
            <small className="font-semibold">
              {formatUSD(item?.asset?.price_per_share)}
            </small>
          </div>
          <div className="flex justify-between items-center w-full">
            <small>Funding round closes</small>
            <small className="font-semibold">in 15days</small>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start w-full pb-1">
        <Progress
          value={calculateRaisePercentage(
            item?.asset?.number_of_shares,
            item?.asset?.available_shares
          )}
          className="w-full bg-white [&>div]:bg-custom-orange"
        />
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-1 items-center">
            <RiFlashlightFill className="text-custom-orange" />
            <small className="font-semibold text-custom-orange">
              {calculateRaisePercentage(
                item?.asset?.number_of_shares,
                item?.asset?.available_shares
              )}
              % raised
            </small>
          </div>
          <small className="font-semibold">
            {formatNumber(item?.asset?.available_shares)} available
          </small>
        </div>
      </div>
    </div>
  );
}
