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

// constants/tokens.ts
export const USDT_TOKEN = {
  symbol: "USDT",
  name: "Tether USD",
  address: "0x04f868C5b3F0A100a207c7e9312946cC2c48a7a3",
  decimals: 18, // USDT usually has 6 decimals
  logo: "/logos/usdt.svg",
  abi: [
    {
      name: "transfer",
      type: "function",
      stateMutability: "nonpayable",
      inputs: [
        { name: "recipient", type: "address" },
        { name: "amount", type: "uint256" },
      ],
      outputs: [{ name: "", type: "bool" }],
    },
  ],
};

//scan.assetchain.org/address/0x26E490d30e73c36800788DC6d6315946C4BbEa24

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
