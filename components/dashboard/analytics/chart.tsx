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

type Props = {
    data:
        | {
              name: string;
              views: number | null;
              date: Date;
          }[]
        | {
              name: string;
              visitors: number | null;
              date: Date;
          }[];
};

const populateTheRestOfDataIfLengthIsLessThanSeven = (
    data: {
        name: string;
        views: number | null;
        visitors: number | null;
        date: Date;
    }[]
) => {
    if (data.length < 7) {
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

function Chart({ data }: Props) {
    return (
        <AreaChart
            width={1500}
            height={450}
            data={populateTheRestOfDataIfLengthIsLessThanSeven(data as any)}
        >
            <CartesianGrid
                strokeDasharray="0"
                vertical={false}
                strokeOpacity={0.1}
            />
            <Area
                isAnimationActive={false}
                dataKey={(d) => (d.views !== null ? d.views : d.visitors)}
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
