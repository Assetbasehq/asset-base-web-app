import { useThemeStore } from "@/store/theme-store";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button
      onClick={toggleTheme}
      className="px-3 py-2 rounded bg-gray-500 dark:bg-gray-800 dark:text-white fixed bottom-4 right-16 z-50 cursor-pointer"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}
