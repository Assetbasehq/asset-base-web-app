import { Outlet } from "react-router";
import gradientLines from "@/assets/images/gradient-lines.svg";
import { Badge } from "@/components/ui/badge";
import assetBaseLogo from "@/assets/images/asset-base-logo.svg";

export default function OnboardingLayout() {
  return (
    <div className="flex min-h-screen font-neue">
      <img
        src={gradientLines}
        alt=""
        className="absolute h-screen hidden lg:block"
      />
      <div
        style={{ backgroundImage: `url(${gradientLines})` }}
        className="hidden lg:flex lg:gap-13 lg:flex-col w-1/2 items-left text-left justify-between items-start bg-black text-white px-12 py-24"
      >
        <div className="flex items-end gap-2">
          <img src={assetBaseLogo} alt="asset base" className="mb-1" />
          <p className="text-3xl">Assetbase</p>
          <Badge
            variant="default"
            className="bg-custom-green text-white mb-1 rounded-sm"
          >
            beta
          </Badge>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-6xl max-w-lg">
            alternative investments without stress
          </h1>
          <p className="max-w-sm">
            Assetbase offers a selection of highly vetted private investment
            opportunities that were previously only available to institutions
            and the ultra wealthy.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}
