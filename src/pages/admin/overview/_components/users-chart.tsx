import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const userChartData = [
  { date: "2024-01-01", users: 120 },
  { date: "2024-2-02", users: 180 },
  { date: "2024-04-03", users: 120 },
  { date: "2024-04-04", users: 300 },
  { date: "2024-04-05", users: 420 },
  { date: "2024-04-06", users: 380 },
  { date: "2024-04-07", users: 460 },
  { date: "2024-04-08", users: 310 },
  { date: "2024-04-09", users: 480 },
  { date: "2024-04-10", users: 530 },
];

const chartConfig = {
  users: {
    label: "Users",
    color: "var(--custom-orange)",
  },
} satisfies ChartConfig;

export default function UsersChart() {
  function getMonthName(dateString: string): string {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleString("en-US", { month: "short" }); // "Apr"
  }

  return (
    <Card className="rounded-lg shadow-none border-custom-light-stroke bg-custom-card p-4">
      <CardHeader className="flex flex-col items-start !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-start items-start gap-1 pb-3 sm:pb-0">
          <CardTitle>Users</CardTitle>
          <CardDescription>Monitor users and accounts</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={userChartData}
            margin={{ right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // minTickGap={32}
              tickFormatter={(value) => {
                // safely parse YYYY-MM-DD
                const [year, month, day] = value.split("-").map(Number);
                const date = new Date(year, month - 1, day);
                const final = date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                }); // e.g. Apr, May, Jun

                const monthName = getMonthName(value);
                console.log({ final, monthName, value });

                return monthName;
              }}
            />
            <YAxis tickLine={false} tickMargin={0} axisLine={false} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="users"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      // day: "numeric",
                      // year: "numeric",
                    })
                  }
                />
              }
            />
            <Line
              dataKey="users"
              type="monotone"
              stroke="var(--color-users)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
