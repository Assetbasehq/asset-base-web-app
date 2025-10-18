import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartDropdown from "./chart-dropdown";

const data = [
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

export default function CampaignsChart() {
  return (
    <Card className="rounded-lg shadow-none border-custom-light-stroke bg-custom-card">
      <CardHeader className="flex justify-between items-center">
        <div className="flex flex-col items-start">
          <CardTitle className="text-lg font-semibold">
            Campaign Chart
          </CardTitle>
          <CardDescription>
            Monitor raising campaigns on launchpads
          </CardDescription>
        </div>
        <ChartDropdown />
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              strokeWidth={2}
              stroke="hsl(var(--primary))"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
