import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UsersChart from "../overview/_components/users-chart";
import UserAnalyticsChart from "./_components/user-analytics-chart";
import { EllipsisVertical } from "lucide-react";

export default function Analytics() {
  const stats = [
    { label: "Total Assets", value: "N24,234,000" },
    { label: "Active Assets", value: "N24,234,000" },
    { label: "Inactive Assets", value: "N2,340" },
    { label: "Avg Contribution", value: "N234,000" },
    { label: "Interest Rate", value: "10%" },
  ];

  return (
    <div>
      {/* Top Buttons */}
      {/* <div className="flex flex-wrap gap-4">
        <Button className="btn-primary py-6 rounded-full">Overview</Button>
        <Button className="btn-primary py-6 rounded-full">Add Liquidity</Button>
        <Button className="btn-primary py-6 rounded-full">Reports</Button>
      </div> */}
      <div className="space-y-4 bg-custom-card p-6 rounded-md">
        <div className="flex justify-between">
          <div className="flex items-end gap-2">
            <h2 className="text-start text-xl font-semibold">Analytics</h2>
            <span className="text-custom-white border text-xs px-2 py-0.5 rounded-sm">
              {58} assets
            </span>
          </div>
          <EllipsisVertical className="w-4 h-4 cursor-pointer" />
        </div>

        {/* Stat Cards */}
        <div className="flex gap-6">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="rounded-lg min-w-[220px] shadow-none flex flex-col gap-0 p-4 border-none bg-custom-light-bg"
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
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-6">
          <UserAnalyticsChart className="col-span-2 md:col-span-3" />
          <UserAnalyticsChart className="col-span-1 md:col-span-2" />
        </div>
      </div>
    </div>
  );
}
