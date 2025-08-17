import { Outlet } from "react-router";
import ProfileSideBar from "./_components/profile-sidebar";

export default function Profile() {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-left mb-4">Account</h2>
      <div className="flex gap-2">
        <ProfileSideBar />
        <div className="w-full max-h-[calc(100vh-230px)] overflow-y-scroll rounded-xl no-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
