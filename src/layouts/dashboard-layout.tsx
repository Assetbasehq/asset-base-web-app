import Navbar from "@/components/shared/navbar";
import ThemeSwitcher from "@/components/shared/theme-switcher";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="bg-custom-base">
      <div className="flex flex-col min-h-screen bg-custom-white text-white w-full max-w-[1920px] mx-auto">
        <Navbar />
        <main className="flex-1 p-4 md:p-8 bg-custom-base pb-28">
          <Outlet />
        </main>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
