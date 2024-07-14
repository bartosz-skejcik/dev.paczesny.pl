import { Container } from "@ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Highlight } from "@ui/Highlight";
import { Paragraph } from "@ui/Paragraph";
import { WorkHistory } from "@/components/WorkHistory";

export default function Home() {
    return (
        <Container>
            <span className="text-4xl">💼</span>
            <Heading className="font-black">Resume</Heading>
            <Paragraph className="mt-4 max-w-xl">
                I&apos;m a Polish front-end developer fueled by curiosity and a{" "}
                <Highlight>love for creating</Highlight> with code. Exploring
                new technologies and pushing boundaries.
            </Paragraph>
            <WorkHistory />
        </Container>
    );
}
