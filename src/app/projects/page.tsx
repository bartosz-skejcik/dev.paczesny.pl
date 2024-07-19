import { Container } from "@ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Products } from "@/components/Products";
import { Metadata } from "next";
import { getProjects } from "@lib/supabase/server";

export const metadata: Metadata = {
    title: "Projects | Bartek Paczesny",
    description:
        "Bartek Paczesny is a Polish front-end developer fueled by curiosity and a love for creating with code. Exploring new technologies and pushing boundaries. He's a junior software engineer with 2 years of work experience folowed by 4 years of experience in coding. A self-taught developer with a strong focus on visual design and accessibility.",
};

export default async function Projects() {
    const projects = await getProjects();
    return (
        <Container>
            <span className="text-4xl">⚡</span>
            <Heading className="mb-10 font-black">
                {" "}
                What I&apos;ve been working on
            </Heading>

            <Products products={projects} />
        </Container>
    );
}
