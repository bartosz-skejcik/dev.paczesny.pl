import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Chart from "./chart";
import { GAApiResponse } from "@/types/ga-response";
import { headers } from "next/headers";
import SmallStatFiles from "./small-stat-files";

type Props = {};

const getChartData = async (metric: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/analytics?metric=${metric}`,
        {
            cache: "force-cache",
        }
    );
    const data: GAApiResponse = await res.json();

    // convert this to the format that the chart component expects
    // here is and example:
    // const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];

    const chartData = data.map((row) => {
        // dimensionValue is a string in the format "YYYYMMDDHHMM", example: 202405142210
        // we need to convert it to a date object
        const date = new Date(
            Number(row.dimensionValues[0].value.slice(0, 4)),
            Number(row.dimensionValues[0].value.slice(4, 6)),
            Number(row.dimensionValues[0].value.slice(6, 8)),
            Number(row.dimensionValues[0].value.slice(8, 10)),
            Number(row.dimensionValues[0].value.slice(10, 12))
        );

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
        };
    });

    return chartData;
};

async function getDataBasedOnMetric(metric: string) {
    const data = await getChartData(metric);
    return data;
}

async function ChartStatistics({}: Props) {
    const headersList = headers();
    // read the custom x-url header
    const header_url = headersList.get("x-url") || "";

    const metricParam = header_url.split("metric=")[1] ?? "pageViewsByDate";

    let data = await getDataBasedOnMetric(metricParam);

    return (
        <Card className="w-fit flex px-6 flex-col items-center justify-center">
            <CardHeader>
                <SmallStatFiles metricParam={metricParam} />
            </CardHeader>
            <CardBody>
                <Chart data={data} />
            </CardBody>
        </Card>
    );
}

export default ChartStatistics;
