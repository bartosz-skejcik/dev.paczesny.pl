"use client";

import { textVariant } from "@utils/motion";
import { motion } from "framer-motion";

type Props = {};

export default function Hero({}: Props) {
    return (
        <section className="w-screen h-screen flex flex-col items-center justify-center gap-10">
            <motion.div
                variants={textVariant(0.1)}
                initial="hidden"
                whileInView={"show"}
                className="text-center flex flex-col items-center md:items-start justify-center w-full md:w-2/3 font-medium text-neutral-100 text-4xl md:text-5xl 2xl:text-6xl"
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
                className="flex items-center justify-center md:justify-start w-full md:w-2/3 gap-6"
            >
                <a
                    href="#about"
                    className="border-2 rounded-2xl border-accent py-1 px-10 text-center text-accent text-lg font-medium hover:text-tertiary hover:bg-accent hover:scale-105 shadow-lg shadow-transparent hover:shadow-accent transition-all duration-300"
                >
                    Get Started
                </a>
                <a
                    href="#projects"
                    className="border-2 rounded-2xl border-accent py-1 px-10 text-center text-accent text-lg font-medium hover:text-tertiary hover:bg-accent hover:scale-105 shadow-lg shadow-transparent hover:shadow-accent transition-all duration-300"
                >
                    Projects
                </a>
            </motion.div>
        </section>
    );
}
