import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle("dark", theme === "dark");
      },
      toggleTheme: () => {
        const newTheme = get().theme === "light" ? "dark" : "light";
        set({ theme: newTheme });
        document.documentElement.classList.toggle("dark", newTheme === "dark");
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        // Runs on app load — apply class
        if (state?.theme) {
          document.documentElement.classList.toggle(
            "dark",
            state.theme === "dark"
          );
        }
      },
    }
  )
);
