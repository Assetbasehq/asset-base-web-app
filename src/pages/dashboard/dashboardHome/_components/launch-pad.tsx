import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import { Link } from "react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function LaunchPad() {
  return (
    <Card className="bg-custom-card text-custom-white-text rounded-lg text-start border-none shadow-none">
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Launchpad</h2>
          <p>Acurated list of securities you can fund</p>
        </div>
        <Link
          to="/#"
          className="text-primary font-semibold cursor-pointer underline text-sm"
        >
          View All
        </Link>
      </CardHeader>
      <CardContent>
        <Securities />
      </CardContent>
    </Card>
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
    <div
      className="flex gap-4 overflow-scroll w-full no-scrollbar"
      style={{
        backgroundImage: `url(${assetBaseLogo})`,
      }}
    >
      {securitiesData.map((item) => (
        <div
          key={item.id}
          className=" bg-custom-light-bg flex flex-col gap-4 items-start rounded-2xl p-2 min-w-96"
        >
          <div className="relative overflow-hidden flex flex-col gap-6 items-start text-start w-full p-4 rounded-lg">
            <img
              src={assetBaseLogo}
              alt=""
              className=" absolute w-35 top-0 -right-5 opacity-10"
            />
            <div className="flex items-center gap-2">
              <img src={item.logo} alt="" className="w-10 h-10" />
              <div>
                <h2 className="font-semibold">{item.acronym}</h2>
                <small>{item.name}</small>
              </div>
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="flex justify-between items-center w-full">
                <small>Price per share</small>
                <small className="font-semibold">{item.price}</small>
              </div>
              <div className="flex justify-between items-center w-full">
                <small>Funding round closes</small>
                <small className="font-semibold">in 15days</small>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start w-full pb-1">
            <Progress value={15} className="w-full bg-white" />
            <div className="flex justify-between items-center w-full">
              <small className="font-semibold text-primary">15% raised</small>
              <small className="font-semibold">2,300,000 available</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
