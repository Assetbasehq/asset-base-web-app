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
  actions: {
    setUser: (user: IUser | null) => Promise<void>;
    setAuthCredentials: (creds: AuthCredentials | null) => void;
  };
}

const actions = (
  set: (
    state: Partial<UserState> | ((state: UserState) => Partial<UserState>)
  ) => void
) => ({
  setUser: async (user: IUser | null) => {
    if (!user) return;
    set({ user });
  },
  setAuthCredentials: (creds: AuthCredentials | null) => {
    set({ authCredentials: creds });
  },
});

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      authCredentials: null,
      actions: actions(set),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useAuthActions = () => {
  const { actions } = useAuthStore();
  return actions;
};
