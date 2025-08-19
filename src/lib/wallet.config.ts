// import { createWeb3Modal } from "@web3modal/wagmi/react";
// import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
// import { SolanaAdapter, SolanaChains } from "@web3modal/solana";
// import { mainnet, polygon, bsc } from "wagmi/chains";

// // ✅ Replace with your project ID from https://cloud.walletconnect.com
// const projectId = "YOUR_PROJECT_ID";

// // ---- EVM Config (wagmi) ----
// const chains = [mainnet, polygon, bsc];
// const wagmiConfig = defaultWagmiConfig({
//   chains,
//   projectId,
//   metadata: {
//     name: "My DApp",
//     description: "Multi-chain wallet connection",
//     url: "https://mydapp.com",
//     icons: ["https://avatars.githubusercontent.com/u/37784886"],
//   },
// });

// // ---- Solana Config ----
// const solanaConfig = new SolanaAdapter({
//   chains: [SolanaChains.mainnet],
// });

// // ---- Create modal instance ----
// createWeb3Modal({
//   wagmiConfig,
//   solanaConfig,
//   projectId,
//   themeMode: "light", // or "dark"
//   themeVariables: {
//     "--w3m-accent": "#000000",
//   },
// });

// export { wagmiConfig };
