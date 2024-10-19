import { Container } from "@ui/Container";
import { Heading } from "@components/ui/Heading";
import { Highlight } from "@ui/Highlight";
import { Paragraph } from "@ui/Paragraph";
import { Projects } from "@components/Projects";
import { TechStack } from "@components/TechStack";
import GithubStats from "@components/GithubStats";
import { getProjects } from "@/sanity/lib/projects";
import { getSkillsByCategory } from "@/sanity/lib/skills";
import Cta from "@/components/Cta";

export default async function Home() {
    const projects = await getProjects();
    const categories = await getSkillsByCategory();

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
            <Paragraph className="mb-14 mt-4 max-w-xl">
                I&apos;m a junior software engineer with{" "}
                <Highlight>2 years of work experience</Highlight> folowed by{" "}
                <Highlight>4 years of experience</Highlight> in coding. I&apos;m
                a self-taught developer with a strong focus on{" "}
                <Highlight>visual design</Highlight> and{" "}
                <Highlight>accessibility</Highlight>.
            </Paragraph>
            <Cta />
            <GithubStats />
            <TechStack categories={categories} />
            <Heading
                as="h2"
                className="mb-4 mt-20 text-lg font-black md:text-lg lg:text-lg"
            >
                What I&apos;ve been working on
            </Heading>
            <Projects projects={projects} />
        </Container>
    );
}
