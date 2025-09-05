import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface WalletState {
  balance: number;
  address: string;
  providers: any;
  subscribe: (callback: () => void) => void;
  updateWalletBalance: (balance: number) => void;
  updateWalletAddress: (address: string) => void;
  updateWalletProvider: (provider: any) => void;
  disconnectWallet: () => void;
}
// store.tsx

declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent<EIP6963AnnounceProviderEvent>;
  }
}

let providers: EIP6963ProviderDetail[] = [];

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      balance: 0,
      address: "",
      providers: providers,
      subscribe: (callback: () => void) => {
        function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
          // Prevent adding a provider if it already exists in the list based on its uuid.
          if (providers.some((p) => p.info.uuid === event.detail.info.uuid))
            return;

          // Add the new provider to the list and call the provided callback function.
          providers = [...providers, event.detail];
          callback();
        }

        window.addEventListener(
          "eip6963:announceProvider",
          onAnnouncement as any as EventListener
        );
        window.dispatchEvent(new Event("eip6963:requestProvider"));

        return () =>
          window.removeEventListener(
            "eip6963:announceProvider",
            onAnnouncement as any as EventListener
          );
      },
      updateWalletBalance: (balance: number) => set({ balance }),
      updateWalletAddress: (address: string) => set({ address }),
      updateWalletProvider: (providers: any) => set({ providers }),
      disconnectWallet: () => set({ balance: 0, address: "", providers: null }),
    }),
    {
      name: "wallet-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// Updated hooks
// export const useWalletActions = () => {
//   const actions = useWalletStore((state) => {
//     updateWalletBalance: state.updateWalletBalance;
//     updateWalletAddress: state.updateWalletAddress;
//     updateWalletProvider: state.updateWalletProvider;
//   });
//   console.log(actions);
//   return actions;
// };
