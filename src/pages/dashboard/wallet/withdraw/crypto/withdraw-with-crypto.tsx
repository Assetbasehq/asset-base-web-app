import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";

interface WithdrawToCryptoProps {
  //   stage: number;
  setStage: (stage: number) => void;
  onBack: () => void;
}

export default function WithdrawToCrypto({ onBack }: WithdrawToCryptoProps) {
  return (
    <div className="text-start flex flex-col gap-2">
      <p className="text-xs font-light text-custom-grey">
        Withdraw to crypto wallet
      </p>

      <Button
        // disabled={!amountToFund || isTransactionPending}
        // onClick={() => handleSendTransaction()}
        className="py-6 md:py-8 bg-custom-light-bg flex justify-start text-custom-grey hover:bg-custom-light-bg/80 cursor-pointer w-full"
      >
        <img src={images.assetBase.logo} alt={images.assetBase.alt} />
        <span>Send directly to an external address</span>
      </Button>

      <Button
        // disabled={!amountToFund || isTransactionPending}
        // onClick={() => handleSendTransaction()}
        className="py-6 md:py-8 bg-custom-light-bg flex justify-start text-custom-grey hover:bg-custom-light-bg/80 cursor-pointer w-full"
      >
        <img src={images.assetBase.logo} alt={images.assetBase.alt} />
        <span>Send to my connected wallet</span>
      </Button>

      <Button disabled className="btn-primary rounded-full py-6 mt-4 w-full">
        Proceed with withdrawal
      </Button>
    </div>
  );
}
