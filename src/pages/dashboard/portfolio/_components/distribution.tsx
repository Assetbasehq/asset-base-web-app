import { Pie, PieChart, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
export const description = "An interactive pie chart";
const desktopData = [
  { month: "january", desktop: 186, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: "#525866",
  },
  february: {
    label: "February",
    color: "#525866",
  },
  march: {
    label: "March",
    color: "#525866",
  },
} satisfies ChartConfig;
export default function Distribution() {
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = useState(desktopData[0].month);
  const activeIndex = useMemo(
    () => desktopData.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  );
  const months = useMemo(() => desktopData.map((item) => item.month), []);

  // if (true) {
  //   return <DistributionSkeleton />;
  // }

  return (
    <Card
      data-chart={id}
      className=" p-2 md:p-4 flex flex-col lg:col-span-2 xl:col-span-1 bg-custom-card border-none shadow-none"
    >
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 p-0">
        <div className=" flex  items-start text-start">
          <CardTitle className="text-lg">Distribution</CardTitle>
          <Select value={activeMonth} onValueChange={setActiveMonth}>
            <SelectTrigger
              className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {months.map((key) => {
                const config = chartConfig[key as keyof typeof chartConfig];
                if (!config) {
                  return null;
                }
                return (
                  <SelectItem
                    key={key}
                    value={key}
                    className="rounded-lg [&_span]:flex"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-xs"
                        style={{
                          backgroundColor: `var(--color-${key})`,
                        }}
                      />
                      {config?.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center p-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="month"
              innerRadius={95}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                innerRadius = 0,
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  {/* Selected slice pulled inward */}
                  <Sector
                    {...props}
                    innerRadius={Math.max(0, innerRadius - 40)}
                    outerRadius={outerRadius}
                    fill="var(--color-primary)"
                  />
                  {/* Optional subtle inner ring highlight */}
                  <Sector
                    {...props}
                    innerRadius={Math.max(0, innerRadius - 18)}
                    outerRadius={innerRadius - 90}
                    fillOpacity={0}
                  />
                </g>
              )}
            ></Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function DistributionSkeleton() {
  return (
    <Card className="flex flex-col lg:col-span-2 xl:col-span-1 bg-custom-card-background">
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="flex items-start text-start w-full">
          <CardTitle className="text-lg">Distribution</CardTitle>
          <div className="ml-auto">
            <Skeleton className="h-9 w-[130px] rounded-lg" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 justify-center pb-0">
        <div className="mx-auto aspect-square w-full max-w-[300px] flex items-center justify-center">
          <Skeleton className="h-[200px] w-[200px] rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
