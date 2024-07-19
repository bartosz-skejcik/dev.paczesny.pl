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
    images?: Tables<"images">[];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = params.slug;
    const projects = await getProjects();
    const project = projects.find((project) => project.id === slug);

    if (project) {
        return {
            title: project.title,
            description: project.description,
        };
    } else {
        return {
            title: "Projects | Bartek Paczesny",
            description:
                "Bartek Paczesny is a Polish front-end developer fueled by curiosity and a love for creating with code. Exploring new technologies and pushing boundaries. He's a junior software engineer with 2 years of work experience folowed by 4 years of experience in coding. A self-taught developer with a strong focus on visual design and accessibility.",
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
            <SingleProduct project={project as Project} />
        </Container>
    );
}
