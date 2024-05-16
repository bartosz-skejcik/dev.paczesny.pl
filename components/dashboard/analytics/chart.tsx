"use client";

import {} from "lucide-react";
import {
    XAxis,
    YAxis,
    Tooltip,
    AreaChart,
    Area,
    CartesianGrid,
} from "recharts";

const populateTheRestOfDataIfLengthIsLessThanSeven = (
    data: {
        name: string;
        views: number;
        visitors: number;
        date: Date;
    }[],
    metricParam: string
) => {
    if (data.length < 7 && data.length > 0) {
        const firstDate = data[0].date;
        for (let i = 0; i < 7 - data.length; i++) {
            data.unshift({
                name: new Date(
                    firstDate.getTime() - 1000 * 60 * 60 * 24
                ).toLocaleString("en-PL", {
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                views: 0,
                visitors: 0,
                date: new Date(firstDate.getTime() - 1000 * 60 * 60 * 24),
            });
            firstDate.setDate(firstDate.getDate() - 1);
        }
    }
    return data;
};

type Props = {
    data:
        | (
              | {
                    name: string;
                    views: number;
                    date: Date;
                }
              | {
                    name: string;
                    visitors: number;
                    date: Date;
                }
          )[]
        | undefined;
    metricParam: string;
};

function Chart({ data, metricParam }: Props) {
    return (
        <AreaChart
            width={1500}
            height={450}
            data={populateTheRestOfDataIfLengthIsLessThanSeven(
                data as any,
                metricParam
            )}
        >
            <CartesianGrid
                strokeDasharray="0"
                vertical={false}
                strokeOpacity={0.1}
            />
            <Area
                isAnimationActive={false}
                dataKey={metricParam == "visitorsByDate" ? "visitors" : "views"}
                stroke="#0070f3"
                strokeWidth={2}
                fill="rgba(0, 112, 243, 0.4)"
                fillOpacity={0.4}
            />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
                contentStyle={{
                    backgroundColor: "#212121",
                    color: "#fff",
                    border: "none",
                }}
            />
        </AreaChart>
    );
}

export default Chart;
