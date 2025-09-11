// wagmiConfig.ts
import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask, coinbaseWallet, walletConnect } from "wagmi/connectors";

export const assetChain = {
  id: 42421,
  name: "Asset Chain Testnet",
  nativeCurrency: {
    name: "Asset",
    symbol: "RWA",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://enugu-rpc.assetchain.org"], // Replace with the actual RPC URL
    },
  },
  blockExplorers: {
    default: {
      name: "AssetChain Explorer",
      url: "https://scan-testnet.assetchain.org",
    },
  },
};

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, assetChain],
  connectors: [
    // metaMask(),
    // coinbaseWallet({ appName: "MyDApp" }),
    // walletConnect({ projectId: "YOUR_PROJECT_ID" }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [assetChain.id]: http(assetChain.rpcUrls.default.http[0]),
  },
});
