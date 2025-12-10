import { useTrendingAssets } from "@/hooks/useAssets";
import { FormatService } from "@/services/format-service";
import { Link } from "react-router";

export default function HottestLaunchpad() {
  const { data, isLoading, isError } = useTrendingAssets();

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    );
  }

  if (!data) {
    return <div>No assets available</div>;
  }

  return (
    <div className="text-left border p-2 rounded-lg flex flex-col gap-1 md:w-1/2">
      <h2 className="text-md font-light">Hottest Launchpad</h2>
      <div className="flex gap-2 overflow-scroll w-full no-scrollbar">
        {data.map((item) => (
          <Link
            to={`/dashboard/launchpad/${item.asset.slug}`}
            key={item.asset.id}
          >
            <div className=" bg-custom-light-bg flex gap-2 items-center justify-between rounded-lg p-2">
              <div className="flex items-end text-start gap-16 w-full">
                <div className="flex items-center gap-2">
                  <img
                    src={item.asset.logo}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col">
                    <h2 className="font-medium text-sm">
                      {item.asset.asset_name}
                    </h2>
                    <small className="text-xs font-normal">
                      {FormatService.formatCurrency(
                        item.asset.price_per_share,
                        item.asset.currency
                      )}
                    </small>
                  </div>
                </div>
                <p className="text-green-400 text-xs">
                  {/* {item.price_change_24hrs} */}
                  12%
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
