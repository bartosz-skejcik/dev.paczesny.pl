"use client";

import { motion } from "framer-motion";
import { event } from "nextjs-google-analytics";

type Props = {
    href: string;
    text: string;
    setOpen?: (open: boolean) => void;
    open?: boolean;
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

export default function LinkBlock({ href, text, open, setOpen }: Props) {
    return (
        <motion.a
            onClick={() => {
                setOpen && setOpen(!open);
                event("navigate_to", {
                    category: "navbar",
                    label: text,
                });
            }}
            href={href}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="text-xl font-medium text-center text-neutral-100 hover:cursor-pointer"
        >
            <span className="font-medium text-accent">{"// "}</span>
            {text}
            <motion.div
                variants={underscoreMotion}
                className="w-full h-[3px] mt-0.5 rounded-full bg-accent/90"
            />
        </motion.a>
    );
}
