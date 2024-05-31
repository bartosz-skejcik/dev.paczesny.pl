import React from "react";
import { getProjects } from "@/lib/supabase/server";
import Card from "./projects/card";

type Props = {};

async function Projects({}: Props) {
    const projects = await getProjects();

    return (
        <section className="text-white py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center space-y-8">
                    <div className="text-center space-y-4">
                        <h6 className="uppercase text-amber-500 font-medium text-base mb-3">
                            Projects
                        </h6>
                        <h1 className="text-4xl lg:text-5xl font-semibold text-center">
                            My Best Projects
                        </h1>
                        <p className="max-w-[600px] text-gray-400">
                            Explore a collection of my most innovative and
                            creative projects, each one a testament to my
                            passion for pushing the boundaries of web
                            development.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                        {projects.map((project) => (
                            // @ts-ignore
                            <Card key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Projects;
