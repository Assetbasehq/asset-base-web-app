import { Link, useLocation } from "react-router";
import {
  BriefcaseBusiness,
  ChartBar,
  ClipboardList,
  Cog,
  Download,
  Folder,
  Globe,
  LogOut,
  Trash,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sideBarLinks = [
  {
    name: "Profile",
    icon: (
      <User
        size={38}
        className="border p-2 rounded-full text-custom-black-text"
      />
    ),
    path: "/dashboard/profile",
  },
  {
    name: "Leaderboard",
    icon: (
      <ChartBar
        size={38}
        className="border p-2 rounded-full text-custom-black-text"
      />
    ),
    path: "/dashboard/profile/leaderboard",
  },
  {
    name: "KYC",
    icon: (
      <ClipboardList
        size={38}
        className="border p-2 rounded-full text-custom-black-text"
      />
    ),
    path: "/dashboard/profile/kyc",
  },
  {
    name: "Security",
    icon: (
      <Cog
        size={38}
        className="border p-2 rounded-full text-custom-black-text"
      />
    ),
    path: "/dashboard/profile/security",
  },
  {
    name: "Referrals",
    icon: (
      <BriefcaseBusiness
        size={38}
        className="border p-2 rounded-full text-custom-black-text"
      />
    ),
    path: "/dashboard/profile/referrals",
  },
  {
    name: "Account Statment",
    icon: (
      <Download
        size={38}
        className="border p-2 rounded-full text-custom-black-text"
      />
    ),
    path: "/dashboard/profile/account-statement",
  },
  {
    name: "Investment Certificate",
    icon: (
      <Folder
        size={38}
        className="border p-2 rounded-full text-custom-black-text"
      />
    ),
    path: "/dashboard/profile/investment-certificate",
  },
  {
    name: "Contact Us",
    icon: (
      <Globe
        size={38}
        className="border p-2 rounded-full text-custom-black-text"
      />
    ),
    path: "/dashboard/profile/contact-us",
  },
  {
    name: "Delete My Account",
    icon: (
      <Trash
        size={38}
        className="border p-2 rounded-full text-custom-black-text"
      />
    ),
    path: "/dashboard/profile/delete-account",
  },
];

export default function ProfileSideBar() {
  const location = useLocation();

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const logOut = () => {};

  return (
    <div className="bg-custom-card rounded-lg px-6 py-6 min-w-72 w-fit hidden md:block h-fit max-h-[80-vh]">
      {sideBarLinks.map((link) => (
        <Link
          key={link.path}
          className={cn(`text-lg font-semibold py-2 block`, {
            "text-primary": isActiveLink(link.path),
          })}
          to={link.path}
        >
          <span className="flex items-center gap-2">
            {link.icon}
            {link.name}
          </span>
        </Link>
      ))}
      <div className="text-lg font-semibold py-2 block text-red-700">
        <span className="flex items-center gap-3 ">
          <LogOut
            size={38}
            className="border p-2 rounded-full border-red-700"
          />
          LogOut
        </span>
      </div>
    </div>
  );
}
