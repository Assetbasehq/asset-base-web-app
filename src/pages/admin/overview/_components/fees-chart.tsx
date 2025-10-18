import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { CartesianGrid, XAxis, YAxis, Bar, BarChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import ChartDropdown from "./chart-dropdown";

const userChartData = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 800 },
  { month: "Mar", value: 600 },
  { month: "Apr", value: 1200 },
  { month: "May", value: 1100 },
  { month: "Jun", value: 900 },
  { month: "Jul", value: 1500 },
  { month: "Aug", value: 1300 },
  { month: "Sep", value: 1700 },
  { month: "Oct", value: 1600 },
  { month: "Nov", value: 1800 },
  { month: "Dec", value: 2000 },
];

const chartConfig = {
  users: {
    label: "Users",
    color: "var(--custom-orange)",
  },
} satisfies ChartConfig;

export default function FeesChart() {
  return (
    <Card className="rounded-lg shadow-none border-custom-light-stroke bg-custom-card p-4">
      <CardHeader className="flex flex-col items-start !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-start items-start gap-1 pb-3 sm:pb-0">
          <CardTitle>Fees</CardTitle>
          <CardDescription>Monitor users and accounts</CardDescription>
        </div>
        <ChartDropdown />
      </CardHeader>

      <CardContent className="p-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={userChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={4} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="value"
                  labelFormatter={(month) => `${month}`}
                />
              }
            />
            <Bar
              dataKey="value"
              fill="var(--custom-orange)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
