import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import { Link } from "react-router";

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

export default function HottestLaunchpad() {
  return (
    <div className="text-left border p-2 rounded-lg flex flex-col gap-1 md:w-1/2">
      <h2 className="text-md font-light">Hottest Launchpad</h2>
      <div className="flex gap-2 overflow-scroll w-full no-scrollbar">
        {securitiesData.map((item) => (
          <Link
            to={`/dashboard/launchpad/${item.acronym.toLowerCase()}`}
            key={item.id}
          >
            <div className=" bg-custom-light-bg flex gap-2 items-center justify-between rounded-lg p-2">
              <div className="flex items-end text-start gap-16 w-full">
                <div className="flex items-center gap-2">
                  <img src={item.logo} alt="" className="w-8 h-8" />
                  <div className="flex flex-col">
                    <h2 className="font-light text-sm">{item.acronym}</h2>
                    <small className="text-xs font-light">{item.price}</small>
                  </div>
                </div>
                <p className="text-green-400 text-xs">
                  {item.price_change_24hrs}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
