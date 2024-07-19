import { Container } from "@ui/Container";
import { Heading } from "@components/ui/Heading";
import { Highlight } from "@ui/Highlight";
import { Paragraph } from "@ui/Paragraph";
import { Products } from "@components/Products";
import { TechStack } from "@components/TechStack";
import { getProjects, getSkills } from "@lib/supabase/server";
import GithubStats from "@components/GithubStats";

export default async function Home() {
    const projects = await getProjects();
    const skills = await getSkills();

    return (
        <Container maxWidth="max-w-5xl">
            <span className="text-4xl">👋</span>
            <Heading className="font-black">
                Hello there! I&apos;m Bartek
            </Heading>
            <Paragraph className="mt-4 max-w-xl">
                I&apos;m a Polish front-end developer fueled by curiosity and a{" "}
                <Highlight>love for creating</Highlight> with code. Exploring
                new technologies and pushing boundaries.
            </Paragraph>
            <Paragraph className="mt-4 max-w-xl">
                I&apos;m a junior software engineer with{" "}
                <Highlight>2 years of work experience</Highlight> folowed by{" "}
                <Highlight>4 years of experience</Highlight> in coding. I&apos;m
                a self-taught developer with a strong focus on{" "}
                <Highlight>visual design</Highlight> and{" "}
                <Highlight>accessibility</Highlight>.
            </Paragraph>
            <GithubStats />
            <TechStack stack={skills} />
            <Heading
                as="h2"
                className="mb-4 mt-20 text-lg font-black md:text-lg lg:text-lg"
            >
                What I&apos;ve been working on
            </Heading>
            <Products products={projects} />
        </Container>
    );
}
