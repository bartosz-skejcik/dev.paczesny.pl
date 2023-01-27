"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LinkBlock from "./Link";
import { slideInVariant } from "@utils/motion";

const links = [
    {
        href: "#about",
        text: "about",
    },
    {
        href: "#skills",
        text: "skills",
    },
    {
        href: "#education",
        text: "education",
    },
    {
        href: "#projects",
        text: "projects",
    },
    {
        href: "#contact",
        text: "contact",
    },
];

type Props = {};

export default function Navbar({}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full flex items-center justify-around py-4 bg-[#001120]">
            <motion.div
                onClick={() => {
                    window.location.href = "#";
                }}
                className="flex items-center justify-start gap-3 hover:cursor-pointer"
                variants={slideInVariant("top", 0.3)}
                initial="hidden"
                animate="show"
                exit="exit"
            >
                <Image
                    src={"/logo.svg"}
                    alt={"Logo"}
                    width={35}
                    height={35}
                    className="rounded-full block md:hidden"
                />
                <Image
                    src={"/logo.svg"}
                    alt={"Logo"}
                    width={40}
                    height={40}
                    className="rounded-full md:block hidden"
                />
                <h1 className="tex-lg md:text-2xl text-center font-semibold text-neutral-100">
                    <span className="text-accent">dev</span>.paczesny
                </h1>
            </motion.div>
            <motion.div
                variants={slideInVariant("top", 0.4)}
                initial="hidden"
                animate="show"
                exit="exit"
                className="hidden lg:flex items-center justify-center gap-12"
            >
                {links.map((link) => (
                    <LinkBlock
                        href={link.href}
                        key={link.text}
                        text={link.text}
                    />
                ))}
            </motion.div>
            <motion.a
                variants={slideInVariant("top", 0)}
                initial="hidden"
                animate="show"
                exit="exit"
                href="https://github.com/bartosz-skejcik"
                target="_blank"
                rel="noreferrer"
                className="hidden lg:flex items-center justify-between py-1 px-6 gap-6 rounded-2xl border-2 border-transparent hover:border-accent hover:scale-105 transition-all duration-300"
            >
                <Image
                    src={"/github.png"}
                    alt={"Github"}
                    width={20}
                    height={20}
                    className="rounded-full hidden md:block"
                />
                <Image
                    src={"/github.png"}
                    alt={"Github"}
                    width={15}
                    height={15}
                    className="rounded-full md:hidden block"
                />
                <p className="font-medium text-md md:text-xl mt-0.5 md:mt-0 text-accent">
                    Github
                </p>
            </motion.a>
            {/* //! ADD MOBILE NAV HERE */}
            <button
                className={`block lg:hidden hover:cursor-pointer relative z-50`}
                onClick={() => setOpen(!open)}
            >
                {open ? (
                    <XMarkIcon className="h-8 w-8 text-accent" />
                ) : (
                    <Bars3BottomRightIcon className="w-8 h-8 text-accent" />
                )}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{
                            x: 500,
                        }}
                        animate={{
                            x: 0,
                        }}
                        exit={{
                            x: 1000,
                        }}
                        className="lg:hidden absolute top-0 right-0 z-40 bg-tertiary py-12 flex flex-col items-center justify-between w-screen md:w-1/2 h-screen gap-6"
                    >
                        <motion.div className="flex flex-col items-center justify-center h-full gap-6">
                            {links.map((link) => (
                                <LinkBlock
                                    href={link.href}
                                    key={link.text}
                                    text={link.text}
                                />
                            ))}
                            <Link
                                href="https://github.com/bartosz-skejcik"
                                className="flex items-center justify-between py-1 px-6 gap-6 mt-8 rounded-2xl border-2 border-transparent hover:border-accent hover:scale-105 transition-all duration-300"
                            >
                                <Image
                                    src={"/github.png"}
                                    alt={"Github"}
                                    width={17}
                                    height={17}
                                    className="rounded-full"
                                />
                                <p className="font-medium text-md md:text-xl mt-0.5 md:mt-0 text-accent">
                                    Github
                                </p>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
