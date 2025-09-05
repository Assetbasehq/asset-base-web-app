import { BrowserProvider, ethers } from "ethers";
import { useEffect, useState } from "react";

export const useWallectConnector = () => {
  const [error, setError] = useState<string | null>(null);
  const [providers, setProviders] = useState<EIP6963ProviderDetail[]>([]);
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [selectedProvider, setSelectedProvider] =
    useState<EIP6963ProviderDetail | null>(null);

  useEffect(() => {
    const onAnnouncement = (event: EIP6963AnnounceProviderEvent) => {
      const { detail } = event;
      setProviders((prevProviders) => {
        // Prevent duplicates based on UUID
        if (!prevProviders.some((p) => p.info.uuid === detail.info.uuid)) {
          return [...prevProviders, detail];
        }
        return prevProviders;
      });
    };

    window.addEventListener(
      "eip6963:announceProvider",
      onAnnouncement as unknown as EventListener
    );
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    return () => {
      window.removeEventListener(
        "eip6963:announceProvider",
        onAnnouncement as unknown as EventListener
      );
    };
  }, []);

  const STORAGE_KEY = "connectedWallet";

  useEffect(() => {
    const savedWallet = localStorage.getItem(STORAGE_KEY);
    if (!savedWallet) return;

    try {
      const { providerName, savedAddress } = JSON.parse(savedWallet);
      // Match provider by UUID
      const existingProvider = providers.find(
        (p) => p.info.name === providerName
      );

      if (existingProvider && savedAddress) {
        connectWallet(existingProvider.provider); // silent reconnect
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [providers]);

  const connectWallet = async (provider: any, onConnect?: () => void) => {
    setError(null);
    try {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      const connectedAddress = accounts[0];
      setAddress(connectedAddress);

      // Store selected provider
      const providerDetail = providers.find((p) => p.provider === provider);
      if (providerDetail) {
        setSelectedProvider(providerDetail);
      }

      // Fetch balance
      const ethersProvider = new BrowserProvider(provider as any);
      const balanceWei = await ethersProvider.getBalance(connectedAddress);
      const actualBalance = ethers.formatEther(balanceWei);
      setBalance(parseFloat(actualBalance));

      // Persist to localStorage
      if (providerDetail) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            providerName: providerDetail.info.name,
            savedAddress: connectedAddress,
          })
        );
      }

      if (onConnect) {
        onConnect();
      }

      // Listen for account change
      provider.on?.("accountsChanged", (newAccounts: string[]) => {
        if (newAccounts.length > 0) {
          setAddress(newAccounts[0]);
          if (providerDetail) {
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({
                providerName: providerDetail.info.name,
                savedAddress: connectedAddress,
              })
            );
          }
        } else {
          // Wallet fully disconnected
          disconnectWallet();
        }
      });

      // Listen for network change
      provider.on?.("chainChanged", () => {
        window.location.reload();
      });

      // Further logic to handle connected accounts
    } catch (error) {
      //   if (error.code === 4001) {
      //     setError({
      //       message: "User rejected request",
      //       type: "info",
      //     });
      //   }
      console.error("Error connecting to wallet:", error);
    }
  };

  const disconnectWallet = async () => {
    setAddress("");
    setBalance(0);
    setSelectedProvider(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    error,
    providers,
    connectWallet,
    disconnectWallet,
    address,
    balance,
    selectedProvider,
  };
};
