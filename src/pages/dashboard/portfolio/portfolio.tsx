import { Link, Outlet, useLocation } from "react-router";
import Statistics from "./_components/statistics";
import Distribution from "./_components/distribution";
import { cn } from "@/lib/utils";
import TotalAssets from "./_components/total-assets";

const Links = [
  {
    path: "/dashboard/portfolio",
    name: "My Assets",
  },
  {
    path: "/dashboard/portfolio/watchlist",
    name: "Watchlist",
  },
  {
    path: "/dashboard/portfolio/matured",
    name: "Matured",
  },
];

export default function Portfolio() {
  const location = useLocation();

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold text-left mb-2 text-custom-white-text">
        Portfolio
      </h2>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 w-full">
          <TotalAssets />
          <Statistics />
          <Distribution />
        </div>
        <div className="bg-custom-card text-custom-white-text flex flex-col items-center rounded-lg p-2 md:p-4">
          <div className=" flex gap-8 border-b w-full px-2">
            {Links.map((link) => (
              <Link
                key={link.path}
                className={cn(`text-lg font-semibold pb-2`, {
                  "text-custom-orange border-b border-custom-orange ":
                    isActiveLink(link.path),
                })}
                to={link.path}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
