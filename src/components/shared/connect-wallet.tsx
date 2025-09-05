import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RiAddLine } from "react-icons/ri";
import { BrowserProvider } from "ethers";
import { useWalletStore } from "@/store/wallet-store";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WalletService } from "@/services/wallet-service";

export default function ConnectWallet() {
  const [open, setOpen] = useState(false);
  const [wallets, setWallets] = useState<{ name: string; provider: any }[]>([]);

  const { balance, address, updateWalletAddress, updateWalletProvider } =
    useWalletStore();

  useEffect(() => {
    const initializeProvider = async () => {
      console.log({
        window,
        ethereum: window.ethereum,
        updateWalletAddress,
        updateWalletProvider,
        address,
        balance,
      });

      if (!window || !window.ethereum) {
        console.log(`Clearing...`);

        return updateWalletAddress("");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(window.ethereum);

      console.log({ name: await provider.getNetwork() });

      const signer = await provider.getSigner();
      console.log("Connected wallet address:", await signer.getAddress());
      updateWalletAddress(await signer.getAddress());
    };

    initializeProvider();
  }, []);

  const handleClick = async () => {
    if (window && window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      console.log("Connected wallet address:", await signer.getAddress());
      updateWalletAddress(await signer.getAddress());
      return;
    }

    toast.info("Please install Metamask", {
      description: "You need to install Metamask to continue",
      action: {
        label: "Install Metamask",
        onClick: () => {
          window.open("https://metamask.io/download.html", "_blank");
        },
      },
    });
  };

  const handleOpen = () => {
    const detectedWallets = WalletService.getAvailableWallets();

    console.log({
      detectedWallets,
    });

    if (detectedWallets.length === 0) {
      alert("No wallets detected. Please install MetaMask or Trust Wallet.");
      return;
    }
    setWallets(detectedWallets);
    setOpen(true);
  };

  const handleConnect = async (wallet: any) => {
    const provider = wallet.provider as BrowserProvider;
    console.log({ provider });

    const signer = await provider.getSigner();
    console.log("Connected wallet address:", await signer.getAddress());
    updateWalletAddress(await signer.getAddress());
    setOpen(false);
  };

  return (
    <div>
      <Button
        // onClick={handleClick}
        onClick={handleOpen}
        className="bg-custom-orange text-custom-white px-4 py-2 rounded-full w-fit flex items-center gap-2 cursor-pointer hover:bg-custom-orange/90 transition-all duration-300 ease-in-out"
      >
        {address ? (
          <p className="text-sm font-medium">
            {address.slice(0, 6)}...{address.slice(-4)}
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Wallet</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            {wallets.map((wallet) => (
              <Button
                key={wallet.name}
                onClick={() => handleConnect(wallet)}
                className="w-full"
              >
                {wallet.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
