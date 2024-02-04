import Education from "@/components/sections/education";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";

export default async function Home() {
    return (
        <section>
            <Hero />
            <Education />
            <Projects />
        </section>
    );
}
