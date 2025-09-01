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
} from "react-icons/ri";

const sideBarLinks = [
  {
    name: "Profile",
    icon: <RiUser2Fill className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/account/profile",
  },
  {
    name: "Leaderboard",
    icon: <RiListOrdered className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/account/leaderboard",
  },
  {
    name: "KYC",
    icon: <RiCheckboxLine className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/account/kyc",
  },
  {
    name: "Security",
    icon: <RiShieldUserLine className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/account/security",
  },
  {
    name: "Referrals",
    icon: <RiGroupLine className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/account/referrals",
  },
  {
    name: "Account Statment",
    icon: <RiBookletLine className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/account/account-statement",
  },
  {
    name: "Investment Certificate",
    icon: <RiAwardLine className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/account/investment-certificate",
  },
  {
    name: "Contact Us",
    icon: <RiPhoneLine className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/account/contact-us",
  },
  {
    name: "Delete My Account",
    icon: <RiDeleteBinLine className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/account/delete-account",
  },
];

export default function ProfileSideBar() {
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
        "bg-custom-card rounded-lg px-6 py-6 min-w-80 flex-col items-start h-fit w-full md:max-w-[300px] md:max-h-[80-vh]",
        // hidden by default on mobile, only show if ends with /account
        shouldShowOnMobile ? "flex md:flex" : "hidden md:flex"
      )}
    >
      {sideBarLinks.map((link) => (
        <Link
          key={link.path}
          className={cn(`text-lg font-semibold py-2 block`, {
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
        className="text-lg font-semibold py-2 block text-red-700 cursor-pointer bg-transparent"
      >
        <span className="flex items-center gap-3 ">
          <span className={cn("border p-2 border-red-700 rounded-full")}>
            <RiLogoutBoxLine className="w-4 h-4 lg:w-6 lg:h-6" />
          </span>
          LogOut
        </span>
      </button>
    </div>
  );
}
