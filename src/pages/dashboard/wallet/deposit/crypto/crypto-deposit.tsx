import { CustomAlert } from "@/components/custom/custom-alert";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRequestCryptoDeposit } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";
import { RiCheckLine, RiFileCopyLine } from "react-icons/ri";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { BaseError, parseEther } from "viem";
import { truncateWalletAddress } from "@/lib/utils";
import { ConnectWalletModal } from "@/components/shared/connect-wallet";

interface CryptoDepositProps {
  goBack: () => void;
}

export default function CryptoDeposit({ goBack }: CryptoDepositProps) {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountToFund, setAmountToFund] = useState<number | null>(null);

  const { address, isConnected, chainId } = useAccount();

  const { data, isLoading, isError } = useRequestCryptoDeposit();

  const {
    data: hash,
    isPending: isTransactionPending,
    error,
    sendTransaction,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleAmountChange = (amount: string) => {
    const amountNumber = Number(amount);
    if (!isNaN(amountNumber)) setAmountToFund(amountNumber);
  };

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(`${data?.data?.address}`);
    setCopied(true);
    console.log("ddd");

    setTimeout(() => setCopied(false), 2000); // reset after 2s
  };

  const handleSendTransaction = () => {
    if (!isConnected) return setIsModalOpen(true);
    if (!amountToFund) return;
    const to = data?.data?.address;
    const value = parseEther(amountToFund.toString()); // Ensure it's clean

    sendTransaction?.({ to, value, gas: BigInt(21000) });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label className="text-custom-grey text-xs md:text-sm">
          Enter amount to fund
        </Label>
        <Input
          onChange={(e) => handleAmountChange(e.target.value)}
          type="text"
          className="py-6 w-full"
          placeholder="10"
        />
      </div>

      {error && (
        <CustomAlert
          message={`Error: ${
            (error as BaseError).shortMessage || error.message
          }`}
          variant="destructive"
        />
      )}
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && (
        <CustomAlert message="Waiting for confirmation..." variant="info" />
      )}
      {isConfirmed && (
        <CustomAlert message="Transaction confirmed" variant="success" />
      )}

      {/* <Button
        // disabled
        variant="outline"
        className="flex justify-between bg-custom-base w-full rounded-full !py-0"
      >
        <small className="text-custom-grey">$1</small>
        <small>$1,576.03</small>
      </Button> */}

      <div className="flex flex-col gap-2">
        <p className="text-custom-grey text-xs md:text-sm">
          Fund to crypto wallet
        </p>

        <Button
          disabled={!amountToFund || isTransactionPending}
          onClick={() => handleSendTransaction()}
          className="py-6 md:py-8 bg-custom-light-bg flex justify-start text-custom-grey hover:bg-custom-light-bg/80 cursor-pointer"
        >
          <img src={images.assetBase.logo} alt={images.assetBase.alt} />
          <span>
            {isTransactionPending
              ? "Confirming..."
              : "Fund from my connected wallet"}
          </span>
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-6">
          <span className="bg-background dark:bg-custom-card text-muted-foreground relative z-10 px-2 text-xs">
            OR
          </span>
        </div>

        <div className="py-4 px-4 rounded-md bg-custom-light-bg flex justify-start text-custom-grey hover:bg-custom-light-bg/80 cursor-pointer">
          <p className="flex items-center gap-2">
            <img src={images.assetBase.logo} alt={images.assetBase.alt} />
            <div className="flex flex-col items-start">
              <p className="text-xs md:text-sm">
                {" "}
                Send directly to my AssetBase wallet
              </p>
              <p className="text-custom-white flex gap-2 text-xs">
                {isLoading ? (
                  "..."
                ) : (
                  <>
                    <small className="sm:hidden">
                      {truncateWalletAddress(data?.data?.address, 12)}
                    </small>
                    <small className="hidden sm:block">
                      {data?.data?.address}
                    </small>
                  </>
                )}{" "}
                <span className=" cursor-pointer">
                  {copied ? (
                    <>
                      <RiCheckLine
                        onClick={handleCopyAddress}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </>
                  ) : (
                    <>
                      <RiFileCopyLine
                        className="w-4 h-4"
                        onClick={handleCopyAddress}
                      />
                    </>
                  )}
                </span>
              </p>
            </div>
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        className="text-muted-foreground hover:text-custom-orange bg-custom-light-bg cursor-pointer"
        onClick={goBack}
      >
        Back
      </Button>

      <ConnectWalletModal open={isModalOpen} setOpen={setIsModalOpen} />
    </div>
  );
}
