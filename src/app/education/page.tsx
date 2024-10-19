import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Highlight } from "@ui/Highlight";
import { Paragraph } from "@/components/ui/Paragraph";
import { Education } from "@/components/Education";

type Props = {};

function Page({}: Props) {
    return (
        <Container>
            <span className="text-4xl">🎓</span>
            <Heading className="font-black">Education</Heading>
            <Paragraph className="mt-4 max-w-xl">
                I&apos;m a Polish front-end developer fueled by curiosity and a{" "}
                <Highlight>love for creating</Highlight> with code. Exploring
                new technologies and pushing boundaries.
            </Paragraph>
            <Education />
        </Container>
    );
}

export default Page;
