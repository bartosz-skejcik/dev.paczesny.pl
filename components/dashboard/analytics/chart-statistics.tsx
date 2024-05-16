"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Chart from "./chart";
import SmallStatFiles from "./small-stat-files";
import { useMutation } from "@tanstack/react-query";
import { fetchChartData } from "@/app/(dashboard)/dashboard/analytics/actions";
import { useEffect, useState } from "react";

type Props = {};

function ChartStatistics({}: Props) {
    const [metricParam, setMetricParam] = useState<string>("visitorsByDate");

    const {
        data,
        isPending,
        isError,
        mutate: server_fetchChartData,
    } = useMutation({
        mutationFn: fetchChartData,
        onError: (error) => {
            console.error("Failed to fetch data", error);
        },
    });

    useEffect(() => {
        server_fetchChartData(metricParam);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metricParam]);

    if (isError) {
        return <p>Failed to load data</p>;
    }

    return (
        <Card className="w-fit flex px-6 flex-col items-center justify-center">
            <CardHeader>
                <SmallStatFiles
                    metricParam={metricParam}
                    setMetricParam={setMetricParam}
                />
            </CardHeader>
            <CardBody>
                {isPending ? (
                    <div
                        className="bg-foreground-200/40 rounded-lg animate-pulse"
                        style={{
                            width: 1500,
                            height: 450,
                        }}
                    />
                ) : isError ? (
                    <p>Failed to load data</p>
                ) : (
                    <Chart data={data ?? []} metricParam={metricParam} />
                )}
            </CardBody>
        </Card>
    );
}

export default ChartStatistics;
