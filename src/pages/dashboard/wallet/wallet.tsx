import { Outlet } from "react-router";

export default function Wallet() {
  return (
    <div className="text-custom-white-text flex flex-col gap-4 font-geist">
      <h2 className="text-3xl font-semibold text-left">Wallets</h2>
      <Outlet />
    </div>
  );
}
