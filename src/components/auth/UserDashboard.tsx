'use client';

import * as React from 'react';
import { Area, AreaChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { chartData } from '@/app/(auth)/dashboard/chart-data';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart, Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from 'lucide-react';
const chartPieData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 287, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 190, fill: 'var(--color-other)' },
];
const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const chartPieConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

const chartBarData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];
const chartBarConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function DashboardComponent() {
  const [timeRange, setTimeRange] = React.useState('90d');

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date('2024-06-30');
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  const totalVisitors = React.useMemo(() => {
    return chartPieData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <div className="flex flex-col p-6">
      <div className="mx-6 my-4 p-4 rounded-xl bg-gradient-to-r from-[#e8f0fe] to-[#f0f4ff] border border-blue-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">Welcome to Dashboard</h2>
        <p className="text-sm text-gray-600 mt-1">
          This dashboard gives you a quick overview of all the repositories, directories, and
          statistics under your account. You can view summaries, manage your submissions, and
          explore partner data across the region—all in one place.
        </p>
      </div>
      <div className="flex flex-row gap-4 w-full">
        <div className="w-1/2 bg-white rounded-lg shadow p-4">
          <p className="text-lg font-bold">Repository Info</p>
          <div className="flex gap-6 justify-center items-center p-6">
            {/* Inflow Card */}
            <Card className="bg-green-300 shadow-lg rounded-xl w-40 h-40 text-center flex flex-col justify-center items-center">
              <CardContent className="flex flex-col justify-center items-center gap-1 text-black pt-6">
                <ArrowDownLeft className="w-5 h-5" />
                <p className="text-sm">Policy Brief</p>
                <p className="text-lg font-bold">8</p>
              </CardContent>
            </Card>

            {/* Outflow Card */}
            <Card className="bg-indigo-300 shadow-lg rounded-xl w-40 h-40 text-center flex flex-col justify-center items-center">
              <CardContent className="flex flex-col justify-center items-center gap-1 text-black pt-6">
                <ArrowUpRight className="w-5 h-5" />
                <p className="text-sm">Paper</p>
                <p className="text-lg font-bold">10</p>
              </CardContent>
            </Card>

            {/* Net Change Card */}
            <Card className="bg-black text-white shadow-lg rounded-xl w-40 h-40 text-center flex flex-col justify-center items-center">
              <CardContent className="flex flex-col justify-center items-center gap-1 pt-6">
                <ArrowLeftRight className="w-5 h-5" />
                <p className="text-sm">Research Projects</p>
                <p className="text-lg font-bold">6</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="w-1/2 bg-white rounded-lg shadow p-4">
          <p className="text-lg font-bold"> Directory Info </p>
          <div className="grid grid-cols-2 gap-6 p-6 w-full max-w-5xl mx-auto">
            {/* Card 1 */}
            <Card className="bg-green-300 shadow-lg rounded-xl flex items-center justify-center h-40">
              <CardContent className="text-center flex flex-col items-center justify-center gap-1 text-black">
                <p className="text-lg font-bold">Davao del Norte</p>
                <p className="text-m">Entities: 4</p>
                <p className="text-m">Commodities: 6</p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="bg-indigo-300 shadow-lg rounded-xl flex items-center justify-center h-40">
              <CardContent className="text-center flex flex-col items-center justify-center gap-1 text-black">
                <p className="text-lg font-bold">Davao del Sur</p>
                <p className="text-m">Entities: 23</p>
                <p className="text-m">Commodities: 15</p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="bg-indigo-300 shadow-lg rounded-xl flex items-center justify-center h-40">
              <CardContent className="text-center flex flex-col items-center justify-center gap-1 text-black">
                <p className="text-lg font-bold">Davao Oriental</p>
                <p className="text-m">Entities: 2</p>
                <p className="text-m">Commodities: 3</p>
              </CardContent>
            </Card>

            {/* Card 4 */}
            <Card className="bg-black text-white shadow-lg rounded-xl flex items-center justify-center h-40">
              <CardContent className="text-center flex flex-col items-center justify-center gap-1">
                <p className="text-sm">Davao de Oro</p>
                <p className="text-lg font-bold">Entities: 7</p>
                <p className="text-lg font-bold">Commodities: 5</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <br></br>
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-lg font-bold">Statistics</p>
        <Card>
          <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
            <div className="grid flex-1 gap-1 text-center sm:text-left">
              <CardTitle>Area Chart - Interactive</CardTitle>
              <CardDescription>Showing total visitors for the last 3 months</CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="w-[160px] rounded-lg sm:ml-auto"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  Last 3 months
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  Last 30 days
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  Last 7 days
                </SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        });
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="url(#fillMobile)"
                  stroke="var(--color-mobile)"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="url(#fillDesktop)"
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="flex flex-row gap-4 w-full h-[500px]">
          {/* Pie Chart Card */}
          <div className="w-1/2 h-full bg-white rounded-lg shadow p-4">
            <Card className="flex flex-col h-full">
              <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart - Donut with Text</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer
                  config={chartPieConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie
                      data={chartPieData}
                      dataKey="visitors"
                      nameKey="browser"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
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
                                  className="fill-foreground text-3xl font-bold"
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
                <div className="leading-none text-muted-foreground">
                  Showing total visitors for the last 6 months
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="w-1/2 h-full bg-white rounded-lg shadow p-4">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Bar Chart - Multiple</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartBarConfig}>
                  <BarChart accessibilityLayer data={chartBarData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  Showing total visitors for the last 6 months
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
