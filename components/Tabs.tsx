/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { motion } from "framer-motion";
import { tabVariant, slideInVariant } from "@utils/motion";
import Tile from "./Tile";
import { event } from "nextjs-google-analytics";

type Props = {};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Tabs({}: Props) {
    const [categories, setCategories] = useState({});

    // query data from api/sanity/get?collection=skills
    useEffect(() => {
        fetch("/api/sanity/get?collection=skills")
            .then((res) => res.json())
            .then((data) => {
                // the response is an array of objects
                // we need to group them by category
                const categories: any = {
                    Frontend: [],
                    Backend: [],
                    Tools: [],
                };
                data.forEach((skill: any) => {
                    categories[skill.category].push(skill);
                });
                setCategories(categories);
            });
    }, []);

    return (
        <motion.div
            style={{
                overflow: "hidden",
            }}
            className="flex flex-col items-center justify-center w-full px-2 sm:px-0 h-fit"
        >
            <Tab.Group>
                <Tab.List className="flex items-center justify-center w-full gap-6 p-1 md:w-11/12 xl:w-3/4">
                    {Object.keys(categories).map((category, index) => (
                        <Tab
                            onClick={() => {
                                event("view_skill", {
                                    category: "skill",
                                    label: category,
                                });
                            }}
                            key={category}
                            className={({ selected }) =>
                                classNames(
                                    "w-5/6 md:w-2/3 py-2.5 text-md font-medium text-center text-neutral-100 rounded-xl",
                                    "focus:outline-none",
                                    selected
                                        ? "bg-neutral-900/90 border border-accent"
                                        : "bg-neutral-900/50"
                                )
                            }
                        >
                            <motion.div
                                variants={slideInVariant("top", 0.1 * index)}
                                className="w-full text-center"
                            >
                                {category}
                            </motion.div>
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="w-full py-4 mt-3 md:w-11/12 rounded-2xl">
                    {Object.values(categories).map((category, i) => (
                        <Tab.Panel
                            key={i}
                            className="flex flex-col items-center justify-center gap-5"
                        >
                            <motion.div
                                variants={tabVariant}
                                className="flex flex-wrap items-center justify-center w-full gap-4 md:gap-10"
                            >
                                {/* @ts-ignore */}
                                {category.map((skill, index) => (
                                    <Tile
                                        key={index}
                                        skill={skill}
                                        index={index}
                                    />
                                ))}
                            </motion.div>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </motion.div>
    );
}
