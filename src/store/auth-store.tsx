import type { IUser } from "@/interfaces/user.interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthCredentials {
  email: string;
  password: string;
}

interface IUserVerificationStatus {
  account_id: string;
  email_status: "verified" | "unverified";
  id_status: "verified" | "unverified";
}

export interface UserState {
  user: IUser | null;
  verificationStatus: IUserVerificationStatus | null;
  authCredentials: AuthCredentials | null;
  setUser: (user: IUser | null) => void;
  setVerificationStatus: (data: IUserVerificationStatus) => void;
  isUserVerified: () => boolean;
  setAuthCredentials: (creds: AuthCredentials | null) => void;
  logout: () => void;
}

export const useAuthStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      verificationStatus: null,
      authCredentials: null,
      setUser: (user: IUser | null) => {
        set({ user });
      },
      setVerificationStatus: (data: IUserVerificationStatus) => {
        set({ verificationStatus: data });
      },
      isUserVerified: () => {
        const user = get().user;
        const verificationStatus = get().verificationStatus;

        if (!user || !verificationStatus) return false;

        return (
          verificationStatus.email_status === "verified" &&
          verificationStatus.id_status === "verified"
        );
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
