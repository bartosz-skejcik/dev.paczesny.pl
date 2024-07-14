"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Heading } from "@ui/Heading";
import { Paragraph } from "@ui/Paragraph";
import { motion } from "framer-motion";
import { Tables } from "@lib/database.types";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

interface Project extends Tables<"projects"> {
    skills?: Tables<"skills">[];
}

export const SingleProduct = ({ project }: { project: Project }) => {
    const [activeImage, setActiveImage] = useState<string>(project.thumbnail!);
    return (
        <div className="py-10">
            <Link
                href={"/projects"}
                className="mt-auto flex w-fit items-center rounded-full bg-transparent p-2 text-sm font-medium text-neutral-200 shadow-lg ring-1 ring-neutral-100 ring-neutral-950/60 transition hover:bg-neutral-200 hover:text-neutral-950 hover:shadow-white/20 focus:outline-none focus-visible:ring-offset-2 sm:backdrop-blur-sm"
            >
                <IconArrowLeft className="h-4 w-4" />
            </Link>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
                key={activeImage}
                className="relative mt-6 sm:mt-8"
            >
                <Image
                    src={activeImage}
                    alt="thumbnail"
                    height="1000"
                    width="1000"
                    className="rounded-md object-contain"
                />
                <div className="absolute bottom-0 h-40 w-full bg-gradient-to-b from-transparent to-neutral-900" />
            </motion.div>
            {/* <div className="flex flex-row justify-center my-8 flex-wrap">
                {product.images.map((image, idx) => (
                    <button
                        onClick={() => setActiveImage(image)}
                        key={`image-thumbnail-${idx}`}
                    >
                        <Image
                            src={image}
                            alt="product thumbnail"
                            height="1000"
                            width="1000"
                            className="h-14 w-16 md:h-40 md:w-60 object-cover object-top mr-4 mb-r border rounded-lg border-neutral-800"
                        />
                    </button>
                ))}
            </div> */}
            <div className="mt-20 flex flex-col items-center justify-between lg:flex-row">
                <Heading className="mb-2 pb-1 font-black">
                    {" "}
                    {project.title}
                </Heading>
            </div>
            <div className="mt-2 flex space-x-2 md:mb-1 md:mt-0">
                {project.skills?.map((stack: { name: string }) => (
                    <span
                        key={stack.name}
                        className="whitespace-nowrap rounded-sm bg-neutral-800 px-2 py-1 text-xs text-secondary md:text-xs lg:text-xs"
                    >
                        {stack.name}
                    </span>
                ))}
            </div>
            <div className="mb-5">
                <Paragraph className="mt-4 max-w-xl">
                    {project.full_description}
                </Paragraph>
            </div>
            {/* <div className="prose prose-sm md:prose-base max-w-none text-neutral-500">
                {project?.content}
            </div> */}

            <Link
                href={project.link || "#"}
                target="__blank"
                className="group/button mt-auto inline-flex origin-left items-center gap-1 rounded-full bg-neutral-200 px-4 py-2 text-sm font-medium text-black shadow-lg shadow-white/20 ring-neutral-950/60 ring-offset-neutral-100 transition hover:scale-105 focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 group-hover/button:scale-105 group-hover/button:bg-neutral-950/15 sm:backdrop-blur-sm"
            >
                Live Preview
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                >
                    <path d="M5 12l14 0"></path>
                    <path d="M13 18l6 -6"></path>
                    <path d="M13 6l6 6"></path>
                </svg>
            </Link>
        </div>
    );
};
