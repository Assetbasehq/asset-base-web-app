import { Outlet } from "react-router";
import gradientLines from "@/assets/images/gradient-lines.svg";
import ThemeSwitcher from "@/components/shared/theme-switcher";
import { AssetBaseBetaWhite } from "@/components/shared/asset-base-beta";

export default function OnboardingLayout() {
  return (
    <div className="flex min-h-screen font-neue">
      <div className="relative hidden lg:flex lg:gap-13 lg:flex-col w-[40%] items-left text-left justify-between items-start bg-black text-white px-12 py-24 overflow-hidden">
        <img
          src={gradientLines}
          alt=""
          className="absolute min-h-[100%] hidden lg:block -top-35"
        />
        <AssetBaseBetaWhite />
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
      <div className="w-full lg:w-[60%] flex flex-col justify-center items-center z-10">
        <Outlet />
      </div>
      <ThemeSwitcher />
    </div>
  );
}
