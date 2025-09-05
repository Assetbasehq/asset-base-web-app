import { Button } from "../ui/button";
import { RiAddLine } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWallectConnector } from "@/hooks/useWalletConnector";
import { FormatService } from "@/services/format-service";
import { useState } from "react";
import shieldImage from "@/assets/images/shield-fingerprint.svg";
import { cn } from "@/lib/utils";
import { CustomAlert } from "../custom/custom-alert";

export interface ConnectWalletProps {
  className?: string;
}

export default function ConnectWallet({ className }: ConnectWalletProps) {
  const [open, setOpen] = useState(false);

  const {
    balance,
    providers,
    address,
    connectWallet,
    disconnectWallet,
    error,
  } = useWallectConnector();

  const handleOpen = () => setOpen(true);

  return (
    <div>
      <Button
        // onClick={handleClick}
        onClick={() => (address ? disconnectWallet() : handleOpen())}
        // onClick={handleConnect1}
        className={cn(
          `bg-custom-orange text-custom-white px-4 py-2 rounded-full w-fit flex items-center gap-2 cursor-pointer hover:bg-custom-orange/90 transition-all duration-300 ease-in-out`,
          className
        )}
      >
        {address && FormatService.formatToUSD(balance)}
        {address ? (
          <p className="text-sm font-medium">
            - {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        ) : (
          <span className="flex items-center gap-1">
            <span>
              <RiAddLine className="" />
            </span>
            Connect
          </span>
        )}
      </Button>

      <ConnectWalletModal
        open={open}
        setOpen={setOpen}
        providers={providers}
        connectWallet={(provider) =>
          connectWallet(provider, () => setOpen(false))
        }
        error={error}
      />
    </div>
  );
}

function ConnectWalletModal({
  open,
  setOpen,
  providers,
  connectWallet,
  error,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  providers: any[];
  connectWallet: (provider: any) => void;
  error: string | null;
}) {
  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className=" w-lg sm:max-w-lg bg-custom-base text-custom-white rounded-2xl font-neue"
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
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 w-full">
              {providers.length > 0 ? (
                providers.map((provider) => {
                  return (
                    <Button
                      className="flex items-center justify-start gap-2 bg-custom-base hover:bg-custom-light-bg text-custom-white w-full cursor-pointer "
                      key={provider.info.uuid}
                      onClick={() => {
                        connectWallet(provider.provider);
                        // setOpen(false);
                      }}
                    >
                      <img
                        className="w-6 h-6"
                        src={provider.info.icon}
                        alt={provider.info.name}
                      />
                      <div>{provider.info.name}</div>
                    </Button>
                  );
                })
              ) : (
                <div>
                  Please install Metamask, Trust Wallet or any other wallet
                </div>
              )}
            </div>
            {error && <CustomAlert message={error} variant="destructive" />}
            <p className="text-custom-grey text-xs">
              By connecting your wallet, you're agree to our{" "}
              <small className="text-custom-orange text-sm ">
                Terms of Service
              </small>{" "}
              and our{" "}
              <small className="text-custom-orange text-sm">
                Privacy Policy{" "}
              </small>
            </p>
          </div>
          <img className="hidden" src={shieldImage} alt="" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
