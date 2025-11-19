import { Button } from "../ui/button";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AssetBaseBetaWhite } from "./asset-base-beta";
import {
  RiWalletLine,
  RiBriefcaseLine,
  RiStockLine,
  RiBox3Line,
  RiLayoutGridLine,
  RiUser2Line,
  RiNotification2Line,
  RiSearch2Line,
} from "react-icons/ri";
import ConnectWallet from "./connect-wallet";
import Notifications from "./notifications";
import { useGetNotifications } from "@/hooks/use-notifications";

const links = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <RiLayoutGridLine className="w-4 h-4 md:w-4 md:h-4" />,
  },
  {
    label: "Markets",
    to: "/dashboard/markets",
    icon: <RiStockLine className="w-4 h-4 md:w-4 md:h-4" />,
  },
  {
    label: "Wallet",
    to: "/dashboard/wallet",
    icon: <RiWalletLine className="w-4 h-4 md:w-4 md:h-4" />,
  },
  {
    label: "Portfolio",
    to: "/dashboard/portfolio",
    icon: <RiBriefcaseLine className="w-4 h-4 md:w-4 md:h-4" />,
  },
  {
    label: "Liquidity",
    to: "/dashboard/liquidity",
    icon: <RiBox3Line className="w-4 h-4 md:w-4 md:h-4" />,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const { data, isLoading } = useGetNotifications({ limit: 10, offset: "0" });

  return (
    <nav className="bg-fixed-base text-white font-geist">
      <div className="w-full flex items-center justify-between gap-4 p-4 max-w-custom mx-auto">
        <Notifications
          isOpen={isNotificationsOpen}
          onOpenChange={setIsNotificationsOpen}
          isLoading={isLoading}
          notifications={data || []}
        />
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
                    <p>{label}</p>
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Right Section */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4">
            <ConnectWallet />
            {/* <WalletConnection /> */}

            <RiNotification2Line
              onClick={() => {
                // setIsOpen(false);
                setIsNotificationsOpen(true);
              }}
              size={34}
              className="border p-2 rounded-full text-white border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
            />
            <Link to="/dashboard/account/profile">
              <RiUser2Line
                size={34}
                className="border p-2 rounded-full border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
              />
            </Link>
            <RiSearch2Line
              size={34}
              className="border p-2 rounded-full text-white border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
            />
          </div>

          {/* Hamburger Icon - Mobile Only */}
          <button
            className="lg:hidden py-2 px-4 text-custom-white cursor-pointer bg-fixed-light-bg/50 rounded-md"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={22} className="text-white" />
          </button>
        </div>

        {/* Mobile Menu Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile Slide-down Menu */}
        <div
          className={cn(
            "fixed top-15 h-fit w-[90%] max-w-lg mx-auto left-0 right-0 origin-top bg-custom-base text-custom-black p-4 rounded-lg transform transition-transform duration-300 z-50 ",
            isOpen ? " scale-y-100" : "scale-y-0"
          )}
        >
          <Button
            className="cursor-pointer rounded-full text-custom-ticker-red bg-custom-light-bg flex justify-self-end"
            onClick={() => setIsOpen(false)}
          >
            <X height={20} width={20} />
          </Button>

          <div className="flex flex-col gap-2 justify-between items-start">
            <Link
              to="/dashboard"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <RiNotification2Line
                size={34}
                className="border p-2 rounded-full text-custom-white border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
              />
              <p className=" text-custom-grey">Notifications</p>
            </Link>
            <Link
              to="/dashboard/account"
              className="md:hidden flex items-center gap-2"
            >
              <RiUser2Line
                onClick={() => setIsOpen(false)}
                size={34}
                className="border p-2 rounded-full text-custom-white border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
              />
              <p className=" text-custom-grey">Profile</p>
            </Link>
            <Link
              to="/dashboard/account/profile"
              className="hidden md:flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <RiUser2Line
                size={34}
                className="border p-2 rounded-full text-custom-white border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
              />
              <p className=" text-custom-grey">Profile</p>
            </Link>
            <div className="flex items-center gap-2">
              <RiSearch2Line
                size={34}
                className="border p-2 rounded-full text-custom-white border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
              />
              <p className=" text-custom-grey">Search</p>
            </div>
          </div>

          {/* Connect Button - Mobile */}
          <div onClick={() => setIsOpen(false)} className="p-4">
            <ConnectWallet className="w-full" />
          </div>
        </div>

        {/* 👇 Fixed Bottom Navigation Links */}
        <div className="fixed bottom-0 left-0 w-full z-80 lg:hidden bg-custom-card">
          <ul className="flex gap-0 items-center w-full justify-between">
            {links.map(({ label, to, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/dashboard"}
                  className={({ isActive }) =>
                    cn(
                      `flex flex-col items-center min-w-[50px] sm:min-w-[100px] bg-custom-card p-2 sm:p-4 rounded-lg text-xs sm:text-sm md:text-sm gap-2 transition-colors duration-300 hover:text-orange-500 text-custom-white`,
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
      </div>
    </nav>
  );
}
