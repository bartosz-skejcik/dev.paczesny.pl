"use client";

import Project from "@components/Project";
import { textVariant } from "@utils/motion";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

type Props = {};

export default function Projects({}: Props) {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("api/sanity/get?collection=projects")
            .then((res) => res.json())
            .then((data) => {
                // remove keys from objects: _key, _ref, _type, _createdAt, _updatedAt, _rev, _id
                data.forEach((project: any, index: number) => {
                    delete project._key;
                    delete project._ref;
                    delete project._type;
                    delete project._createdAt;
                    delete project._updatedAt;
                    delete project._rev;
                    delete project._id;
                    delete project.technologies.createdAt;
                    delete project.technologies._id;
                    delete project.technologies._rev;
                    delete project.technologies._type;
                    delete project.technologies._updatedAt;
                    project.direction = index % 2 === 0 ? true : false;
                });
                setProjects(data);
            });
    }, []);

    return (
        <section
            id="projects"
            className="flex flex-col items-center justify-center w-screen min-h-screen gap-20 overflow-x-hidden h-fit"
        >
            <motion.h1
                variants={textVariant(0.2)}
                initial="hidden"
                whileInView={"show"}
                className="text-3xl font-medium text-neutral-100 md:text-4xl 2xl:text-5xl"
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
