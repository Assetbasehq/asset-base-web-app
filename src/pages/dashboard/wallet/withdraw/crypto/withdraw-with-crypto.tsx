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
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { ConnectWalletModal } from "@/components/shared/connect-wallet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { walletService } from "@/api/wallet.api";
import { useOutletContext } from "react-router";
import { Loader } from "lucide-react";
import { FormatService } from "@/services/format-service";
import { cn } from "@/lib/utils";
import SuccessModal from "@/components/modals/success-modal";
import { ASSETCHAIN_USDT_TOKEN } from "@/lib/wagmi.config";

interface WithdrawContext {
  amountToWithdraw: {
    amount: number | null;
    formattedAmount: string;
  } | null;
  currency: "usd" | "ngn";
}

export default function WithdrawToCrypto() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [connectWalletOpen, setConnectWalletOpen] = useState(false);

  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [recipientAddress, setRecipientAddress] = useState("");

  const { amountToWithdraw, currency } = useOutletContext<WithdrawContext>();

  const { data: supportedNetworks } = useSupportedNetworks({});
  const { data: supportedAssets } = useSupportedAssets({});

  const {
    address,
    chainId,
    isConnected,
    connector: activeConnector,
  } = useAccount();
  const { disconnect } = useDisconnect();

  const queryClient = useQueryClient();

  const { data: balanceData, refetch: refetchBalance } = useBalance({
    address: address,
    token: ASSETCHAIN_USDT_TOKEN.address as `0x${string}`,
    chainId: chainId,
  });

  console.log({ balanceData, activeConnector, refetchBalance });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: walletService.sendToExternalAddress,
    onSuccess: async (data) => {
      console.log({ data });
      setSuccess(data.message);
      setWithdrawOpen(false);
      setIsSuccessModalOpen(true);
      const newB = await refetchBalance();

      console.log({ newB });
    },
    onError: (error) => {
      console.log({ error });
      setModalError(error.message);
      setSuccess(null);
    },
  });

  const handleOpenModal = () => {
    setWithdrawOpen(true);
  };

  const handleSelectNetwork = (network: any) => {
    setError(null);
    setModalError(null);
    setSelectedNetwork(network);
  };

  const handleSelectAsset = (asset: any) => {
    setError(null);
    setModalError(null);
    setSelectedAsset(asset);
  };

  const handleWithdraw = () => {
    setModalError(null);
    setSuccess(null);
    if (!recipientAddress) return setModalError("Enter destination address");
    if (!selectedNetwork) return setModalError("Select a network");
    if (!amountToWithdraw?.amount) {
      return setModalError("Please provide an amount to withdraw");
    }
    if (selectedAsset.network.chain !== selectedNetwork.chain) {
      return setModalError("Network mismatch");
    }

    console.log({
      recipientAddress,
      network: selectedNetwork,
    });

    let payload = {
      amount: amountToWithdraw?.amount,
      assetId: selectedAsset.id,
      address: recipientAddress,
      network: selectedNetwork.chain,
    };

    console.log({ payload });

    // Trigger withdrawal logic here
    // e.g. call backend: /wallet/withdraw

    mutateAsync(payload);
    // setWithdrawOpen(false);
  };

  const handleUseConnectedWallet = () => {
    if (!activeConnector) {
      //  Wallet not connected → show connect wallet modal
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

  const btnText = isPending ? (
    <span className="flex items-center gap-2">
      <Loader className=" animate-spin" /> Processing...
    </span>
  ) : (
    <span>Withdraw</span>
  );

  return (
    <div className="text-start flex flex-col gap-2">
      <ConnectWalletModal
        open={connectWalletOpen}
        setOpen={setConnectWalletOpen}
        onSuccess={() => {
          setConnectWalletOpen(false);
          setWithdrawOpen(true);
        }}
      />
      <p className="text-sm font-light text-custom-grey">
        Withdraw to crypto wallet
      </p>

      {error && <CustomAlert variant="warning" message={error} />}

      <Button
        disabled={!amountToWithdraw}
        onClick={handleOpenModal}
        className="py-6 md:py-8 bg-custom-light-bg flex justify-start text-custom-grey hover:bg-custom-light-bg/80 cursor-pointer w-full"
      >
        <img src={images.assetBase.logo} alt={images.assetBase.alt} />
        <span>Send directly to an external address</span>
      </Button>

      <Button
        disabled={!amountToWithdraw}
        onClick={handleUseConnectedWallet}
        className="py-6 md:py-8 bg-custom-light-bg flex justify-start text-custom-grey hover:bg-custom-light-bg/80 cursor-pointer w-full"
      >
        <img src={images.assetBase.logo} alt={images.assetBase.alt} />
        <span>Send to my connected wallet</span>
      </Button>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Withdrawal Successful"
        description="Your withdrawal request has been successfully processed."
        buttonText="Close"
      />

      <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
        <DialogContent className="bg-custom-card border border-border">
          <DialogHeader>
            <DialogTitle className="text-sm">
              Withdraw to External Address
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-2 font-geist">
            <p className="">
              You are about to withdraw{" "}
              <span className="font-semibold">
                {FormatService.formatCurrency(
                  amountToWithdraw?.amount,
                  currency
                )}
              </span>
            </p>

            {activeConnector && (
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                  <p>Connected Wallet - </p>
                  <div className="flex items-center gap-1">
                    <p className=" font-medium">{activeConnector.name}</p>
                    <img
                      className="w-5"
                      src={activeConnector.icon}
                      alt={activeConnector.name}
                    />
                  </div>
                </div>
                <Button
                  className={cn(
                    `bg-custom-light-bg w-30 text-xs !p-0 cursor-pointer`
                  )}
                  variant="destructive"
                  onClick={() => disconnect()}
                >
                  Disconnect
                </Button>
              </div>
            )}

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
                  setSuccess(null);
                }}
                placeholder="0x..."
                className="py-6"
              />
            </div>

            {modalError && (
              <CustomAlert variant="warning" message={modalError} />
            )}
            {success && <CustomAlert variant="success" message={success} />}

            {/* ASSET SELECTION */}
            <div className="flex flex-col gap-1">
              <p className="text-xs text-custom-grey">Select Asset</p>

              <div className="flex flex-row flex-wrap overflow-x-auto gap-2 scrollbar-thin scrollbar-thumb-custom-grey/30 scrollbar-track-transparent">
                {supportedAssets?.map((asset: any) => (
                  <div
                    key={asset.id}
                    onClick={() => handleSelectAsset(asset)}
                    className={`
                      flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer
                      bg-custom-light-bg hover:bg-custom-light-bg/70 
                      ${
                        selectedAsset?.id === asset.id
                          ? "border border-custom-orange"
                          : ""
                      }
                    `}
                  >
                    <img src={asset.logoUrl} className="w-6 h-6 rounded-full" />
                    <span className="text-sm w-full">{asset.name}</span>
                  </div>
                ))}
              </div>
            </div>

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
              disabled={
                !recipientAddress ||
                !selectedNetwork ||
                !selectedAsset ||
                !amountToWithdraw ||
                isPending
              }
              onClick={handleWithdraw}
              className=" btn-primary w-full rounded-full py-5 font-geist tracking-wide"
            >
              {btnText}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
