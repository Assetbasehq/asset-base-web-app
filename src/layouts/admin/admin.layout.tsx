import AdminSideBar from "@/layouts/admin/_components/admin-sidebar";
import AdminNavbar from "./_components/admin-navbar";
import { Outlet } from "react-router";
import ThemeSwitcher from "@/components/shared/theme-switcher";

export default function AdminLayout() {
  return (
    <div className="p-4 lg:p-8">
      <AdminNavbar />
      <p className="text-2xl font-medium text-start">Good Morning, Admin</p>
      <div className="mt-4 lg:mt-8 flex gap-4">
        <AdminSideBar />
        <main className="w-full">
          <Outlet />
          <ThemeSwitcher />
        </main>
      </div>
    </div>
  );
}
