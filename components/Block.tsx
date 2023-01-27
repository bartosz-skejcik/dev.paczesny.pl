import { slideInVariant } from "@utils/motion";
import { motion } from "framer-motion";
import React from "react";

type Props = {
    year: number;
    month: string;
    title: string;
    text: string;
    description: string;
    duration: string;
};

export default function Block({
    year,
    month,
    title,
    text,
    description,
    duration,
}: Props) {
    return (
        <motion.div
            variants={slideInVariant("left", 0.2, 300)}
            initial="hidden"
            whileInView="show"
            className="w-full p-4 flex items-start justify-center gap-6"
        >
            <div className="flex flex-col items-end justify-center">
                <h1 className="flex items-end justify-center text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-medium text-neutral-100 gap-1">
                    <span className="text-lg text-accent/70">{"<h1>"}</span>
                    <p>{year}</p>
                    <span className="text-lg text-accent/70">{"</h1>"}</span>
                </h1>
                <p className="flex items-end justify-center text-sm lg:text-md xl:text-lg 2xl:text-xl text-neutral-400 gap-1">
                    <span className="text-lg text-accent/70">{"<p>"}</span>
                    <span>{month}</span>
                    <span className="text-lg text-accent/70">{"</p>"}</span>
                </p>
            </div>
            <div className="h-full w-[2.5px] bg-neutral-300 rounded-full" />
            <div className="flex flex-col items-start justify-center w-2/3">
                <h1 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-medium text-neutral-100 mb-1">
                    {title}
                </h1>
                <p className="text-sm xl:text-md 2xl:text-lg text-neutral-400 w-full lg:w-1/3 text-start">
                    {text}
                </p>
                <p className="text-xs lg:text-sm 2xl:text-md text-accent/80 w-full lg:w-1/3 text-start">
                    {description}
                </p>
                <p className="text-xs lg:text-sm 2xl:text-md text-neutral-400 w-1/2 lg:w-1/3 text-end">
                    {duration}
                </p>
            </div>
        </motion.div>
    );
}
