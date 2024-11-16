import { Container } from "@ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Metadata } from "next";

import About from "@/components/About";

export const metadata: Metadata = {
    title: "About | Bartek Paczesny",
    description:
        "A fullstack developer from Poland, obsessed with figuring out how stuff works and making cool things with code. Has been coding for 5 years, including a 2-month internship as a Junior Software Engineer. Self-taught in everything, focused on clean design and making sure builds work for everyone.",
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
