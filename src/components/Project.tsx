"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Heading } from "@ui/Heading";
import { Paragraph } from "@ui/Paragraph";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { SingleProjectQueryResult } from "@/sanity/types";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText } from "next-sanity";

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

type Props = {
    project: SingleProjectQueryResult;
};

const getImage = (source: SanityImageSource) => {
    return urlFor(source)?.width(1280).height(720).url();
};

export const SingleProject = ({ project }: Props) => {
    const [activeImage, setActiveImage] = useState<string>(
        getImage(project!.thumbnail!) ?? "https://plahold.co/1280x720",
    );

    console.log(project);

    if (!project) {
        return null;
    }

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
                className="relative mt-6 w-full sm:mt-8"
            >
                <Image
                    src={activeImage}
                    alt="thumbnail"
                    height="1920"
                    width="1080"
                    className="w-full rounded-md object-contain"
                />
                <div className="absolute bottom-0 h-40 w-full bg-gradient-to-b from-transparent to-neutral-900" />
            </motion.div>
            {project.images && (
                <div className="mb-8 mt-12 flex flex-row flex-wrap items-start justify-start gap-y-4">
                    <button
                        onClick={() =>
                            setActiveImage(getImage(project.thumbnail!)!)
                        }
                        className="focus-visible:outline-none"
                    >
                        <Image
                            src={
                                getImage(project!.thumbnail!) ??
                                "https://plahold.co/1280x720"
                            }
                            alt="product thumbnail"
                            height="1000"
                            width="1000"
                            className={`mb-r mr-4 h-14 w-16 rounded-lg border ${getImage(project!.thumbnail!) == activeImage ? "border-blue-500" : "border-neutral-800"} object-cover object-top transition-all duration-200 md:h-40 md:w-60`}
                        />
                    </button>
                    {project.images.map((image, idx) => (
                        <button
                            onClick={() => setActiveImage(getImage(image)!)}
                            key={`image-thumbnail-${idx}`}
                            className="focus-visible:outline-none"
                        >
                            <Image
                                src={
                                    image
                                        ? (getImage(image) ??
                                          "https://placehold.co/1280x720")
                                        : "https://placehold.co/1280x720"
                                }
                                alt="product thumbnail"
                                height="1000"
                                width="1000"
                                className={`mb-r mr-4 h-14 w-16 rounded-lg border ${getImage(image) == activeImage ? "border-blue-500" : "border-neutral-800"} object-cover object-top transition-all duration-200 md:h-40 md:w-60`}
                            />
                        </button>
                    ))}
                </div>
            )}
            <div className="mt-14 flex flex-col items-center justify-between lg:flex-row">
                <Heading className="mb-2 pb-1 font-black" clipBg={false}>
                    {" "}
                    {project.title}
                </Heading>
            </div>
            <div className="mt-4 flex space-x-2 md:mb-3 md:mt-2">
                {project.technologies?.map((stack) => (
                    <span
                        key={stack.name}
                        className="whitespace-nowrap rounded-sm bg-neutral-800 px-2 py-1 text-xs text-secondary md:text-xs lg:text-sm"
                    >
                        {stack.name}
                    </span>
                ))}
            </div>
            <div className="my-5">
                <Paragraph className="mt-4 w-full text-neutral-200">
                    {project.description}
                </Paragraph>
            </div>
            <div className="prose prose-sm mb-5 max-w-none text-neutral-400 md:prose-base">
                {project.content &&
                    Array.isArray(project.content) &&
                    project.content.map((block, idx) => (
                        <PortableText value={block} key={idx} />
                    ))}
            </div>
            {project.live_preview_url && (
                <Link
                    href={project.live_preview_url || "#"}
                    target="__blank"
                    onClick={() => {
                        window.logEvent("view-project-live-preview", {
                            projectId: project._id,
                        });
                    }}
                    className="group/button mt-4 inline-flex origin-left items-center gap-1 rounded-full bg-neutral-200 px-4 py-2 text-sm font-medium text-black shadow-lg shadow-white/20 ring-neutral-950/60 ring-offset-neutral-100 transition hover:scale-105 focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 group-hover/button:scale-105 group-hover/button:bg-neutral-950/15 sm:backdrop-blur-sm"
                >
                    Live Preview
                    <IconArrowRight className="h-4 w-4" />
                </Link>
            )}
            {project.github_url && (
                <Link
                    href={project.github_url || "#"}
                    target="__blank"
                    onClick={() => {
                        window.logEvent("view-project-github", {
                            projectId: project._id,
                        });
                    }}
                    className="group/button ml-4 inline-flex origin-left items-center gap-1 rounded-full bg-neutral-200 px-4 py-2 text-sm font-medium text-black shadow-lg shadow-white/20 ring-neutral-950/60 ring-offset-neutral-100 transition hover:scale-105 focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 group-hover/button:scale-105 group-hover/button:bg-neutral-950/15 sm:backdrop-blur-sm"
                >
                    GitHub
                    <IconArrowRight className="h-4 w-4" />
                </Link>
            )}
        </div>
    );
};
