import type {
  DestinationWalletType,
  ICurrencyOption,
  IWalletType,
} from "@/interfaces/deposit-interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface DepositState {
  selectedWallet: DestinationWalletType | null;
  destinationWallet: IWalletType | null;
  sourceCurrency: ICurrencyOption | null;

  // Actions
  setSelectedWallet: (wallet: DestinationWalletType | null) => void;
  setDestinationWallet: (wallet: IWalletType | null) => void;
  setSourceCurrency: (currency: ICurrencyOption | null) => void;
  resetDeposit: () => void;
}

export const useDepositStore = create<DepositState>()(
  persist(
    (set) => ({
      selectedWallet: null,
      destinationWallet: null,
      sourceCurrency: null,

      // Update selected wallet
      setSelectedWallet: (wallet) => set({ selectedWallet: wallet }),

      // Update destination wallet
      setDestinationWallet: (wallet) => set({ destinationWallet: wallet }),

      // Update source currency
      setSourceCurrency: (currency) => set({ sourceCurrency: currency }),

      // Reset all fields
      resetDeposit: () =>
        set({
          selectedWallet: null,
          destinationWallet: null,
          sourceCurrency: null,
        }),
    }),
    {
      name: "deposit-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// Hook for cleaner access to actions
export const useDepositActions = () => {
  const setSelectedWallet = useDepositStore((state) => state.setSelectedWallet);
  const setDestinationWallet = useDepositStore(
    (state) => state.setDestinationWallet
  );
  const setSourceCurrency = useDepositStore((state) => state.setSourceCurrency);
  const resetDeposit = useDepositStore((state) => state.resetDeposit);

  return {
    setSelectedWallet,
    setDestinationWallet,
    setSourceCurrency,
    resetDeposit,
  };
};
