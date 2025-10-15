import AdminSideBar from "@/layouts/admin/_components/admin-sidebar";
import AdminNavbar from "./_components/admin-navbar";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div className="p-4 lg:p-8">
      <AdminNavbar />
      <div className="mt-4 lg:mt-8 flex flex-col gap-4">
        <p className="text-2xl font-medium text-start">Good Morning, Admin</p>
        <AdminSideBar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
