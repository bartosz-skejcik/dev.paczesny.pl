"use client";

import { Heading } from "@ui/Heading";
import GitHubCalendar, { Year } from "react-github-calendar";
import { useState } from "react";
import { Tab, Tabs } from "@ui/Tabs";

type Props = {};

function GithubStats({}: Props) {
    const colors = [
        "#161b22", // 5
        "#0c4a6e", // 4
        "#075985", // 3
        "#0369a1", // 2
        "#0ea5e9", // 1
    ];

    const years = [
        new Date().getFullYear().toString(),
        (new Date().getFullYear() - 1).toString(),
        (new Date().getFullYear() - 2).toString(),
    ];

    const [activeYear, setActiveYear] = useState<string>("last");

    const [position, setPosition] = useState<{
        top: number;
        height: number;
        width: number;
        opacity: number;
    }>({
        top: 0,
        height: 0,
        width: 0,
        opacity: 0,
    });

    return (
        <div>
            <Heading
                as="h2"
                className="mb-4 mt-14 text-lg font-black md:text-lg lg:text-lg"
            >
                Github Contributions
            </Heading>
            <section className="calendar mt-10 flex gap-6 text-secondary">
                <GitHubCalendar
                    // @ts-ignore
                    theme={{ dark: colors }}
                    username="bartosz-skejcik"
                    year={activeYear as Year}
                />
                <Tabs
                    initialActiveTab={activeYear}
                    onChange={(year: string) => {
                        setActiveYear(year);
                    }}
                >
                    {years.map((year) => (
                        // @ts-ignore
                        <Tab key={year} label={year} value={year}>
                            {({ active, onClick, ref }) => (
                                <div
                                    ref={ref}
                                    onClick={onClick}
                                    className="flex items-center gap-2"
                                >
                                    <span className="capitalize">{year}</span>
                                </div>
                            )}
                        </Tab>
                    ))}
                </Tabs>
            </section>
        </div>
    );
}

export default GithubStats;
