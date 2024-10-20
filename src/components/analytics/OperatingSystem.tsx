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
import { useState } from "react";

type Props = {
    data: any;
};

const chartConfig = {
    hits: {
        label: "Hits",
        color: "hsl(var(--chart-1))",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig;

export default function OperatingSystem({ data }: Props) {
    const [chartData, setChartData] = useState<
        {
            os: string;
            hits: number;
        }[]
    >([]);

    function handleData(data: any) {
        let d: any[] = [];
        data.forEach((item: any) => {
            // add a new item if it doesnt exist in d array
            if (!d.find((i) => i.os === item.os)) {
                d.push({
                    os: item.os,
                    hits: 1,
                });
            } else {
                // if it exists, increment the hits count
                const index = d.findIndex((i) => i.os === item.os);
                d[index].hits++;
            }
        });

        setChartData(d);
    }

    if (chartData.length === 0 && data && data.length > 0) {
        handleData(data);
    }

    return (
        <Card className="col-span-1 h-fit lg:col-span-2">
            <CardHeader>
                <CardTitle>Operating Systems</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="os"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="hits" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="hits"
                            layout="vertical"
                            fill="var(--color-hits)"
                            radius={4}
                        >
                            <LabelList
                                dataKey="os"
                                position="insideLeft"
                                offset={8}
                                className="fill-[--color-label]"
                                fontSize={12}
                            />
                            <LabelList
                                dataKey="hits"
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
