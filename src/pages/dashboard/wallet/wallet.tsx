import { Outlet } from "react-router";

export default function Wallet() {
  return (
    <div className="text-custom-white-text flex flex-col font-geist">
      <h2 className="text-xl md:text-2xl font-semibold text-left mb-2">
        Wallets
      </h2>
      <Outlet />
    </div>
  );
}
