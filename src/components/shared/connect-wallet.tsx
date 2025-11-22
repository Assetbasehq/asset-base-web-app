import { Button } from "../ui/button";
import { RiAddLine } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormatService } from "@/services/format-service";
import { useState } from "react";
import shieldImage from "@/assets/images/shield-fingerprint.svg";
import { cn } from "@/lib/utils";
import { CustomAlert } from "../custom/custom-alert";
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  type Connector,
} from "wagmi";
import { formatEther } from "viem";

export interface ConnectWalletProps {
  className?: string;
}

// const ASSET_CHAIN_ID = 12345;
const ASSET_CHAIN_USDT_CONTRACT = "0x04f868C5b3F0A100a207c7e9312946cC2c48a7a3";

export default function ConnectWallet({ className }: ConnectWalletProps) {
  const [open, setOpen] = useState(false);

  const { address, isConnected, chainId } = useAccount();
  const { data: walletBalance } = useBalance({
    address,
    token: ASSET_CHAIN_USDT_CONTRACT,
    chainId: chainId,
  });

  const formattedBalance = walletBalance
    ? FormatService.formatToUSD(
        parseFloat(formatEther(walletBalance.value)) || 0
      )
    : FormatService.formatToUSD(0);

  const handleOpen = () => setOpen(true);

  return (
    <div>
      <Button
        onClick={() => handleOpen()}
        className={cn(
          `bg-custom-orange text-custom-white px-4 py-2 rounded-full w-fit flex items-center gap-2 cursor-pointer hover:bg-custom-orange/90 transition-all duration-300 ease-in-out`,
          className
        )}
      >
        {isConnected && address ? (
          <>
            {formattedBalance && <span>{formattedBalance}</span>}
            <p className="text-sm font-medium">
              - {address.slice(0, 6)}...{address.slice(-4)}
            </p>
          </>
        ) : (
          <span className="flex items-center gap-1">
            <span>
              <RiAddLine className="" />
            </span>
            Connect
          </span>
        )}
      </Button>

      <ConnectWalletModal open={open} setOpen={setOpen} />
    </div>
  );
}

export function ConnectWalletModal({
  open,
  setOpen,
  onSuccess,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}) {
  const { connectors, connect, error } = useConnect();
  const { connector: activeConnector, isConnected } = useAccount();
  const { disconnect } = useDisconnect();


  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className=" w-lg sm:max-w-lg lg:w-3xl md:max-w-4xl bg-custom-base text-custom-white rounded-2xl font-neue"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-start font-medium text-xl">
            Connect Wallet
          </DialogTitle>
          <DialogDescription className="text-start text-sm">
            Get Started by connecting your preferred wallet below
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 w-full">
              {connectors.length > 0 ? (
                connectors.map((connector: Connector) => {
                  const isCurrent = activeConnector?.id === connector.id;
                  return (
                    <div className="flex justify-between w-full">
                      <Button
                        className="w-50 flex items-center justify-start gap-2 bg-custom-base hover:bg-custom-light-bg text-custom-white cursor-pointer "
                        key={connector.uid}
                        onClick={() => {
                          if (!isCurrent) {
                            connect(
                              { connector },
                              {
                                onSuccess: () => {
                                  if (onSuccess) {
                                    onSuccess();
                                  }
                                },
                              }
                            ); 
                          }
                        }}
                      >
                        <img
                          className="w-6 h-6"
                          src={connector.icon}
                          alt={connector.name}
                        />
                        <div>{connector.name}</div>
                        {isCurrent && (
                          <div className="text-xs text-green-500">
                            Connected
                          </div>
                        )}
                      </Button>
                      <Button
                        className={cn(
                          `bg-custom-light-bg w-30 text-xs !p-0 cursor-pointer`,
                          {
                            hidden: !isCurrent,
                          }
                        )}
                        variant="destructive"
                        onClick={() => disconnect()}
                      >
                        Disconnect
                      </Button>
                    </div>
                  );
                })
              ) : (
                <div>
                  Please install Metamask, Trust Wallet or any other Web3 wallet
                </div>
              )}
            </div>

            {error && (
              <CustomAlert message={error?.message} variant="destructive" />
            )}

            <p className="text-custom-grey text-xs">
              By connecting your wallet, you agree to our{" "}
              <small className="text-custom-orange text-sm ">
                Terms of Service
              </small>{" "}
              and our{" "}
              <small className="text-custom-orange text-sm">
                Privacy Policy{" "}
              </small>
            </p>
          </div>
          <img className="hidden lg:block w-60" src={shieldImage} alt="" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
