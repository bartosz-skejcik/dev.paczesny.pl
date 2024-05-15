"use client";

import { RestCountriesApiResponse } from "@/types/restcountries-api";
import { Button } from "@nextui-org/button";
import { Card, CardHeader } from "@nextui-org/card";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import { FullscreenIcon } from "lucide-react";
import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { getCode } from "country-list";

type Props = {
    title: string;
    data: any;
};

const parseNumber = (value: string) => {
    // convert number to shortened format
    const num = Number(value);
    if (num >= 1.0e9) return (num / 1.0e9).toFixed(1) + "B";
    if (num >= 1.0e6) return (num / 1.0e6).toFixed(1) + "M";
    if (num >= 1.0e3) return (num / 1.0e3).toFixed(1) + "K";
    return num;
};

function SingleMetricStatistic({ title, data }: Props) {
    // sum up all metric values from each metricValues
    const totalMetricValue = data.reduce(
        (acc: number, row: any) =>
            Number(acc) + Number(row.metricValues[0].value),
        0
    );

    return (
        <Card className="w-full lg:w-[49.5%] p-2 flex flex-col items-center justify-start rounded-lg">
            <CardHeader className="pt-1 justify-between">
                <h3 className="text-lg font-semibold">{title}</h3>
                <Button
                    size="sm"
                    variant="light"
                    color="primary"
                    endContent={<FullscreenIcon size={16} />}
                    className="font-medium"
                >
                    DETAILS
                </Button>
            </CardHeader>
            <Table
                aria-label="Example static collection table"
                classNames={{
                    td: "text-right py-1 w-full px-0",
                }}
            >
                <TableHeader>
                    <TableColumn>Source</TableColumn>
                    <TableColumn>Visitors</TableColumn>
                </TableHeader>
                <TableBody items={data}>
                    {data.map((row: any, index: number) => {
                        const countryCode = getCode(
                            row.dimensionValues[0].value
                        )!;
                        return (
                            <TableRow key={index}>
                                <TableCell className={`w-full`}>
                                    <div className="relative w-full">
                                        <div className="absolute z-40 inset-0 w-full h-full rounded-md overflow-hidden">
                                            <div
                                                style={{
                                                    width: `${(
                                                        (row.metricValues[0]
                                                            .value /
                                                            totalMetricValue) *
                                                        100
                                                    ).toPrecision(2)}%`,
                                                }}
                                                className={`bg-primary-500/15 h-full rounded-r-md`}
                                            ></div>
                                        </div>
                                        <div className="py-2 px-3 relative z-50 w-full text-left flex items-center justify-start font-medium">
                                            {title == "Countries" && (
                                                <ReactCountryFlag
                                                    countryCode={countryCode}
                                                    svg
                                                    style={{
                                                        width: "2em",
                                                        height: "1em",
                                                        borderRadius: "30%",
                                                        marginBottom: "0.1em",
                                                        marginRight: "0.5em",
                                                    }}
                                                />
                                            )}{" "}
                                            {row.dimensionValues[0].value}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="pr-1">
                                    {parseNumber(row.metricValues[0].value)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Card>
    );
}

export default SingleMetricStatistic;
