import Services from "@/components/sections/services";
import Education from "@/components/sections/education";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Cta from "@/components/sections/cta";

export default async function Home() {
    return (
        <section>
            <Hero />
            <Education />
            <Projects />
            <Services />
            <Cta />
        </section>
    );
}
