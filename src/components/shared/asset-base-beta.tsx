import { Link } from "react-router";
import { Badge } from "../ui/badge";
import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import { cn } from "@/lib/utils";

export default function AssetBaseBeta() {
  return (
    <div className="flex items-end gap-2 text-custom-white">
      <img src={assetBaseLogo} alt="asset base" className="mb-1" />
      <p className="text-3xl text-custom-white">Assetbase</p>
      <Badge
        variant="default"
        className="bg-green-700 text-white mb-1 rounded-sm"
      >
        beta
      </Badge>
    </div>
  );
}

export function AssetBaseBetaWhite() {
  return (
    <Link to="/dashboard" className="flex items-end gap-2 text-custom-white">
      <img
        src={assetBaseLogo}
        alt="asset base"
        className="mb-1 w-8 h-8 lg:w-8 lg:h-8"
      />
      <p className=" text-2xl lg:text-2xl text-white">Assetbase</p>
      <Badge
        variant="default"
        className="bg-green-700 text-white mb-1 rounded-sm"
      >
        beta
      </Badge>
    </Link>
  );
}

export function AssetBaseLogo({ className }: { className?: string }) {
  return (
    <img src={assetBaseLogo} alt="asset base" className={cn(``, className)} />
  );
}
