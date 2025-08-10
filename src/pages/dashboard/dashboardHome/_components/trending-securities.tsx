import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import { Link } from "react-router";

export default function TrendingSecurities() {
  return (
    <div>
      <div className="flex items-center justify-between bg-card rounded-lg px-6 py-8">
        <div className="flex flex-col items-start gap-6 w-full">
          <div className="flex items-center justify-between w-full text-start">
            <div>
              <h2 className="text-2xl font-semibold">Trending Securities</h2>
              <p>Top Performing securites on AssetBase</p>
            </div>
            <Link
              to="#"
              className="text-primary font-semibold cursor-pointer underline text-sm"
            >
              View All
            </Link>
          </div>
          <Securities />
        </div>
      </div>
    </div>
  );
}

function Securities() {
  const securitiesData = [
    {
      id: "1",
      name: "Landmark Realty Limited",
      acronym: "LARL",
      logo: assetBaseLogo,
      amount_raised: "$23,500",
      goal: "$1,200,000",
      round_closes: "15 days",
      price: "$3400.00",
      price_change_24hrs: "+2.33%",
    },
    {
      id: "2",
      name: "Tesla",
      acronym: "TSLA",
      logo: assetBaseLogo,
      amount_raised: "$23,500",
      goal: "$1,200,000",
      round_closes: "15 days",
      price: "$5.00",
      price_change_24hrs: "+2.33%",
    },
    {
      id: "3",
      name: "TajBank Mudarabah Sukuk",
      acronym: "TAJM",
      logo: assetBaseLogo,
      amount_raised: "$23,500",
      goal: "$1,200,000",
      round_closes: "15 days",
      price: "$5.00",
      price_change_24hrs: "+2.33%",
    },
    {
      id: "4",
      name: "TajBank Mudarabah Sukuk",
      acronym: "TAJM",
      logo: assetBaseLogo,
      amount_raised: "$23,500",
      goal: "$1,200,000",
      round_closes: "15 days",
      price: "$5.00",
      price_change_24hrs: "+2.33%",
    },
    {
      id: "4",
      name: "TajBank Mudarabah Sukuk",
      acronym: "TAJM",
      logo: assetBaseLogo,
      amount_raised: "$23,500",
      goal: "$1,200,000",
      round_closes: "15 days",
      price: "$5.00",
      price_change_24hrs: "+2.33%",
    },
  ];

  return (
    <div className="flex gap-2 overflow-scroll w-full no-scrollbar">
      {securitiesData.map((item) => (
        <div
          key={item.id}
          className="flex gap-2 items-center justify-between bg-card-foreground rounded-lg p-2"
        >
          <div className="flex items-end text-start gap-12 w-full">
            <div className="flex items-center gap-2">
              <img src={item.logo} alt="" className="w-10 h-10" />
              <div>
                <h2 className="font-semibold">{item.acronym}</h2>
                <small>{item.price}</small>
              </div>
            </div>
            <p className="text-green-400">{item.price_change_24hrs}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
