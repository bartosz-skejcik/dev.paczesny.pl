"use client";

import { Tabs } from "@components";
import { textVariant } from "@utils/motion";
import { motion } from "framer-motion";

type Props = {};

export default function Skills({}: Props) {
    return (
        <section
            id="skills"
            className="flex w-screen md:w-2/3 h-screen flex-col items-center justify-center gap-12"
        >
            <div className="flex flex-col items-center justify-center gap-6">
                <motion.h1
                    variants={textVariant(0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    className="font-medium text-accent text-4xl md:text-5xl 2xl:text-6xl"
                >
                    <span className="text-neutral-100">My </span>Skills
                </motion.h1>
                <motion.p
                    variants={textVariant(0.3)}
                    initial="hidden"
                    whileInView={"show"}
                    className="font-medium text-neutral-400 text-lg md:text-2xl xl:text-2xl w-11/12 md:w-2/3 text-center"
                >
                    <span>
                        {"I'm"} an enthusiastic lerner. Here are a couple of
                        technologies
                        {" I've"} been working with recently.
                    </span>
                    <br />
                    <span className="text-md font-normal text-neutral-500">
                        Hover on tiles to reveal experience years
                    </span>
                </motion.p>
            </div>
            <Tabs />
        </section>
    );
}
