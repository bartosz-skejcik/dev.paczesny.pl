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
        <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {data &&
                Object.entries(data).map(([key, value]) => (
                    <div key={key}>
                        <dt className="font-mono text-base text-neutral-400">
                            {key.split("_").map((word, index) => (
                                <span
                                    key={word}
                                    className={`capitalize ${
                                        index > 0 ? "ml-1.5" : ""
                                    }`}
                                >
                                    {word}
                                </span>
                            ))}
                        </dt>
                        <dd className="mt-0.5 text-3xl md:text-4xl font-semibold tracking-tight text-neutral-100">
                            <NumberTicker value={value ?? 0} />
                        </dd>
                    </div>
                ))}
        </dl>
    );
}

export default Stats;
