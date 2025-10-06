import { Link, useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import {
  RiUser2Fill,
  RiListOrdered,
  RiCheckboxLine,
  RiShieldUserLine,
  RiGroupLine,
  RiBookletLine,
  RiAwardLine,
  RiPhoneLine,
  RiDeleteBinLine,
  RiLogoutBoxLine,
  RiBankLine,
} from "react-icons/ri";

const sideBarLinks = [
  {
    name: "Overview",
    icon: <RiUser2Fill className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/account/profile",
  },
  {
    name: "Users",
    icon: <RiListOrdered className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/account/leaderboard",
  },
  {
    name: "Assets",
    icon: <RiCheckboxLine className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/account/kyc",
  },
  {
    name: "Liquidity",
    icon: <RiShieldUserLine className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/account/security",
  },
  {
    name: "Campaigns",
    icon: <RiGroupLine className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/account/referrals",
  },
  {
    name: "Campaigns",
    icon: <RiBankLine className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/account/banks-and-cards",
  },
  {
    name: "Analytics",
    icon: <RiBookletLine className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/account/account-statement",
  },
  {
    name: "Referrals",
    icon: <RiAwardLine className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/account/investment-certificate",
  },
  {
    name: "Financial Reports",
    icon: <RiPhoneLine className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/account/contact-us",
  },
  {
    name: "Security",
    icon: <RiDeleteBinLine className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/account/delete-account",
  },
  {
    name: "Settings",
    icon: <RiDeleteBinLine className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />,
    path: "/admin/account/delete-account",
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
        className="text-lg font-semibold block text-red-700 cursor-pointer bg-transparent"
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
