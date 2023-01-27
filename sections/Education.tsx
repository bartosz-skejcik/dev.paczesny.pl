"use client";

import Block from "@components/Block";
import { textVariant } from "@utils/motion";
import { motion } from "framer-motion";
import React from "react";

type Props = {};

const paths = [
    {
        year: 2018,
        month: "October",
        title: "started coding",
        text: "This is where it all started",
    },
    {
        year: 2019,
        month: "September",
        title: "high school",
        text: "Zespół Szkół nr 14, Warsaw",
        description: "Specialization - IT specialist",
        duration: "4 years",
    },
    {
        year: 2021,
        month: "May",
        title: "code internship",
        text: "Devapo",
        description: "react / jest / git",
        duration: "1 month",
    },
    {
        year: 2021,
        month: "June",
        title: "proffesion exam",
        text: "Zespół Szkół nr 14, Warsaw",
        description: "INF.02 pract. 100% / theory 86%",
    },
];

export default function Education({}: Props) {
    return (
        <section
            id="education"
            className="flex flex-col items-center justify-center gap-8 w-11/12 h-screen"
        >
            <motion.h1
                variants={textVariant(0.2)}
                initial="hidden"
                whileInView={"show"}
                className="font-medium text-neutral-100 text-3xl md:text-4xl 2xl:text-5xl mb-2"
            >
                Insights into my <span className="text-accent">journey</span>
            </motion.h1>
            {paths.map((path: any, index: number) => {
                return (
                    <Block
                        key={index}
                        year={path.year}
                        month={path.month}
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
