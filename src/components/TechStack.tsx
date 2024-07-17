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
                className="mb-4 mt-20 text-lg font-black md:text-lg lg:text-lg"
            >
                Tech Stack
            </Heading>
            <div className="mx-auto flex max-w-4xl flex-col space-y-4 sm:mt-10 md:flex-row md:space-x-2 md:space-y-0">
                <div className="relative flex flex-row overflow-x-auto md:flex-col md:overflow-x-visible">
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
                                        className="flex items-center gap-2"
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 p-1"></div>
                                        <span className="capitalize">
                                            {category}
                                        </span>
                                    </div>
                                )}
                            </Tab>
                        ))}
                    </Tabs>
                </div>
                <div className="flex-1 md:pl-10">
                    <div className="flex w-full flex-col space-y-4">
                        <div
                            className="grid w-full grid-cols-1 gap-4 p-4 lg:grid-cols-3"
                            style={{
                                opacity: 1,
                                transform: "none",
                                transformOrigin: "50% 50% 0px",
                            }}
                        >
                            {activeCategory.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="flex w-full items-center justify-start gap-2"
                                >
                                    <div className="flex aspect-square h-12 w-12 items-center justify-center rounded-md bg-neutral-700 p-1.5">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${skill.icon!}`}
                                            alt={skill.name}
                                            width={128}
                                            height={128}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <h1 className="whitespace-nowrap text-lg font-medium text-primary">
                                            {skill.name}
                                        </h1>
                                        <div className="text-sm tracking-widest text-secondary">
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
