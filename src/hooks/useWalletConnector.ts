import { BrowserProvider, ethers } from "ethers";
import { useEffect, useState } from "react";

export const useWallectConnector = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [providers, setProviders] = useState<EIP6963ProviderDetail[]>([]);
  // const [connectedProviders, setConnectedProviders] = useState<
  //   EIP6963ProviderDetail[]
  // >([]);
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

  // ---- 2. Check which wallets are connected ----
  // useEffect(() => {
  //   const checkConnectedProviders = async () => {
  //     console.log("Checking connected providers...");
  //     console.log({ providers });

  //     const results: EIP6963ProviderDetail[] = [];

  //     for (const providerDetail of providers) {
  //       try {
  //         const accounts = (await providerDetail.provider.request({
  //           method: "eth_accounts", // No popup, just checks silently
  //         })) as string[];

  //         if (accounts.length > 0) {
  //           console.log("Connected address:", accounts[0]);
  //           results.push(providerDetail);
  //         }
  //       } catch (err) {
  //         console.error(
  //           `Error checking accounts for provider ${providerDetail.info.name}:`,
  //           err
  //         );
  //       }
  //     }

  //     console.log({ results });
      

  //     setConnectedProviders(results);
  //   };

  //   if (providers.length > 0) {
  //     checkConnectedProviders();
  //   }
  // }, [providers]);

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
    setIsConnecting(true);
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
                savedAddress: newAccounts[0],
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
    } catch (error: any) {
      if (error.code === 4001) {
        setError("User rejected wallet connection request.");
      } else {
        setError(error.message || "Unknown error occurred");
      }
      console.error("Error connecting to wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    setAddress("");
    setBalance(0);
    setSelectedProvider(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    isConnecting,
    error,
    providers,
    connectWallet,
    disconnectWallet,
    address,
    balance,
    selectedProvider,
  };
};
