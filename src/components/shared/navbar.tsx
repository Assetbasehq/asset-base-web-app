import { Button } from "../ui/button";
import { Link, NavLink } from "react-router";
import { Bell, Menu, Plus, Search, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AssetBaseBetaWhite } from "./asset-base-beta";
import {
  RiWalletLine,
  RiBriefcaseLine,
  RiStockLine,
  RiBox3Line,
  RiLayoutGridLine,
} from "react-icons/ri";

const links = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <RiLayoutGridLine className="w-6 h-6" />,
  },
  {
    label: "Wallet",
    to: "/dashboard/wallet",
    icon: <RiWalletLine className="w-6 h-6" />,
  },
  {
    label: "Markets",
    to: "/dashboard/markets",
    icon: <RiStockLine className="w-6 h-6" />,
  },
  {
    label: "Liquidity",
    to: "/dashboard/liquidity",
    icon: <RiBox3Line className="w-6 h-6" />,
  },
  {
    label: "Portfolio",
    to: "/dashboard/portfolio",
    icon: <RiBriefcaseLine className="w-6 h-6" />,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between gap-4 p-4 md:p-8 bg-fixed-base text-white">
      <div className="flex items-center gap-6">
        {/* Logo + Title + Beta Badge */}
        <AssetBaseBetaWhite />

        {/* Navigation Links */}
        <ul className="hidden lg:flex gap-4">
          {links.map(({ label, to, icon }) => (
            <li key={to} className="">
              <NavLink
                to={to}
                end={to === "/dashboard"}
                className={({ isActive }) => {
                  return cn(
                    `w-fit  py-2 px-4 rounded-t-lg border-b border-fixed-card bg-fixed-card transition-all duration-300 flex items-center gap-2 hover:text-orange-500 cursor-pointer`,
                    {
                      "border-custom-orange rounded-b-none text-custom-orange":
                        isActive,
                    }
                  );
                }}
              >
                <span className="flex items-center gap-4 text-xs md:text-sm font-semibold">
                  <span className="hidden xl:block"> {icon}</span>
                  {label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-4">
        {/* Connect Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Button className="bg-orange-500 px-4 py-2 rounded-full w-fit flex items-center gap-2 font-semibold">
            <span>
              <Plus size={20} className="" />
            </span>
            Connect
          </Button>

          <Bell
            size={34}
            className="border p-2 rounded-full text-white border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
          />
          <Link to="/dashboard/profile">
            <User
              size={34}
              className="border p-2 rounded-full text-white border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
            />
          </Link>
          <Search
            size={34}
            className="border p-2 rounded-full text-white border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
          />
        </div>

        {/* Hamburger Icon - Mobile Only */}
        <button
          className="lg:hidden p-2 text-white cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Slide-out Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-64 bg-custom-gray-muted text-white shadow-lg transform transition-transform duration-300 z-50 ",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <Bell
            size={34}
            className="border p-2 rounded-full text-white border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
          />
          <Link to="/dashboard/profile">
            <User
              size={34}
              className="border p-2 rounded-full text-white border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
            />
          </Link>
          <Search
            size={34}
            className="border p-2 rounded-full text-white border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
          />
          <Button
            className="bg-gray-800 hover:bg-gray-800/90 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            {/* Close Button */}
            <X size={28} />
          </Button>
        </div>

        {/* Mobile Nav Links */}
        <ul className="flex flex-col gap-2 p-4">
          {links.map(({ label, to, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/dashboard"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    `py-2 px-3 rounded-lg transition-all duration-300 flex items-center gap-2 hover:text-orange-500`,
                    {
                      "bg-gray-800": isActive,
                    }
                  )
                }
              >
                {icon}
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Connect Button - Mobile */}
        <div className="p-4">
          <Button className="bg-orange-500 px-4 py-2 rounded-full w-full flex items-center gap-2 font-semibold cursor-pointer">
            <Plus size={20} />
            Connect
          </Button>
        </div>
      </div>
    </nav>
  );
}
