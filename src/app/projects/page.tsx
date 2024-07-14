import { Container } from "@ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Products } from "@/components/Products";
import { Metadata } from "next";
import { getProjects } from "@lib/supabase/server";

export const metadata: Metadata = {
    title: "Projects | Bartek Paczesny",
    description:
        "Bartek Paczesny is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

export default async function Projects() {
    const projects = await getProjects();
    return (
        <Container>
            <span className="text-4xl">⚡</span>
            <Heading className="font-black mb-10">
                {" "}
                What I&apos;ve been working on
            </Heading>

            <Products products={projects} />
        </Container>
    );
}
