import { Button } from "@/components/ui/button";
import { Outlet } from "react-router";
import gradientLines from "@/assets/images/gradient-lines.svg";
import ThemeSwitcher from "@/components/shared/theme-switcher";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen font-neue">
      <div className="relative hidden lg:flex lg:gap-13 lg:flex-col w-[40%] items-left text-left justify-end items-start bg-black text-white px-22 py-44">
        <img
          src={gradientLines}
          alt=""
          className="absolute min-h-[95%] top-5 right-30"
        />
        <div className="flex flex-col gap-13 items-start">
          <h1 className="text-6xl max-w-lg">
            alternative investments without stress
          </h1>
          <p className="max-w-xl pr-4 font-neue">
            Assetbase offers a selection of highly vetted private investment
            opportunities that were previously only available to institutions
            and the ultra wealthy.
          </p>
          <Button className="bg-custom-black text-white rounded-sm py-6 px-4 font-neue">
            Start Investing
          </Button>
        </div>
      </div>
      <div className="w-full lg:w-[60%] flex flex-col justify-center items-center z-10">
        <Outlet />
      </div>
      <ThemeSwitcher />
    </div>
  );
}
