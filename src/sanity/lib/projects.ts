import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";

const options = {
    //next: {
    //    revalidate: 60,
    //},
};

export async function getProjects() {
    const projectsQuery = defineQuery(
        `*[_type == "project"][]{_id, title, description, thumbnail, technologies[]->{name}}`,
    );

    const projects = await client.fetch(projectsQuery, {}, options);

    return projects;
}

export async function getProjectById(id: string) {
    const singleProjectQuery = defineQuery(
        `*[_type == "project" && _id == $id]{_id, ..., technologies[]->}[0]`,
    );

    const project = await client.fetch(singleProjectQuery, { id }, options);

    return project;
}
