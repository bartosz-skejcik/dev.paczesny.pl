"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "./actions";
import { useEffect, useState } from "react";

type Props = {};

const AnimatedCounter = ({ target = 0, duration = 200, start = 0 }) => {
    const [current, setCurrent] = useState(start);

    useEffect(() => {
        const increment = (target - start) / duration;
        const interval = setInterval(() => {
            setCurrent((prev) => {
                if (prev < target) {
                    return prev + increment;
                } else {
                    clearInterval(interval);
                    return target;
                }
            });
        }, 1);

        return () => clearInterval(interval);
    }, [target, duration, start]);

    return (
        <p className="font-bold text-4xl lg:text-5xl">{Math.round(current)}</p>
    );
};

function Stats({}: Props) {
    const { data, isError, isPending } = useQuery({
        queryKey: ["stats"],
        queryFn: async () => await fetchStats("bartosz-skejcik"),
    });

    if (isError) {
        return (
            <div className="w-5/6 lg:w-2/3 flex items-center justify-evenly">
                <p>Failed to fetch data</p>
            </div>
        );
    }

    const emptyStats = {
        projects_completed: 0,
        total_commits: 0,
        years_of_experience: 0,
        technologies_mastered: 0,
    };

    if (isPending && !isError && !data) {
        return (
            <div className="w-5/6 lg:w-2/3 flex lg:flex-row flex-col lg:gap-y-0 gap-y-8 items-center justify-evenly pt-20 lg:pt-36">
                {/* map over each property of the emptyStats object */}
                {Object.entries(emptyStats).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                        <AnimatedCounter target={Number(value)} />
                        <p className="text-default-500 font-semibold lg:text-md text-sm">
                            {/* make each word be in a new line */}
                            {key
                                .replace(/_/g, " ")
                                .split(" ")
                                .map((word, index) => (
                                    <span
                                        key={word}
                                        className={
                                            index == 0
                                                ? "block capitalize"
                                                : index == 1
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

    return (
        <div className="w-5/6 lg:w-2/3 flex lg:flex-row flex-col lg:gap-y-0 gap-y-8 items-center justify-evenly pt-20 lg:pt-36">
            {/* map over each property of the data object */}
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                    <AnimatedCounter target={Number(value)} />
                    <p className="text-default-500 font-semibold lg:text-md text-sm">
                        {/* make each word be in a new line */}
                        {key
                            .replace(/_/g, " ")
                            .split(" ")
                            .map((word, index) => (
                                <span
                                    key={word}
                                    className={
                                        index == 0
                                            ? "block capitalize"
                                            : index == 1
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
