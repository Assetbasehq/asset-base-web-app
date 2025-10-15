import type { IUser } from "@/interfaces/user.interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AdminState {
  user: IUser | null;
  setAdmin: (user: IUser | null) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      user: null,
      verificationStatus: null,
      authCredentials: null,
      setAdmin: (user: IUser | null) => {
        set({ user });
      },
      logout: () => {
        localStorage.removeItem("accessToken");
        set({ user: null });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// Updated hooks
export const useAdminActions = () => {
  const setAdmin = useAdminStore((state) => state.setAdmin);
  return { setAdmin };
};
