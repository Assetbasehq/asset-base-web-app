import type { IUser } from "@/interfaces/user.interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthCredentials {
  email: string;
  password: string;
}

export interface UserState {
  user: IUser | null;
  authCredentials: AuthCredentials | null;
  setUser: (user: IUser | null) => void;
  setAuthCredentials: (creds: AuthCredentials | null) => void;
  logout: () => void;
}

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      authCredentials: null,
      setUser: (user: IUser | null) => {
        set({ user });
      },
      setAuthCredentials: (creds: AuthCredentials | null) => {
        set({ authCredentials: creds });
      },
      logout: () => {
        localStorage.removeItem("accessToken");
        set({ user: null, authCredentials: null });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// Updated hooks
export const useAuthActions = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthCredentials = useAuthStore((state) => state.setAuthCredentials);
  return { setUser, setAuthCredentials };
};
