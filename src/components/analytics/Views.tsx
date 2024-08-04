"use client";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/shadcn/Card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/shadcn/Chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/shadcn/Select";

const chartConfig = {
    sessions: {
        label: "Sessions",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

type Props = {
    data: {
        timestamp: string;
        referrer: string;
    }[];
};

export function Views({ data }: Props) {
    const [timeRange, setTimeRange] = React.useState("30d");

    const processData = (rawData: Props["data"]) => {
        const sessionsByDay = rawData.reduce((acc, session) => {
            const date = new Date(session.timestamp)
                .toISOString()
                .split("T")[0];
            (acc as any)[date] = ((acc as any)[date] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(sessionsByDay)
            .map(([date, sessions]) => ({
                date,
                sessions,
            }))
            .sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime(),
            );
    };

    const chartData = processData(data);

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date);
        const now = new Date();
        let daysToSubtract = 30;
        if (timeRange === "7d") {
            daysToSubtract = 7;
        }
        now.setDate(now.getDate() - daysToSubtract);
        return date >= now;
    });

    return (
        <Card className="col-span-1 h-fit lg:col-span-3 2xl:col-span-6">
            <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Sessions Over Time</CardTitle>
                    <CardDescription>
                        Showing daily sessions for the selected time range
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a time range"
                    >
                        <SelectValue placeholder="Last 30 days" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
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
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient
                                id="fillSessions"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-sessions)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-sessions)"
                                    stopOpacity={0.1}
                                />
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
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            allowDecimals={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value,
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="sessions"
                            type="monotone"
                            fill="url(#fillSessions)"
                            stroke="var(--color-sessions)"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
