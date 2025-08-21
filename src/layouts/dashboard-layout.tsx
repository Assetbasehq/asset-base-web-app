import Navbar from "@/components/shared/navbar";
import ThemeSwitcher from "@/components/shared/theme-switcher";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-custom-white text-white w-full">
      <Navbar />
      <main className="flex-1 p-4 md:p-8 bg-custom-base">
        <Outlet />
      </main>
      <ThemeSwitcher />
    </div>
  );
}
