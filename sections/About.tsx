"use client";

import { slideInVariant } from "@utils/motion";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {};

export default function About({}: Props) {
    return (
        <section
            id="about"
            className="w-screen lg:w-3/4 h-[150vh] md:h-screen flex flex-col md:flex-row items-center justify-center md:justify-around gap-20 md:gap-0"
        >
            <div className="flex flex-col items-start justify-center w-5/6 md:w-1/3 lg:w-2/3 tracking-wider gap-10 text-neutral-100">
                <motion.h1
                    variants={slideInVariant("left", 0.1)}
                    initial="hidden"
                    whileInView="show"
                    className="font-medium text-4xl md:text-5xl 2xl:text-6xl mb-2"
                >
                    Some thing <span className="text-accent">about </span>me
                </motion.h1>
                <motion.p
                    variants={slideInVariant("left", 0.2)}
                    initial="hidden"
                    whileInView="show"
                    className="text-md md:text-xl xl:text-2xl w-full lg:w-4/5 xl:w-2/3"
                >
                    As a front-end developer with 4 years of experience in
                    Reactjs, Nextjs, TailwindCSS, and familiar with Prisma, I
                    specialize in creating visually appealing and user-friendly
                    websites that meet industry standards. I am a quick learner,
                    team player and always eager to learn new technologies. Take
                    a look at my portfolio website to see my previous work and
                    development process and consider me as a valuable asset for
                    your team.
                </motion.p>
            </div>
            <motion.div
                variants={slideInVariant("right", 0.2)}
                initial="hidden"
                whileInView="show"
            >
                <Image
                    src="/profile.jpg"
                    alt="Profile"
                    width={300}
                    height={300}
                    className="md:block hidden rounded-lg rotate-6 opacity-90 shadow-[15px_15px_80px_1px_#E94560] shadow-accent"
                />
                <Image
                    src="/profile.jpg"
                    alt="Profile"
                    width={200}
                    height={200}
                    className="block md:hidden rounded-lg rotate-6 opacity-90 shadow-[15px_15px_80px_1px_#E94560] shadow-accent"
                />
            </motion.div>
        </section>
    );
}
