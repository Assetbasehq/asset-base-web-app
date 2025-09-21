import WalletBreadCrumb from "../../_components/wallet-bread-crumb";
import { Outlet } from "react-router";

export default function DepositLayout() {
  return (
    <div>
      <WalletBreadCrumb />

      <div className="flex flex-col gap-8 text-start w-full max-w-md mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
