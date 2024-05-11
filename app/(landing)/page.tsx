// import Services from "@/components/sections/services";
// import Cta from "@/components/sections/cta";
import Education from "@/components/sections/education";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";

export default async function Home() {
    return (
        <section>
            <Hero />
            <Education />
            <Projects />
            <Skills />
            {/* <Services /> */}
            {/* <Cta /> */}
        </section>
    );
}
