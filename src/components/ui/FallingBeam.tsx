"use client";

import { motion } from "framer-motion";
import React from "react";

type Props = {};

function FallingBeam({}: Props) {
    return (
        <div className="absolute -left-6 w-px h-full bg-zinc-800 overflow-hidden">
            <motion.span
                initial={{ top: "-5rem" }}
                animate={{ top: "15rem" }}
                transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    repeatDelay: 1.5,
                }}
                className="absolute h-1/3 z-20 w-[0.1rem] rounded-[9999px] shadow-[0_0_0_1px_#ffffff10] rotate-[180deg] bg-gradient-to-t from-transparent via-blue-500 to-cyan-500 -left-0"
            ></motion.span>
        </div>
    );
}

export default FallingBeam;
