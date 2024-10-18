"use client";
import React from "react";
import { Heading } from "./ui/Heading";
import Link from "next/link";
import Image from "next/image";
import { Paragraph } from "./ui/Paragraph";
import { motion } from "framer-motion";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { ProjectsQueryResult } from "@/sanity/types";

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

type Props = {
    projects: ProjectsQueryResult;
};
export const Projects = ({ projects }: Props) => {
    console.log(projects);
    return (
        <div>
            <div className="grid grid-cols-1 gap-10">
                {projects.map((project, idx: number) => (
                    <motion.div
                        key={project._id}
                        initial={{
                            opacity: 0,
                            x: -50,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{ duration: 0.2, delay: idx * 0.1 }}
                    >
                        <Link
                            href={
                                project._id
                                    ? `/projects/${project._id}`
                                    : project._id
                            }
                            key={project._id}
                            onClick={() => {
                                window.logEvent("view-project", {
                                    projectId: project._id,
                                });
                            }}
                            className="group flex flex-col items-center justify-start space-y-4 rounded-2xl p-4 transition duration-200 hover:bg-neutral-800 md:flex-row md:space-x-4 md:space-y-0"
                        >
                            <Image
                                src={
                                    project.thumbnail
                                        ? urlFor(project.thumbnail)!
                                              .width(1280)
                                              .height(720)
                                              .url()
                                        : "https://placehold.co/1280x720"
                                }
                                alt="thumbnail"
                                height="720"
                                width="1280"
                                className="w-1/4 rounded-md"
                            />
                            <div className="flex flex-col justify-between">
                                <div>
                                    <Heading
                                        as="h4"
                                        className="text-lg font-black md:text-lg lg:text-lg"
                                        clipBg={false}
                                    >
                                        {project.title}
                                    </Heading>
                                    <Paragraph className="mt-1 max-w-xl text-sm md:text-sm lg:text-sm">
                                        {project.description}
                                    </Paragraph>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2 md:mb-1">
                                    {project.technologies?.map((stack) => (
                                        <span
                                            key={stack.name}
                                            className="rounded-sm bg-neutral-700 px-2 py-1 text-xs text-primary md:text-xs lg:text-xs"
                                        >
                                            {stack.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
