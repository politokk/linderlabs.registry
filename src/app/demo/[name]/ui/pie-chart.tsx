"use client";

import { TrendingUp } from "lucide-react";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { browser: "chrome", visitors: 210, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 190, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 180, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 160, fill: "var(--color-edge)" },
  { browser: "opera", visitors: 150, fill: "var(--color-opera)" },
  { browser: "brave", visitors: 145, fill: "var(--color-brave)" },
  { browser: "samsung", visitors: 135, fill: "var(--color-samsung)" },
  { browser: "arc", visitors: 125, fill: "var(--color-arc)" },
  { browser: "vivaldi", visitors: 115, fill: "var(--color-vivaldi)" },
  { browser: "duckduckgo", visitors: 105, fill: "var(--color-duckduckgo)" },
  { browser: "other", visitors: 130, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  opera: {
    label: "Opera",
    color: "var(--chart-5)",
  },
  brave: {
    label: "Brave",
    color: "var(--chart-6)",
  },
  samsung: {
    label: "Samsung",
    color: "var(--chart-7)",
  },
  arc: {
    label: "Arc",
    color: "var(--chart-8)",
  },
  vivaldi: {
    label: "Vivaldi",
    color: "var(--chart-9)",
  },
  duckduckgo: {
    label: "DuckDuckGo",
    color: "var(--chart-10)",
  },
  other: {
    label: "Other",
    color: "var(--chart-11)",
  },
} satisfies ChartConfig;

export function PieChartComponent() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground font-bold text-3xl"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}