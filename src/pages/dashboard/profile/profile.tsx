import { Outlet, useLocation } from "react-router";
import ProfileSideBar from "./_components/profile-sidebar";
import { cn } from "@/lib/utils";
import BackButton from "./_components/back-button";

export default function Profile() {
  const location = useLocation();
  const shouldShowOnMobile = location.pathname.endsWith("/account");

  return (
    <div className="text-custom-white-text">
      <h2 className="text-3xl font-semibold text-left mb-4">Account</h2>
      <div className="flex gap-2">
        <ProfileSideBar />
        <div
          className={cn(
            `bg-custom-card w-full min-h-[calc(100vh-230px)] overflow-y-scroll rounded-xl no-scrollbar`,
            {
              " hidden": shouldShowOnMobile,
            }
          )}
        >
          <BackButton />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
