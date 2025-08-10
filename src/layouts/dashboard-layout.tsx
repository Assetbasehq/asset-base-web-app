import Navbar from "@/components/shared/navbar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white w-full p-2 md:p-4 lg:p-6">
      <Navbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
