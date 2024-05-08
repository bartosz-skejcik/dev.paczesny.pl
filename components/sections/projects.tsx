import { Project } from "@/types/project";
import React from "react";
import { Parallax } from "../parallax";
import { getProjects } from "@/lib/supabase/server";

type Props = {};

const header = {
    title: "Highlight of my best projects",
    text: "projects",
    description:
        "We build beautiful items with the latest technologies and frameworks. We are a team of passionate developers and designers that love to build amazing items",
};

async function Projects({}: Props) {
    const projects = await getProjects();

    return (
        <section className="my-10">
            <Parallax items={projects as any} header={header} />
        </section>
    );
}

export default Projects;
