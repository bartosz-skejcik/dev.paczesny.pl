import { Container } from "@ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Metadata } from "next";

import About from "@/components/About";

export const metadata: Metadata = {
    title: "About | Bartek Paczesny",
    description:
        "Bartek Paczesny is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
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
