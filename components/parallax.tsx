"use client";
import React, { ReactNode } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";
import { Chip } from "@nextui-org/chip";

export const Parallax = ({
    items,
    header,
}: {
    items: Project[];
    header: {
        title: string | ReactNode;
        text: string;
        description: string;
    };
}) => {
    const firstRow = items.slice(0, 4);
    const secondRow = items.slice(4, 9);
    const thirdRow = items.slice(9, 14);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 2], [0, 700]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 2], [0, -500]),
        springConfig
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.3], [15, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.3], [0.2, 1]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.3], [20, 0]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.3], [-500, 500]),
        springConfig
    );
    return (
        <div
            ref={ref}
            className="h-[100rem] md:h-[155rem] 2xl:h-[175rem] 2xl:py-56 py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
        >
            <Header {...header} />
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className=""
            >
                <motion.div className="flex flex-row-reverse space-x-reverse xl:gap-20 gap-10 xl:mb-20 mb-10">
                    {firstRow.map((project) => (
                        <ProjectCard
                            project={project}
                            translate={translateX}
                            key={project.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row xl:mb-20 mb-10 xl:gap-20 gap-10">
                    {secondRow.map((project) => (
                        <ProjectCard
                            project={project}
                            translate={translateXReverse}
                            key={project.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-reverse xl:gap-20 gap-10">
                    {thirdRow.map((project) => (
                        <ProjectCard
                            project={project}
                            translate={translateX}
                            key={project.title}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export const Header = ({
    title,
    text,
    description,
}: {
    title: string | ReactNode;
    text: string;
    description: string;
}) => {
    return (
        <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
            <h6 className="uppercase text-amber-500 font-medium text-base mb-3">
                {text}
            </h6>
            <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
                {title}
            </h1>
            <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
                {description}
            </p>
        </div>
    );
};

export const ProjectCard = ({
    project,
    translate,
}: {
    project: Project;
    translate: MotionValue<number>;
}) => {
    return (
        <motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -20,
            }}
            key={project.title}
            className="group/project w-56 h-44 xl:h-96 xl:w-[30rem] relative flex-shrink-0 rounded-xl overflow-hidden"
        >
            <Link
                href={`/projects/${project.id}`}
                className="block group-hover/project:shadow-2xl"
            >
                <Image
                    src={project.thumbnail}
                    height="600"
                    width="600"
                    className="object-cover object-center absolute h-full w-full inset-0"
                    alt={project.title}
                />
            </Link>
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/project:opacity-80 bg-black pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 opacity-0 group-hover/project:opacity-100 text-white flex flex-col items-start gap-2 justify-end">
                <h4 className="text-sm lg:text-xl font-semibold">
                    {project.title}
                </h4>
                <p className="lg:text-base text-xs">
                    {project.short_description}
                </p>
                <div className="hidden md:flex flex-wrap items-center justify-start gap-1.5">
                    {project.skills.map((skill, idx) => {
                        return (
                            <Chip key={idx} variant="flat" color="danger">
                                {skill.name}
                            </Chip>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};
