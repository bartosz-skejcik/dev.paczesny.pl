"use client";

import Project from "@components/Project";
import { textVariant } from "@utils/motion";
import { motion } from "framer-motion";
import React from "react";

type Props = {};

let projects = [
    {
        name: "Agencytech.pl",
        description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, Prisma, Framer Motion and MySQL. It includes a dashboard panel for clients to manage their orders as well as admins for managing clients projects. The payments on the website are handled by Stripe. with a checkout form and custom webhooks.",
        technologies: [
            "Next.js",
            "MySQL",
            "TailwindCSS",
            "Prisma",
            "Framer Motion",
        ],
        github: "https://github.com/agencytech/agencytech.pl",
        website: "http://agencytech.pl",
        image: "/images/agencytech.png",
        direction: true,
    },
    {
        name: "HouseElectronics.eu",
        description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, and Framer Motion. It includes a contact form with reCAPTCHA.",
        technologies: ["Next.js", "TailwindCSS", "Framer Motion"],
        github: "https://github.com/bartosz-skejcik/paczesny.pl",
        website: "https://houseelectronics.eu",
        image: "/images/houseelectronics.png",
    },
    {
        name: "Cape Looter",
        description:
            "A JavaScript program that allows you to download minecraft cosmetics and capes from a discord server using a proxy pass. The program is terminal based and uses inquirer.js to create a user-friendly interface. You can also change the download path in a custom config.json file.",
        technologies: ["JavaScript", "Node.js", "Inquirer"],
        github: "https://github.com/bartosz-skejcik/cape-looter",
        website: "https://www.npmjs.com/package/cape-looter",
        image: "/images/cape-looter.png",
        direction: true,
    },
    {
        name: "Future Tab",
        description:
            "A chrome extension that allows you to set a custom new tab page. It has an account system that allows you to save your settings and sync them across devices. You can also set a custom background image, customize widgets and change color theme.",
        technologies: ["Next.js", "TailwindCSS", "Prisma", "MongoDB"],
        github: "https://github.com/bartosz-skejcik/extension",
        website:
            "https://chrome.google.com/webstore/detail/future-tab/ahfigmflgemalcblplnddomjoblknipc?hl=pl&authuser=0",
        image: "/images/extension.png",
    },
];

export default function Projects({}: Props) {
    return (
        <section
            id="projects"
            className="flex flex-col items-center justify-center w-screen min-h-screen gap-20"
        >
            <motion.h1
                variants={textVariant(0.2)}
                initial="hidden"
                whileInView={"show"}
                className="font-medium text-neutral-100 text-3xl md:text-4xl 2xl:text-5xl"
            >
                A Review of my<span className="text-accent"> best </span>
                Projects
            </motion.h1>
            {projects.map((project: any, index: number) => (
                <Project key={index} project={project} />
            ))}
        </section>
    );
}
