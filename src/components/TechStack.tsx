"use client";

import React, {
    useEffect,
    useState,
    useRef,
    Dispatch,
    SetStateAction,
    ReactNode,
} from "react";
import { Heading } from "@ui/Heading";
import { Database, Tables } from "@lib/database.types";
import Image from "next/image";
import { Tabs, Tab } from "@ui/Tabs";
import FallingBeam from "@ui/FallingBeam";
import { twMerge } from "tailwind-merge";

type StackItem = {
    category: Database["public"]["Enums"]["categoryenum"];
    experience: string | null;
    icon: string | null;
    id: string;
    name: string;
};

export const TechStack = ({ stack }: { stack: StackItem[] }) => {
    const [categories, setCategories] = useState<{
        [key: string]: StackItem[];
    }>({});
    const [activeCategory, setActiveCategory] = useState<StackItem[]>([]);

    useEffect(() => {
        const newCategories: { [key: string]: StackItem[] } = {};

        stack.forEach((skill) => {
            if (!newCategories[skill.category]) {
                newCategories[skill.category] = [];
            }
            newCategories[skill.category].push(skill);
        });

        setCategories(newCategories);
        setActiveCategory(newCategories[Object.keys(newCategories)[0]]);
    }, [stack]);

    return (
        <div>
            <Heading
                as="h2"
                className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
            >
                Tech Stack
            </Heading>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 sm:mt-10 max-w-4xl mx-auto">
                <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible relative">
                    <FallingBeam />
                    <Tabs
                        initialActiveTab={Object.keys(categories)[0]}
                        onChange={(category: string) =>
                            setActiveCategory(categories[category])
                        }
                    >
                        {Object.keys(categories).map((category) => (
                            // @ts-ignore
                            <Tab
                                key={category}
                                label={category}
                                value={category}
                            >
                                {({ active, onClick, ref }) => (
                                    <div
                                        ref={ref}
                                        onClick={onClick}
                                        className="flex gap-2 items-center"
                                    >
                                        <div className="p-1 h-6 w-6 flex items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800"></div>
                                        <span className="capitalize">
                                            {category}
                                        </span>
                                    </div>
                                )}
                            </Tab>
                        ))}
                    </Tabs>
                </div>
                <div className="md:pl-10 flex-1">
                    <div className="flex flex-col space-y-4 w-full">
                        <div
                            className="grid grid-cols-1 gap-4 lg:grid-cols-3 p-4 w-full"
                            style={{
                                opacity: 1,
                                transform: "none",
                                transformOrigin: "50% 50% 0px",
                            }}
                        >
                            {activeCategory.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="flex items-center justify-start gap-2 w-full"
                                >
                                    <div className="w-12 h-12 aspect-square p-1.5 bg-neutral-700 rounded-md flex items-center justify-center">
                                        <Image
                                            src={skill.icon!}
                                            alt={skill.name}
                                            width={128}
                                            height={128}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <h1 className="text-lg font-medium text-primary whitespace-nowrap">
                                            {skill.name}
                                        </h1>
                                        <div className="text-secondary text-sm tracking-widest">
                                            {skill.experience}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
