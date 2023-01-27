"use client";

import { motion } from "framer-motion";

type Props = {
    href: string;
    text: string;
};

const underscoreMotion = {
    rest: {
        opacity: 0,
        width: 0,
        duration: 0.7,
    },
    hover: {
        opacity: 1,
        width: "100%",
        transition: {
            duration: 0.7,
            type: "spring",
        },
    },
};

export default function LinkBlock({ href, text }: Props) {
    return (
        <motion.a
            href={href}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="text-neutral-100 hover:cursor-pointer text-center text-xl font-medium"
        >
            <span className="text-accent font-medium">{"// "}</span>
            {text}
            <motion.div
                variants={underscoreMotion}
                className="w-full h-[3px] mt-0.5 rounded-full bg-accent/90"
            />
        </motion.a>
    );
}
