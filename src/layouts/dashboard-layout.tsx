import ScrollToTop from "@/components/custom/scroll-to-top";
import Navbar from "@/components/shared/navbar";
import ThemeSwitcher from "@/components/shared/theme-switcher";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="bg-custom-base pb-22 lg:pb-0">
      <div className="flex flex-col min-h-screen bg-custom-white text-white w-full max-w-[1440px] mx-auto">
        <Navbar />
        <main className="flex-1 p-4 bg-custom-base">
          <Outlet />
        </main>
        <ThemeSwitcher />
        <ScrollToTop />
      </div>
    </div>
  );
}
