import { CustomAlert } from "@/components/custom/custom-alert";
import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";
import { useSupportedAssets, useSupportedNetworks } from "@/hooks/useWallet";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAccount } from "wagmi";
import { ConnectWalletModal } from "@/components/shared/connect-wallet";

export default function WithdrawToCrypto() {
  const [error, setError] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [connectWalletOpen, setConnectWalletOpen] = useState(false);

  // auto-fill states
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);
  const [recipientAddress, setRecipientAddress] = useState("");

  const { data: supportedNetworks } = useSupportedNetworks({});
  const { data: supportedAssets } = useSupportedAssets({});

  const { address, chainId, isConnected } = useAccount();

  const handleOpenModal = () => {
    setWithdrawOpen(true);
  };

  const handleSelectNetwork = (network: any) => {
    setSelectedNetwork(network);
  };

  const handleWithdraw = () => {
    if (!recipientAddress) return setModalError("Enter destination address");
    if (!selectedNetwork) return setModalError("Select a network");

    console.log({
      recipientAddress,
      network: selectedNetwork,
    });

    let payload: Record<string, any> = {
      amount: 0,
      assetId: "",
      address: recipientAddress,
      network: selectedNetwork,

    };

    // Trigger withdrawal logic here
    // e.g. call backend: /wallet/withdraw

    alert("Withdrawal triggered!");
    setWithdrawOpen(false);
  };

  const handleUseConnectedWallet = () => {
    if (!isConnected) {
      // ❌ Wallet not connected → show connect wallet modal
      setConnectWalletOpen(true);
      return;
    }

    // ✅ Wallet is connected → auto-select network + wallet address
    const matchNetwork = supportedNetworks.find(
      (net: any) => net.chain === selectedNetwork
    );

    console.log({ chainId });

    if (matchNetwork) {
      setSelectedNetwork(matchNetwork);
    }

    if (address) {
      setRecipientAddress(address);
    }

    // Open Withdraw Modal
    setWithdrawOpen(true);
  };

  console.log({
    supportedNetworks,
    supportedAssets,
  });

  return (
    <div className="text-start flex flex-col gap-2">
      <ConnectWalletModal
        open={connectWalletOpen}
        setOpen={setConnectWalletOpen}
      />
      <p className="text-sm font-light text-custom-grey">
        Withdraw to crypto wallet
      </p>

      {error && <CustomAlert variant="warning" message={error} />}

      <Button
        onClick={handleOpenModal}
        className="py-6 md:py-8 bg-custom-light-bg flex justify-start text-custom-grey hover:bg-custom-light-bg/80 cursor-pointer w-full"
      >
        <img src={images.assetBase.logo} alt={images.assetBase.alt} />
        <span>Send directly to an external address</span>
      </Button>

      <Button
        onClick={handleUseConnectedWallet}
        className="py-6 md:py-8 bg-custom-light-bg flex justify-start text-custom-grey hover:bg-custom-light-bg/80 cursor-pointer w-full"
      >
        <img src={images.assetBase.logo} alt={images.assetBase.alt} />
        <span>Send to my connected wallet</span>
      </Button>

      <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
        <DialogContent className="bg-custom-card border border-border">
          <DialogHeader>
            <DialogTitle className="text-sm">
              Withdraw to External Address
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-2">
            {/* ADDRESS INPUT */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-custom-grey">
                Recipient Address
              </label>
              <Input
                value={recipientAddress}
                onChange={(e) => {
                  setRecipientAddress(e.target.value);
                  setModalError(null);
                }}
                placeholder="0x..."
                className="py-6"
              />
            </div>

            {modalError && (
              <CustomAlert variant="warning" message={modalError} />
            )}

            {/* NETWORK SELECTION */}
            <div className="flex flex-col gap-1">
              <p className="text-xs text-custom-grey">Select Network</p>

              <div className="flex flex-row flex-wrap overflow-x-auto gap-2 scrollbar-thin scrollbar-thumb-custom-grey/30 scrollbar-track-transparent">
                {supportedNetworks?.map((net: any) => (
                  <div
                    key={net.chain}
                    onClick={() => handleSelectNetwork(net)}
                    className={`
                      flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer
                      bg-custom-light-bg hover:bg-custom-light-bg/70 
                      ${
                        selectedNetwork?.chain === net.chain
                          ? "border border-custom-orange"
                          : ""
                      }
                    `}
                  >
                    <img src={net.logoUrl} className="w-6 h-6 rounded-full" />
                    <span className="text-sm w-full">{net.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTION BUTTON */}
            <Button
              disabled={!recipientAddress || !selectedNetwork}
              onClick={handleWithdraw}
              className="py-6 bg-custom-orange hover:bg-custom-orange/80"
            >
              Withdraw
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
