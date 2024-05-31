"use server";

import { GAApiResponse } from "@/types/ga-response";

export const fetchChartData = async (metric: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/analytics?metric=${metric}`,
        {
            cache: "no-cache",
        }
    );
    const data: GAApiResponse = await res.json();

    const chartData = data.map((row) => {
        const date = new Date(
            Number(row.dimensionValues[0].value.slice(0, 4)),
            Number(row.dimensionValues[0].value.slice(4, 6)),
            Number(row.dimensionValues[0].value.slice(6, 8)),
            Number(row.dimensionValues[0].value.slice(8, 10)),
            Number(row.dimensionValues[0].value.slice(10, 12))
        );

        if (metric == "pageViewsByDate") {
            return {
                name: date
                    .toLocaleString("en-PL", {
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                    .replace(",", ""),
                views: Number(row.metricValues[0].value),
                date: date,
            } as {
                name: string;
                views: number;
                date: Date;
            };
        } else {
            return {
                name: date
                    .toLocaleString("en-PL", {
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                    .replace(",", ""),
                visitors: Number(row.metricValues[0].value),
                date: date,
            } as {
                name: string;
                visitors: number;
                date: Date;
            };
        }
    });

    return chartData;
};
