/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { tabVariant, slideInVariant } from "@utils/motion";
import Tile from "./Tile";

type Props = {};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Tabs({}: Props) {
    let [categories] = useState({
        Frontend: [
            {
                name: "React.js",
                experience: "3+ years",
                icon: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
            },
            {
                name: "Next.js",
                experience: "2+ years",
                icon: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg",
            },
            {
                name: "Tailwind CSS",
                experience: "3+ years",
                icon: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
            },
            {
                name: "Framer Motion",
                experience: "6 months",
                icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
            },
            {
                name: "Headless UI",
                experience: "1 year",
                icon: "/headless-ui.svg",
            },
            {
                name: "TypeScript",
                experience: "1+ years",
                icon: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
            },
        ],
        Backend: [
            {
                name: "Node.js",
                experience: "3+ years",
                icon: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
            },
            {
                name: "Express.js",
                experience: "1+ years",
                icon: "/express.svg",
            },
            {
                name: "MongoDB",
                experience: "1+ years",
                icon: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
            },
            {
                name: "Prisma",
                experience: "1 year",
                icon: "https://cdn.worldvectorlogo.com/logos/prisma-3.svg",
            },
            {
                name: "MySQL",
                experience: "2 year",
                icon: "https://cdn.worldvectorlogo.com/logos/mysql-6.svg",
            },
        ],
        Tools: [
            {
                name: "Git",
                experience: "3+ years",
                icon: "https://cdn.worldvectorlogo.com/logos/git-icon.svg",
            },
            {
                name: "GitHub",
                experience: "3+ years",
                icon: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg",
            },
            {
                name: "VS Code",
                experience: "4 years",
                icon: "https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg",
            },
            {
                name: "Figma",
                experience: "1 year",
                icon: "https://cdn.worldvectorlogo.com/logos/figma-1.svg",
            },
            {
                name: "IntelliJ IDEA",
                experience: "1 year",
                icon: "https://cdn.worldvectorlogo.com/logos/intellij-idea-1.svg",
            },
            {
                name: "Postman",
                experience: "1 year",
                icon: "https://cdn.worldvectorlogo.com/logos/postman.svg",
            },
        ],
    });

    return (
        <motion.div
            style={{
                overflow: "hidden",
            }}
            className="px-2 sm:px-0 flex flex-col items-center justify-center h-fit w-full"
        >
            <Tab.Group>
                <Tab.List className="flex items-center justify-center gap-6 p-1 w-full md:w-11/12">
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
                <Tab.Panels className="mt-3 w-full md:w-11/12 py-4 rounded-2xl">
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
