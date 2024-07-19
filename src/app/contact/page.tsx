import { Contact } from "@/components/Contact";
import { Container } from "@ui/Container";
import { Heading } from "@ui/Heading";
import { Paragraph } from "@ui/Paragraph";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Bartek Paczesny",
    description:
        "Bartek Paczesny is a Polish front-end developer fueled by curiosity and a love for creating with code. Exploring new technologies and pushing boundaries. He's a junior software engineer with 2 years of work experience folowed by 4 years of experience in coding. A self-taught developer with a strong focus on visual design and accessibility.",
};

export default function Projects() {
    return (
        <Container>
            <span className="text-4xl">✉️</span>
            <Heading className="mb-2 font-black">Contact Me</Heading>
            <Paragraph className="mb-10 max-w-xl">
                Reach out to me over email or fill up this contact form. I will
                get back to you ASAP - I promise.{" "}
            </Paragraph>
            <Contact />
        </Container>
    );
}
