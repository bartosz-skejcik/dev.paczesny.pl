import { Container } from "@ui/Container";
import { SingleProduct } from "@/components/Product";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getProject, getProjects } from "@lib/supabase/server";
import { Tables } from "@lib/database.types";

type Props = {
    params: { slug: string };
};

interface Project extends Tables<"projects"> {
    skills?: Tables<"skills">[];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = params.slug;
    const projects = await getProjects();
    const project: Tables<"projects"> | undefined = projects.find(
        (project: Tables<"projects">) => project.id === slug,
    );

    if (project) {
        return {
            title: project.title,
            description: project.full_description,
        };
    } else {
        return {
            title: "Projects | Bartek Paczesny",
            description:
                "Bartek Paczesny is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
        };
    }
}

export default async function SingleProjectPage({
    params,
}: {
    params: { slug: string };
}) {
    const slug = params.slug;
    const project = await getProject(slug);

    if (!project) {
        redirect("/projects");
    }
    return (
        <Container>
            <SingleProduct project={project} />
        </Container>
    );
}
