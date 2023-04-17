"use client";

import { slideInVariant } from "@utils/motion";
import { urlFor } from "@utils/sanity";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
    data: AboutResponse;
};

export default function About({ data }: Props) {
    return (
        <section
            id="about"
            className="lg:w-3/4 h-[150vh] md:h-screen flex flex-col md:flex-row items-center justify-center md:justify-around gap-20 md:gap-0 overflow-x-hidden"
        >
            <div className="flex flex-col items-start justify-center w-5/6 gap-10 overflow-x-hidden tracking-wider md:w-1/3 lg:w-2/3 text-neutral-100">
                <motion.h1
                    variants={slideInVariant("left", 0.1)}
                    initial="hidden"
                    whileInView="show"
                    className="mb-2 text-4xl font-medium md:text-5xl 2xl:text-6xl"
                >
                    Some thing <span className="text-accent">about </span>me
                </motion.h1>
                <motion.p
                    variants={slideInVariant("left", 0.2)}
                    initial="hidden"
                    whileInView="show"
                    className="w-full text-md md:text-xl xl:text-2xl lg:w-4/5 xl:w-2/3"
                >
                    {data?.description}
                </motion.p>
            </div>
            <motion.div
                variants={slideInVariant("right", 0.2)}
                initial="hidden"
                whileInView="show"
            >
                <Image
                    src={urlFor(data?.image).url()}
                    alt="Profile"
                    width={300}
                    height={300}
                    className="md:block hidden rounded-lg rotate-6 opacity-90 shadow-[15px_15px_80px_1px_#E94560] shadow-accent"
                />
                <Image
                    src={urlFor(data?.image).url()}
                    alt="Profile"
                    width={200}
                    height={200}
                    className="block md:hidden rounded-lg rotate-6 opacity-90 shadow-[15px_15px_80px_1px_#E94560] shadow-accent"
                />
            </motion.div>
        </section>
    );
}
