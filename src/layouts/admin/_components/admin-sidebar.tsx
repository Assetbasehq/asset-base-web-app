import { Link, useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import {
  RiUser2Fill,
  RiGroupLine,
  RiLogoutBoxLine,
  RiDashboardLine,
  RiCoinsLine,
  RiBox3Line,
  RiMegaphoneLine,
  RiBarChart2Line,
  RiFileChart2Line,
  RiShieldStarLine,
  RiSettings3Line,
} from "react-icons/ri";

const sideBarLinks = [
  {
    name: "Overview",
    icon: <RiDashboardLine className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/dashboard",
  },
  {
    name: "Users",
    icon: <RiUser2Fill className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/dashboard/users",
  },
  {
    name: "Assets",
    icon: <RiCoinsLine className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/dashboard/assets",
  },
  {
    name: "Liquidity",
    icon: <RiBox3Line className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/dashboard/liquidity",
  },
  {
    name: "Campaigns",
    icon: <RiMegaphoneLine className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/dashboard/campaigns",
  },
  {
    name: "Analytics",
    icon: <RiBarChart2Line className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/dashboard/analytics",
  },
  {
    name: "Referrals",
    icon: <RiGroupLine className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/dashboard/referrals",
  },
  {
    name: "Financial Reports",
    icon: <RiFileChart2Line className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/dashboard/financial-reports",
  },
  {
    name: "Security",
    icon: <RiShieldStarLine className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/dashboard/security",
  },
  {
    name: "Settings",
    icon: <RiSettings3Line className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/dashboard/settings",
  },
];

export default function AdminSideBar() {
  const { logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const isActiveLink = (path: string | undefined) => {
    if (!path) return false;
    if (location.pathname === path) return true;
    return false;
  };

  const shouldShowOnMobile = location.pathname.endsWith("/account");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div
      className={cn(
        "bg-custom-card rounded-lg px-4 py-4 flex-col gap-2 md:gap-4 items-start h-fit w-full md:max-w-[300px] md:max-h-[80-vh]",
        // hidden by default on mobile, only show if ends with /account
        shouldShowOnMobile ? "flex md:flex" : "hidden md:flex"
      )}
    >
      <p className="text-custom-white">MAIN</p>
      {sideBarLinks.map((link) => (
        <Link
          key={link.path}
          className={cn(`text-sm sm:text-lg font-semibold block`, {
            "border-custom-orange text-custom-orange": isActiveLink(link.path),
          })}
          to={link.path}
        >
          <span className="flex items-center gap-2">
            <span
              className={cn("border p-2 rounded-full", {
                "border-custom-orange": isActiveLink(link.path),
              })}
            >
              {link.icon}
            </span>
            {link.name}
          </span>
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className="text-lg mt-12 font-semibold block text-red-700 cursor-pointer bg-transparent"
      >
        <span className="flex items-center gap-2 text-xs sm:text-lg ">
          <span className={cn("border p-2 border-red-700 rounded-full")}>
            <RiLogoutBoxLine className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />
          </span>
          LogOut
        </span>
      </button>
    </div>
  );
}
