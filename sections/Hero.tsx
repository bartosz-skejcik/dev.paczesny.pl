"use client";

import { textVariant } from "@utils/motion";
import { motion } from "framer-motion";

type Props = {};

export default function Hero({}: Props) {
    return (
        <section className="flex flex-col items-center justify-center w-screen h-screen gap-10">
            <motion.div
                variants={textVariant(0.1)}
                initial="hidden"
                whileInView={"show"}
                className="flex flex-col items-center justify-center w-screen text-4xl font-medium text-center md:items-start md:w-2/3 text-neutral-100 md:text-5xl 2xl:text-6xl"
            >
                <h1 className="">
                    Hi, {"I'm "}
                    <span className="text-accent">Bartek.</span>
                </h1>
                <h1>{"I'm a "}full stack developer.</h1>
            </motion.div>
            <motion.div
                variants={textVariant(0.2)}
                initial="hidden"
                whileInView={"show"}
                className="flex items-center justify-center w-full gap-6 lg:w-2/3 md:justify-start"
                style={{
                    overflow: "hidden",
                }}
            >
                <a
                    href="#about"
                    className="px-10 py-1 text-lg font-medium text-center transition-all duration-300 border-2 shadow-lg rounded-2xl border-accent text-accent hover:text-tertiary hover:bg-accent hover:scale-105 shadow-transparent hover:shadow-accent"
                >
                    Get Started
                </a>
                <a
                    href="#projects"
                    className="px-10 py-1 text-lg font-medium text-center transition-all duration-300 border-2 shadow-lg rounded-2xl border-accent text-accent hover:text-tertiary hover:bg-accent hover:scale-105 shadow-transparent hover:shadow-accent"
                >
                    Projects
                </a>
            </motion.div>
        </section>
    );
}
