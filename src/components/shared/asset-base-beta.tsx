import { Badge } from "../ui/badge";
import assetBaseLogo from "@/assets/images/asset-base-logo.svg";

export default function AssetBaseBeta() {
  return (
    <div className="flex items-end gap-2 text-black dark:text-white">
      <img src={assetBaseLogo} alt="asset base" className="mb-1" />
      <p className="text-3xl">Assetbase</p>
      <Badge
        variant="default"
        className="bg-custom-green text-white mb-1 rounded-sm"
      >
        beta
      </Badge>
    </div>
  );
}
