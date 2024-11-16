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
                Hey, I&apos;m a <Highlight>fullstack developer</Highlight> from
                Poland. I’m obsessed with figuring out how stuff works and
                making cool things with code
            </Paragraph>
            <Paragraph className="mb-14 mt-4 max-w-xl">
                I&apos;ve been coding for 5 years, including a{" "}
                <Highlight>2-month internship</Highlight> as a{" "}
                <Highlight>Junior Software Engineer</Highlight>. I taught myself
                everything, and I&apos;m all about clean design and making sure
                what I build works for everyone.
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
