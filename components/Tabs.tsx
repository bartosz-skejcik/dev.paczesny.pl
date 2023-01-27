/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { tabVariant, slideInVariant } from "@utils/motion";

type Props = {};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Tabs({}: Props) {
    let [categories] = useState({
        Frontend: [
            {
                name: "3+ years",
                icon: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
            },
            {
                name: "2+ years",
                icon: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg",
            },
            {
                name: "3+ years",
                icon: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
            },
            {
                name: "6 months",
                icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
            },
            {
                name: "1 year",
                icon: "/headless-ui.svg",
            },
            {
                name: "1+ years",
                icon: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
            },
        ],
        Backend: [
            {
                name: "3+ years",
                icon: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
            },
            {
                name: "1+ years",
                icon: "/express.svg",
            },
            {
                name: "1+ years",
                icon: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
            },
            {
                name: "1 year",
                icon: "https://cdn.worldvectorlogo.com/logos/prisma-3.svg",
            },
            {
                name: "2 year",
                icon: "https://cdn.worldvectorlogo.com/logos/mysql-6.svg",
            },
        ],
        Tools: [
            {
                name: "3+ years",
                icon: "https://cdn.worldvectorlogo.com/logos/git-icon.svg",
            },
            {
                name: "3+ years",
                icon: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg",
            },
            {
                name: "4 years",
                icon: "https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg",
            },
            {
                name: "1 year",
                icon: "https://cdn.worldvectorlogo.com/logos/figma-1.svg",
            },
            {
                name: "1 year",
                icon: "https://cdn.worldvectorlogo.com/logos/intellij-idea-1.svg",
            },
            {
                name: "1 year",
                icon: "https://cdn.worldvectorlogo.com/logos/postman.svg",
            },
        ],
    });
    return (
        <motion.div
            style={{
                overflow: "hidden",
            }}
            className="w-5/6 md:2/3 px-2 sm:px-0 flex flex-col items-center justify-center"
        >
            <Tab.Group>
                <Tab.List className="flex items-center justify-center gap-6 p-1 w-full md:w-2/3">
                    {Object.keys(categories).map((category, index) => (
                        <Tab
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
                            ></motion.div>
                            {category}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-3 w-full md:w-2/3 py-4 rounded-2xl">
                    {Object.values(categories).map((category, i) => (
                        <Tab.Panel
                            key={i}
                            className="flex flex-col items-center justify-center gap-5"
                        >
                            <motion.div
                                variants={tabVariant}
                                className="flex flex-wrap items-center justify-center w-full gap-4 md:gap-10"
                            >
                                {category.map((skill, index) => (
                                    <motion.div
                                        variants={slideInVariant(
                                            "bottom",
                                            0.1 * index,
                                            100
                                        )}
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                        key={index}
                                        className="flex flex-col items-center justify-center gap-2 w-1/3 md:w-1/4 2xl:w-1/6 py-3 rounded-2xl bg-neutral-800/70"
                                    >
                                        <Image
                                            src={skill.icon}
                                            alt={skill.name}
                                            width={48}
                                            height={48}
                                            className="w-16 h-16"
                                        />
                                        <p className="text-sm font-medium text-center text-neutral-100">
                                            {skill.name}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </motion.div>
    );
}
