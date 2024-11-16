import { Container } from "@ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Projects } from "@/components/Projects";
import { Metadata } from "next";
import { getProjects } from "@/sanity/lib/projects";

export const metadata: Metadata = {
    title: "Projects | Bartek Paczesny",
    description:
        "A fullstack developer from Poland, obsessed with figuring out how stuff works and making cool things with code. Has been coding for 5 years, including a 2-month internship as a Junior Software Engineer. Self-taught in everything, focused on clean design and making sure builds work for everyone.",
};

export default async function ProjectsPage() {
    const projects = await getProjects();
    return (
        <Container maxWidth="max-w-5xl">
            <span className="text-4xl">⚡</span>
            <Heading className="mb-10 font-black">
                {" "}
                What I&apos;ve been working on
            </Heading>

            <Projects projects={projects} />
        </Container>
    );
}
