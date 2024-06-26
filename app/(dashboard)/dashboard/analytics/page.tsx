import ChartStatistics from "@/components/dashboard/analytics/chart-statistics";
import SingleMetricStatistic from "@/components/dashboard/analytics/single-metric-statistic";
import React from "react";

type Props = {};

const fetchData = async (param: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/analytics?metric=${param}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch metric ${param}: ${error}`);
        return null;
    }
};

async function AnalyticsPage({}: Props) {
    const availableMetrics = [
        {
            id: "totalUsersByCountry",
            title: "Countries",
        },
        {
            id: "viewsPerPagePath",
            title: "Top Pages",
        },
        {
            id: "viewsByPageTitleAndScreenClass",
            title: "Top Pages by Page Title",
        },
        {
            id: "newUsersByFirstUserDefaultChannelGroup",
            title: "Top Sources",
        },
        {
            id: "eventCountByEventName",
            title: "Goal Conversions",
        },
    ];

    const metricData = await Promise.all(
        availableMetrics.map((metric) => fetchData(metric.id))
    );

    return (
        <main className="w-full h-screen flex-col flex items-center justify-start overflow-y-auto">
            <header className="flex items-center justify-between px-5 py-[0.97rem] w-full border-b border-foreground-200 bg-foreground-50">
                <h2 className="text-xl text-foreground-600">Analytics</h2>
            </header>
            <div className="flex flex-wrap gap-4 w-full flex-1 p-4 overflow-y-auto">
                <ChartStatistics />
                {metricData.map((data: any[], index: number) => (
                    <SingleMetricStatistic
                        key={index}
                        title={availableMetrics[index].title}
                        // Extract value from metricValues (assuming it's the first element)
                        // value={metricPoint.metricValues[0].value}
                        // Optionally pass other relevant data from dimensionValues or metricValues
                        data={data}
                    />
                ))}
            </div>
        </main>
    );
}

export default AnalyticsPage;
