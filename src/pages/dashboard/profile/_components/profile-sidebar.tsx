import { Link, useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import profileIcon from "@/assets/icons/profile-icon.svg";
import leaderboardIcon from "@/assets/icons/leaderboard-icon.svg";
import kycIcon from "@/assets/icons/kyc-icon.svg";
import securityIcon from "@/assets/icons/security-icon.svg";
import referralsIcon from "@/assets/icons/referrals-icon.svg";
import accountStatementIcon from "@/assets/icons/account-statement-icon.svg";
import investmentCertificateIcon from "@/assets/icons/investment-certificate-icon.svg";
import contactUsIcon from "@/assets/icons/contact-us-icon.svg";
import deleteMyAccountIcon from "@/assets/icons/delete-my-account-icon.svg";
import logoutIcon from "@/assets/icons/logout-icon.svg";
import {
  RiUser2Fill,
  RiListOrdered,
  RiCheckboxLine,
  RiShieldUserLine,
  RiGroupLine,
  RiBookletLine,
} from "react-icons/ri";

const sideBarLinks = [
  {
    name: "Profile",
    icon: <RiUser2Fill className="w-6 h-6" />,
    path: "/dashboard/profile",
  },
  {
    name: "Leaderboard",
    icon: <RiListOrdered className="w-6 h-6" />,
    path: "/dashboard/profile/leaderboard",
  },
  {
    name: "KYC",
    icon: <RiCheckboxLine className="w-6 h-6" />,
    path: "/dashboard/profile/kyc",
  },
  {
    name: "Security",
    icon: <RiShieldUserLine className="w-6 h-6" />,
    path: "/dashboard/profile/security",
  },
  {
    name: "Referrals",
    icon: <RiGroupLine className="w-6 h-6" />,
    path: "/dashboard/profile/referrals",
  },
  {
    name: "Account Statment",
    icon: <RiBookletLine className="w-6 h-6" />,
    path: "/dashboard/profile/account-statement",
  },
  {
    name: "Investment Certificate",
    icon: (
      <img
        src={investmentCertificateIcon}
        alt="investment-certificate"
        className="border p-2 rounded-full w-10 h-10 object-contain"
      />
    ),
    path: "/dashboard/profile/investment-certificate",
  },
  {
    name: "Contact Us",
    icon: (
      <img
        src={contactUsIcon}
        alt="contact-us"
        className="border p-2 rounded-full w-10 h-10 object-contain"
      />
    ),
    path: "/dashboard/profile/contact-us",
  },
  {
    name: "Delete My Account",
    icon: (
      <img
        src={deleteMyAccountIcon}
        alt="delete-my-account"
        className="border p-2 rounded-full w-10 h-10 object-contain"
      />
    ),
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
    <div className="bg-custom-card rounded-lg px-6 py-6 min-w-72 w-fit hidden md:block h-fit max-h-[80-vh]">
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
          <img
            src={logoutIcon}
            alt="logout"
            className="border p-2 rounded-full border-red-700 w-10 h-10 object-contain"
          />
          LogOut
        </span>
      </button>
    </div>
  );
}
