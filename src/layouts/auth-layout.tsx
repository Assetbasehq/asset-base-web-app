import { Button } from "@/components/ui/button";
import { Outlet } from "react-router";
import gradientLines from "@/assets/images/gradient-lines.svg";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen font-neue">
      <div
        style={{ backgroundImage: `url(${gradientLines})` }}
        className="hidden lg:flex lg:gap-13 lg:flex-col w-1/2 items-left text-left justify-center items-start bg-black text-white px-4"
      >
        <img src={gradientLines} alt="" className="absolute h-screen" />
        <h1 className="text-6xl max-w-xl">
          alternative investments without stress
        </h1>
        <p className="max-w-xl">
          Assetbase offers a selection of highly vetted private investment
          opportunities that were previously only available to institutions and
          the ultra wealthy.
        </p>
        <Button className="bg-custom-black rounded-sm py-6 px-4 font-neue">
          Start Investing
        </Button>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}
