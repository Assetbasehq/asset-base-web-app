import { Outlet } from "react-router";
import DepositBreadCrumb from "../_components/deposit-bread-crumb";

export default function DepositLayout() {
  return (
    <div>
      <DepositBreadCrumb />

      <div className="flex flex-col gap-8 text-start w-full max-w-md mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
