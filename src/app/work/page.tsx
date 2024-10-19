import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Highlight } from "@ui/Highlight";
import { Paragraph } from "@/components/ui/Paragraph";
import Work from "@/components/Work";
import { getWorkExperience } from "@/sanity/lib/work";

type Props = {};

async function Page({}: Props) {
    const work = await getWorkExperience();
    return (
        <Container>
            <span className="text-4xl">💼</span>
            <Heading className="font-black">Work Experience</Heading>
            <Paragraph className="mt-4 max-w-xl">
                I&apos;m a Polish front-end developer fueled by curiosity and a{" "}
                <Highlight>love for creating</Highlight> with code. Exploring
                new technologies and pushing boundaries.
            </Paragraph>
            <Work experience={work} />
        </Container>
    );
}

export default Page;
