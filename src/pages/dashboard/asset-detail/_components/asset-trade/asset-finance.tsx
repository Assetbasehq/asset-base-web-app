import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import type { IAsset } from "@/interfaces/asset.interface";
import { RiFlashlightFill } from "react-icons/ri";

export default function AssetFinance({ asset }: { asset: IAsset }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-custom-light-bg p-6 rounded-xl flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p>Price Per Share</p>
            <p>$500</p>
          </div>
          <div className="flex justify-between">
            <p>Price Per Share</p>
            <p>$500</p>
          </div>
          <div className="flex justify-between">
            <p>Price Per Share</p>
            <p>$500</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start w-full pb-1">
          <Progress
            value={40}
            className="w-full bg-white [&>div]:bg-custom-orange"
          />
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-1 items-center">
              <RiFlashlightFill className="text-custom-orange" />
              <small className="font-semibold text-custom-orange">
                {4}% raised
              </small>
            </div>
            <small className="font-semibold">100 available</small>
          </div>
        </div>

        {/* <div className="flex flex-col gap-2 items-start w-full pb-1">
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
          </div> */}
      </div>

      <form action="" className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="">Shares</Label>
          <Input type="number" className="w-full py-6" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="">Shares</Label>
          <Input type="number" className="w-full py-6" />
        </div>

        <Button disabled className="py-6 rounded-full btn-primary">
          Place Order
        </Button>
      </form>
    </div>
  );
}
