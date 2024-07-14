import { Contact } from "@/components/Contact";
import { Container } from "@ui/Container";
import { Heading } from "@ui/Heading";
import { Paragraph } from "@ui/Paragraph";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Bartek Paczesny",
    description:
        "Bartek Paczesny is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

export default function Projects() {
    return (
        <Container>
            <span className="text-4xl">✉️</span>
            <Heading className="font-black mb-2">Contact Me</Heading>
            <Paragraph className="mb-10 max-w-xl">
                Reach out to me over email or fill up this contact form. I will
                get back to you ASAP - I promise.{" "}
            </Paragraph>
            <Contact />
        </Container>
    );
}
