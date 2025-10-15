import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import {
  RiUser2Line,
  RiNotification2Line,
  RiSearch2Line,
} from "react-icons/ri";
import { AssetBaseBetaWhite } from "@/components/shared/asset-base-beta";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between gap-4 p-4 bg-fixed-base text-white font-geist">
      <AssetBaseBetaWhite />
      {/* Desktop Right Section */}
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-4">
          <RiNotification2Line
            size={34}
            className="border p-2 rounded-full text-white border-muted-foreground hover:border-primary hover:text-primary transition duration-300 cursor-pointer"
          />
          {/* <Link to="/dashboard/admin/profile"> */}
          <Link to="#">
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
    </nav>
  );
}
