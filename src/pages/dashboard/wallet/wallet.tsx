import { Outlet } from "react-router";
import MobileMoneyStatus from "./deposit/_components/mobile-money-status";

export default function Wallet() {
  return (
    <div className="text-custom-white-text flex flex-col font-geist">
      <MobileMoneyStatus />
      <h2 className="text-xl md:text-2xl text-left mb-2">Wallets</h2>
      <Outlet />
    </div>
  );
}
