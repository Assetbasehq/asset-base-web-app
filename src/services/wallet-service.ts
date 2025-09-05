export class WalletService {
  static getAvailableWallets() {
    if (!window || !window.ethereum) return [];

    console.log({
      length: window.ethereum.providers?.length,
      providers: window.ethereum.providers,
      isMetaMask: window.ethereum.isMetaMask,
      isTrust: window.ethereum.isTrust,
      isTrustWallet: window.ethereum.isTrust,
    });

    // If multiple wallets exist
    if (window.ethereum.providers?.length) {
      const wallets = window.ethereum.providers.map((prov) => {
        if (prov.isMetaMask) return { name: "MetaMask", provider: prov };
        if (prov.isTrust) return { name: "Trust Wallet", provider: prov };
        return { name: "Unknown Wallet", provider: prov };
      });

      console.log("wallets", wallets);

      return wallets;
    }

    // Single wallet installed
    if (window.ethereum.isMetaMask) {
      return [{ name: "MetaMask", provider: window.ethereum }];
    }
    if (window.ethereum.isTrust) {
      return [{ name: "Trust Wallet", provider: window.ethereum }];
    }

    return [{ name: "Unknown Wallet", provider: window.ethereum }];
  }
}
