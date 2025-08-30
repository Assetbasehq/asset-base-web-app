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
    icon: <RiLayoutGridLine className="w-4 h-4 md:w-6 md:h-6" />,
  },
  {
    label: "Wallet",
    to: "/dashboard/wallet",
    icon: <RiWalletLine className="w-4 h-4 md:w-6 md:h-6" />,
  },
  {
    label: "Markets",
    to: "/dashboard/markets",
    icon: <RiStockLine className="w-4 h-4 md:w-6 md:h-6" />,
  },
  {
    label: "Liquidity",
    to: "/dashboard/liquidity",
    icon: <RiBox3Line className="w-4 h-4 md:w-6 md:h-6" />,
  },
  {
    label: "Portfolio",
    to: "/dashboard/portfolio",
    icon: <RiBriefcaseLine className="w-4 h-4 md:w-6 md:h-6" />,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between gap-4 p-4 md:p-8 bg-fixed-base text-white">
      <div className="flex items-center gap-6">
        {/* Logo + Title + Beta Badge */}
        <AssetBaseBetaWhite />

        {/* Desktop Navigation Links */}
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

      {/* Desktop Right Section */}
      <div className="flex items-center gap-4">
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
          <Link to="/dashboard/account">
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
          <Link to="/dashboard/account" className="md:hidden">
            <User
              onClick={() => setIsOpen(false)}
              size={34}
              className="border p-2 rounded-full text-white border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard/account/profile" className="hidden md:block">
            <User
              onClick={() => setIsOpen(false)}
              size={34}
              className="border p-2 rounded-full text-white border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
            />
          </Link>
          <Search
            size={34}
            className="border p-2 rounded-full text-white border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
          />
          <Button
            className="bg-custom-base text-custom-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <X size={28} />
          </Button>
        </div>

        {/* Mobile Nav Links */}
        {/* <ul className="flex flex-col gap-2 p-4">
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
        </ul> */}

        {/* Connect Button - Mobile */}
        <div className="p-4">
          <Button className="bg-orange-500 px-4 py-2 rounded-full w-full flex items-center gap-2 font-semibold cursor-pointer">
            <Plus size={20} />
            Connect
          </Button>
        </div>
      </div>

      {/* 👇 Fixed Bottom Navigation Links */}
      <div className="fixed bottom-3 left-0 w-full z-50 lg:hidden">
        <ul className="flex justify-around items-center p-2">
          {links.map(({ label, to, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/dashboard"}
                className={({ isActive }) =>
                  cn(
                    `flex flex-col items-center min-w-[70px] sm:min-w-[100px] bg-custom-card p-2 sm:p-4 rounded-lg text-xs sm:text-sm md:text-sm gap-2 transition-colors duration-300 hover:text-orange-500 text-custom-white`,
                    {
                      "text-custom-orange rounded-b-none border-b-2 border-custom-orange":
                        isActive,
                    }
                  )
                }
              >
                {icon}
                <small> {label}</small>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
