"use client";

import Block from "@components/Block";
import { textVariant } from "@utils/motion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {};

export default function Education({}: Props) {
    const [paths, setPaths] = useState([]);

    useEffect(() => {
        fetch("api/sanity/get?collection=education")
            .then((res) => res.json())
            .then((data) => {
                setPaths(data);
            });
    }, []);

    return (
        <section
            id="education"
            className="flex flex-col items-center justify-center w-11/12 min-h-screen gap-8 h-fit"
        >
            <motion.h1
                variants={textVariant(0.2)}
                initial="hidden"
                whileInView={"show"}
                className="mb-2 text-3xl font-medium text-neutral-100 md:text-4xl 2xl:text-5xl"
            >
                Insights into my <span className="text-accent">journey</span>
            </motion.h1>
            {paths.map((path: any, index: number) => {
                return (
                    <Block
                        key={index}
                        year={new Date(path.date).getFullYear()}
                        month={new Date(path.date).toLocaleDateString("en-US", {
                            month: "long",
                        })}
                        title={path.title}
                        text={path.text}
                        description={path.description}
                        duration={path.duration}
                    />
                );
            })}
        </section>
    );
}
