import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UsersChart from "./_components/users-chart";
import FeesChart from "./_components/fees-chart";
import CampaignsChart from "./_components/campaigns-chart";
import TradingVolumeChart from "./_components/trading-volume-chart";

export default function Overview() {
  const stats = [
    { label: "Total Liquidity", value: "$2,450,000" },
    { label: "Total Users", value: "18,340" },
    { label: "Total Assets Value", value: "$5,760,000" },
    { label: "Total Raised", value: "$980,000" },
    { label: "Total Fees", value: "$45,230" },
  ];

  return (
    <div className="space-y-4 bg-custom-card p-4 rounded-md">
      <h2 className="text-start text-lg font-semibold">Overview</h2>
      {/* Top Buttons */}
      {/* <div className="flex flex-wrap gap-4">
        <Button className="btn-primary py-6 rounded-full">Overview</Button>
        <Button className="btn-primary py-6 rounded-full">Add Liquidity</Button>
        <Button className="btn-primary py-6 rounded-full">Reports</Button>
      </div> */}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="rounded-lg shadow-none flex flex-col gap-0 p-4 border-none bg-custom-light-bg"
          >
            <CardHeader className="p-0">
              <CardTitle className="text-sm text-muted-foreground text-start p-0">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-start p-0">
              <p className="text-2xl font-semibold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsersChart />
        <FeesChart />
        <CampaignsChart />
        <TradingVolumeChart />
      </div>
    </div>
  );
}
