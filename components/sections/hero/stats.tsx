"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "./actions";
import NumberTicker from "@/components/magicui/number-ticker";

type Props = {};

function Stats({}: Props) {
    const { data, isError } = useQuery({
        queryKey: ["stats"],
        queryFn: () => fetchStats("bartosz-skejcik"),
    });

    if (isError) {
        return (
            <div className="w-5/6 lg:w-2/3 flex items-center justify-evenly">
                <p>Failed to fetch data</p>
            </div>
        );
    }

    return (
        <div className="w-5/6 lg:w-2/3 flex lg:flex-row flex-col lg:gap-y-0 gap-y-8 items-center justify-evenly pt-20 lg:pt-36">
            {data &&
                Object.entries(data).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                        <p className="font-bold text-4xl lg:text-6xl">
                            <NumberTicker value={value ?? 0} />
                        </p>
                        <p className="text-default-500 font-semibold lg:text-lg text-sm">
                            {key
                                .replace(/_/g, " ")
                                .split(" ")
                                .map((word, index) => (
                                    <span
                                        key={word}
                                        className={
                                            index === 0
                                                ? "block capitalize"
                                                : index === 1
                                                ? "ml-0"
                                                : "ml-1"
                                        }
                                    >
                                        {word}
                                    </span>
                                ))}
                        </p>
                    </div>
                ))}
        </div>
    );
}

export default Stats;
