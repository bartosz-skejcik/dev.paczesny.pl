import { SingleProject } from "@/components/Project";
import { getProjectById } from "@/sanity/lib/projects";
import { SingleProjectQueryResult } from "@/sanity/types";
import { Container } from "@ui/Container";
import { Metadata } from "next";
import { redirect } from "next/navigation";
type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = params.slug;
    const project: SingleProjectQueryResult = await getProjectById(slug);

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
    const project = await getProjectById(slug);

    if (!project) {
        redirect("/projects");
    }

    return (
        <Container maxWidth="max-w-6xl">
            <SingleProject project={project} />
        </Container>
    );
}
