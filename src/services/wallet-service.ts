export class WalletService {
  static getAvailableWallets() {
    if (typeof window === "undefined" || !window.ethereum) return [];

    const eth = window.ethereum as any;

    console.log({
      providers: eth.providers,
      isMetaMask: eth.isMetaMask,
      isTrust: eth.isTrust,
    });

    const wallets: { name: string; provider: any }[] = [];

    // ✅ If multiple wallets exist (EIP-6963 supported)
    if (Array.isArray(eth.providers) && eth.providers.length > 0) {
      eth.providers.forEach((prov: any) => {
        if (prov.isMetaMask) wallets.push({ name: "MetaMask", provider: prov });
        else if (prov.isTrust || prov.isTrustWallet)
          wallets.push({ name: "Trust Wallet", provider: prov });
        else wallets.push({ name: "Unknown Wallet", provider: prov });
      });
      return wallets;
    }

    // Fallback detection when only one window.ethereum
    if (eth.isMetaMask && !eth.isTrust) {
      // If it's ONLY MetaMask
      wallets.push({ name: "MetaMask", provider: eth });
    } else if (eth.isTrust || eth.isTrustWallet) {
      // If it's ONLY Trust Wallet
      wallets.push({ name: "Trust Wallet", provider: eth });
    } else {
      // Default fallback
      wallets.push({ name: "Unknown Wallet", provider: eth });
    }

    return wallets;
  }
}
