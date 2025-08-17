import Navbar from "@/components/shared/navbar";
import ThemeSwitcher from "@/components/shared/theme-switcher";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white w-full md:p-4 lg:p-6">
      <Navbar />
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
      <ThemeSwitcher />
    </div>
  );
}
