import { Container } from "@ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Metadata } from "next";

import About from "@/components/About";

export const metadata: Metadata = {
    title: "About | Bartek Paczesny",
    description:
        "Bartek Paczesny is a Polish front-end developer fueled by curiosity and a love for creating with code. Exploring new technologies and pushing boundaries. He's a junior software engineer with 2 years of work experience folowed by 4 years of experience in coding. A self-taught developer with a strong focus on visual design and accessibility.",
};

export default function AboutPage() {
    return (
        <Container>
            <span className="text-4xl">💬</span>
            <Heading className="font-black">About Me</Heading>
            <About />
        </Container>
    );
}
