"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    YAxis,
} from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/shadcn/Card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/shadcn/Chart";
import { useMemo, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@ui/shadcn/Select";
type Props = {
    data: {
        name: string;
        data: { [key: string]: string };
    }[];
};

const chartConfig = {
    count: {
        label: "Count",
        color: "hsl(var(--chart-1))",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig;

export default function Event({ data }: Props) {
    const [filter, setFilter] = useState<"by_name" | "by_value">("by_name");
    // data is { name: string, data: { [key: string]: string } }
    // we want to transform it into { name: string, count: string } where the count is the value of the data key
    // lets count the number of events per countibute and transform it into { name: "event_name: count (value of the key)", count: number }
    const chartDataByValue = useMemo(() => {
        const eventCounts = {};

        data.forEach((event) => {
            const { name, data: eventData } = event;
            Object.entries(eventData).forEach(([key, value]) => {
                const eventName = `${name}: ${value}`;
                if ((eventCounts as any)[eventName]) {
                    (eventCounts as any)[eventName]++;
                } else {
                    (eventCounts as any)[eventName] = 1;
                }
            });
        });

        return Object.entries(eventCounts)
            .map(([name, count]) => ({
                name,
                count: count,
            }))
            .sort((a, b) => (b.count as any) - (a.count as any));
        // .slice(0, 10); // Sort by count descending and take top 10
    }, [data]);

    const chartDataByName = useMemo(() => {
        const eventCounts = {};

        data.forEach((event) => {
            const { name, data: eventData } = event;
            Object.entries(eventData).forEach(([key, value]) => {
                const eventName = `${name}`;
                if ((eventCounts as any)[eventName]) {
                    (eventCounts as any)[eventName]++;
                } else {
                    (eventCounts as any)[eventName] = 1;
                }
            });
        });

        return Object.entries(eventCounts)
            .map(([name, count]) => ({
                name,
                count: count,
            }))
            .sort((a, b) => (b.count as any) - (a.count as any));
        // .slice(0, 10); // Sort by count descending and take top 10
    }, [data]);

    return (
        <Card className="col-span-1 h-fit lg:col-span-4 2xl:col-span-6">
            <CardHeader className="flex w-full flex-row items-center justify-between">
                <CardTitle>Events</CardTitle>
                <Select
                    value={filter}
                    onValueChange={(value) => setFilter(value as any)}
                >
                    <SelectTrigger className="w-[180px] !rounded-lg">
                        <SelectValue placeholder="Filter by..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Filter</SelectLabel>
                            <SelectItem value="by_value">
                                Filter by value
                            </SelectItem>
                            <SelectItem value="by_name">
                                Filter by name
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[25rem]">
                    <BarChart
                        accessibilityLayer
                        data={
                            filter === "by_name"
                                ? chartDataByName
                                : chartDataByValue
                        }
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="count" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="count"
                            layout="vertical"
                            fill="var(--color-1)"
                            radius={4}
                        >
                            <LabelList
                                dataKey="name"
                                position="insideLeft"
                                offset={8}
                                className="fill-[--color-label]"
                                fontSize={12}
                            />
                            <LabelList
                                dataKey="count"
                                position="right"
                                offset={8}
                                className="fill-secondary"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
