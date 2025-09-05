import type { IUser } from "@/interfaces/user.interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface WalletState {
  balance: number;
  address: string;
  provider: any;
  updateWalletBalance: (balance: number) => void;
  updateWalletAddress: (address: string) => void;
  updateWalletProvider: (provider: any) => void;
  disconnectWallet: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      balance: 0,
      address: "",
      provider: null,
      updateWalletBalance: (balance: number) => set({ balance }),
      updateWalletAddress: (address: string) => set({ address }),
      updateWalletProvider: (provider: any) => set({ provider }),
      disconnectWallet: () => set({ balance: 0, address: "", provider: null }),
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
