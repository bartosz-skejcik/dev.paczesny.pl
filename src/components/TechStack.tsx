"use client";

import { Heading } from "@ui/Heading";
import Image from "next/image";
import { Tabs, Tab } from "@ui/Tabs";
import FallingBeam from "@ui/FallingBeam";
import { urlFor } from "@/sanity/lib/image";
import { useEffect, useState } from "react";
import { GroupedSkillsByCategory } from "@/sanity/lib/skills";

type Props = {
    categories: GroupedSkillsByCategory[];
};

export const TechStack = ({ categories }: Props) => {
    const [activeCategoryName, setActiveCategoryName] = useState<string>();

    useEffect(() => {
        console.log(categories);
        if (categories && categories.length > 0 && categories[0].name) {
            setActiveCategoryName(categories[0].name);
        }
    }, [categories]);

    if (!categories) {
        return null;
    }

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
                        initialActiveTab={"frontend"}
                        onChange={(categoryName: string) =>
                            setActiveCategoryName(categoryName)
                        }
                    >
                        {categories.map((category) => (
                            // @ts-ignore
                            <Tab
                                key={category.name}
                                label={category.name!.toUpperCase()}
                                value={category.name}
                            >
                                {({ onClick, ref }) => (
                                    <div
                                        ref={ref}
                                        onClick={onClick}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 p-1"></div>
                                        <span className="capitalize">
                                            {category.name}
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
                            {categories &&
                                categories.filter(
                                    (c) => c.name == activeCategoryName,
                                ).length > 0 &&
                                categories
                                    .filter(
                                        (c) => c.name == activeCategoryName,
                                    )[0]
                                    .skills.map((skill) => (
                                        <div
                                            key={skill._id}
                                            className="flex w-full items-center justify-start gap-2"
                                        >
                                            <div className="flex aspect-square h-12 w-12 items-center justify-center rounded-md bg-neutral-700 p-1">
                                                <Image
                                                    src={urlFor(skill.icon!)!
                                                        .height(128)
                                                        .width(128)
                                                        .url()}
                                                    alt={skill.name!}
                                                    width={128}
                                                    height={128}
                                                    className="rounded-md object-contain"
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
