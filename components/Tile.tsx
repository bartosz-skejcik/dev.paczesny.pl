"use client";

import { slideInVariant } from "@utils/motion";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

type Props = {
    index: number;
    skill: any;
};

export default function Tile({ skill, index }: Props) {
    const [hover, setHover] = useState(false);
    return (
        <AnimatePresence>
            <motion.div
                variants={slideInVariant("bottom", 0.1 * index, 100)}
                initial="hidden"
                animate="show"
                exit="exit"
                key={index}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="flex flex-col items-center justify-center gap-2 w-1/3 md:w-1/4 2xl:w-1/6 py-3 rounded-2xl bg-neutral-800/70"
            >
                <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className="w-16 h-16"
                />
                {hover ? (
                    <motion.p
                        variants={slideInVariant("bottom", 0.1, 100)}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="text-sm font-medium text-center text-neutral-100"
                    >
                        {skill.experience}
                    </motion.p>
                ) : (
                    <motion.p
                        variants={slideInVariant("bottom", 0.1, 100)}
                        initial
                        animate="show"
                        exit="exit"
                        className="text-sm font-medium text-center text-neutral-100"
                    >
                        {skill.name}
                    </motion.p>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
