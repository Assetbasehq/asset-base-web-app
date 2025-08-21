import assetBaseLogo from "@/assets/images/asset-base-logo.svg";

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

export default function TrendingAssets() {
  return (
    <div className="text-left border-2 p-4 rounded-2xl flex flex-col gap-4 md:w-1/2">
      <h2 className="text-xl font">Trending Assets</h2>
      <div className="flex gap-2 overflow-scroll w-full no-scrollbar">
        {securitiesData.map((item) => (
          <div
            key={item.id}
            className=" bg-custom-light-bg flex gap-2 items-center justify-between rounded-lg p-2"
          >
            <div className="flex items-end text-start gap-16 w-full">
              <div className="flex items-center gap-2">
                <img src={item.logo} alt="" className="w-10 h-10" />
                <div>
                  <h2 className="font-semibold">{item.acronym}</h2>
                  <small className="text-xs">{item.price}</small>
                </div>
              </div>
              <p className="text-green-400 text-sm">
                {item.price_change_24hrs}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
