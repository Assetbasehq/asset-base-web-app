import { Switch } from "@/components/ui/switch";
import AssetChart from "./_components/asset-chart";
import { RiShareForwardLine } from "react-icons/ri";
import { FormatService } from "@/services/format-service";
import { cn } from "@/lib/utils";

type AssetDetailsProProps = {
  asset: any;
  isChecked: boolean;
  onSwitch: (value: boolean) => void;
};

export default function AssetDetailPro({
  asset,
  isChecked,
  onSwitch,
}: AssetDetailsProProps) {
  return (
    <div className="flex flex-col gap-4 py-4 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex text-start items-start gap-4">
          <img src={asset.logo} alt={asset.name} className="w-8 sm:w-12" />
          <div>
            <p className="font-semibold text-lg">{asset.acronym}</p>
            <p className="text-muted-foreground text-sm">{asset.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg md:text-lg font-medium">Switch to Pro</h2>
            <Switch
              id="pro-mode"
              checked={isChecked}
              onCheckedChange={(checked) => {
                console.log({ checked });

                onSwitch(checked);
              }}
              className="border-2 data-[state=unchecked]:border-white data-[state=checked]:border-custom-orange !data-[state=unchecked]:bg-transparent data-[state=checked]:bg-transparent w-10 h-[1.3rem] cursor-pointer px-1"
            />
          </div>
          <RiShareForwardLine className="w-12 h-12 sm:h-14 sm:w-14 bg-custom-light-bg p-4 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between text-start">
        <div className="flex flex-col gap-2 mb-2 md:mb-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm  md:text-2xl text-custom-white-text">
              {asset.price}
            </p>
            <small
              className={cn("text-muted-foreground", {
                "text-green-400": asset.price_change_24hrs.includes("+"),
                "text-red-400": asset.price_change_24hrs.includes("-"),
              })}
            >
              {asset.price_change_24hrs}
            </small>
          </div>
          <p className="text-muted-foreground text-sm hidden md:block">
            At close:{" "}
            <span className="font-semibold text-custom-white-text">
              {asset.round_closes}
            </span>
          </p>
        </div>
      </div>

      <AssetChart asset={asset} />
    </div>
  );
}
