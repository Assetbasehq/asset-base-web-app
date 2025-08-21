import { Link, Outlet, useLocation } from "react-router";
import AddLiquidity from "./_components/add-liquidity";
import { cn } from "@/lib/utils";

export default function Liquidity() {
  const location = useLocation();

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-left mb-4 text-custom-white-text">
        Liquidity
      </h2>
      <div className="flex flex-col gap-6">
        <AddLiquidity />
        <div className="bg-custom-card flex flex-col items-center rounded-lg px-6 py-8">
          <div className=" flex gap-4 border-b w-full pb-2 px-2">
            <Link
              className={cn(`text-lg font-semibold text-custom-white-text`, {
                "text-custom-orange": isActiveLink("/dashboard/liquidity"),
              })}
              to="/dashboard/liquidity"
            >
              Available (1000)
            </Link>
            <Link
              className={cn(`text-lg font-semibold text-custom-white-text`, {
                "text-custom-orange": isActiveLink(
                  "/dashboard/liquidity/my-investments"
                ),
              })}
              to="/dashboard/liquidity/my-investments"
            >
              My Investments (20)
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
