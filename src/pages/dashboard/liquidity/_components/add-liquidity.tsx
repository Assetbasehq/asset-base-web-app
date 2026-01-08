import { Button } from "@/components/ui/button";
import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import gridLines from "@/assets/images/gradient-lines.svg";
import { RiBox3Line } from "react-icons/ri";
import { useState } from "react";
import AddLiquidityModal from "../_modals/add-liquidity-modal";
import SuccessModal from "@/components/modals/success-modal";

export default function AddLiquidity() {
  const [isLiquidityModalOpen, setIsLiquidityModalOpen] = useState(false);
  const [openSuccessModal, setIsOpenSuccessModal] = useState(false);

  return (
    <div
      className="relative flex flex-col gap-8 text-custom-white-text text-center items-start md:items-center justify-between md:text-left md:flex-row p-4
      pr-8 rounded-2xl overflow-hidden bg-custom-input-mute"
    >
      <img
        src={assetBaseLogo}
        alt=""
        className=" absolute w-60 -top-5 -right-20 opacity-10"
      />
      <img
        src={gridLines}
        alt=""
        className=" absolute w-60 top-0 right-0 opacity-10"
      />
      <div>
        <h2 className="text-sm md:text-lg font-semibold mb-2 text-start">
          Amplify Your Returns Through Smart Liquidity
        </h2>
        <p className="max-w-3xl text-custom-grey text-xs md:text-sm text-start">
          Join our excluisve liquidity pool and earn competitive returns while
          we strategically deploy your capital across high-potential investments
          opportunites. Professional fun management meets accesible investing.
        </p>
      </div>
      <Button
        onClick={() => setIsLiquidityModalOpen(true)}
        className="flex z-20 items-center gap-4 bg-black text-white rounded-full py-6 px-6 cursor-pointer transition-all duration-300 ease-in-out hover:bg-black/80"
      >
        <div className="flex items-center gap-4 cursor-pointer">
          <RiBox3Line className="!w-6 !h-6 cursor-pointer" />
          <span className="text-lg cursor-pointer">Add Liquidity</span>
        </div>
      </Button>

      <AddLiquidityModal
        isOpen={isLiquidityModalOpen}
        onClose={() => setIsLiquidityModalOpen(false)}
        onSuccess={() => {
          setIsLiquidityModalOpen(false);
          setIsOpenSuccessModal(true);
        }}
      />

      <SuccessModal
        isOpen={openSuccessModal}
        onClose={() => {
          setIsOpenSuccessModal(false);
          setIsLiquidityModalOpen(false);
        }}
        title={`Liquidity Added`}
        description={`You've successfully added your liquidity`}
        buttonText={`Close`}
      />
    </div>
  );
}
