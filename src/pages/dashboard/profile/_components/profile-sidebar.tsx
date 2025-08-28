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
    path: "/dashboard/profile",
  },
  {
    name: "Leaderboard",
    icon: <RiListOrdered className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/profile/leaderboard",
  },
  {
    name: "KYC",
    icon: <RiCheckboxLine className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/profile/kyc",
  },
  {
    name: "Security",
    icon: <RiShieldUserLine className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/profile/security",
  },
  {
    name: "Referrals",
    icon: <RiGroupLine className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/profile/referrals",
  },
  {
    name: "Account Statment",
    icon: <RiBookletLine className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/profile/account-statement",
  },
  {
    name: "Investment Certificate",
    icon: <RiAwardLine className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/profile/investment-certificate",
  },
  {
    name: "Contact Us",
    icon: <RiPhoneLine className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/profile/contact-us",
  },
  {
    name: "Delete My Account",
    icon: <RiDeleteBinLine className="w-4 h-4 lg:w-6 lg:h-6" />,
    path: "/dashboard/profile/delete-account",
  },
];

export default function ProfileSideBar() {
  const { logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="bg-custom-card rounded-lg px-6 py-6 min-w-72 w-fit hidden md:flex flex-col items-start h-fit max-h-[80-vh]">
      {sideBarLinks.map((link) => (
        <Link
          key={link.path}
          className={cn(`text-lg font-semibold py-2 block`, {
            "text-custom-orange": isActiveLink(link.path),
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
