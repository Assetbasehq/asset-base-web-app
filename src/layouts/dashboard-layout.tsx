import ScrollToTop from "@/components/custom/scroll-to-top";
import Navbar from "@/components/shared/navbar";
import ThemeSwitcher from "@/components/shared/theme-switcher";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="bg-custom-base pb-22 lg:pb-0">
      <div className="flex flex-col min-h-screen bg-custom-white text-white w-full">
        <Navbar />
        <main className=" bg-custom-base flex-1">
          <div className="p-4 max-w-custom mx-auto">
            <Outlet />
          </div>
        </main>
        <ThemeSwitcher />
        <ScrollToTop />
      </div>
    </div>
  );
}
