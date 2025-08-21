import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";
import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import gridLines from "@/assets/images/gradient-lines.svg";

export default function AddLiquidity() {
  return (
    <div className="relative flex flex-col gap-8 text-custom-white-text text-center items-center justify-between md:text-left md:flex-row bg-custom-card p-4 md:p-8 pr-8 rounded-2xl overflow-hidden">
      <img
        src={assetBaseLogo}
        alt=""
        className=" absolute w-60 -top10 -right-10 opacity-10"
      />
      <img
        src={gridLines}
        alt=""
        className=" absolute w-60 top-0 right-0 opacity-10"
      />
      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Amplify Your Returns Through Smart Liquidity
        </h2>
        <p className="max-w-3xl text-muted-foreground">
          Join our excluisve liquidity pool and earn competitive returns while
          we strategically deploy your capital across high-potential investments
          opportunites. Professional fun management meets accesible investing.
        </p>
      </div>
      <Button className="flex items-center gap-4 bg-black text-white rounded-full py-6 px-8 cursor-pointer transition-all duration-300 ease-in-out hover:bg-black/80">
        <div className="flex items-center gap-4">
          <Box /> <span className="text-lg">Add Liquidity</span>
        </div>
      </Button>
    </div>
  );
}
