import { Navbar } from "@components";
import {
    About,
    Hero,
    Skills,
    Education,
    Projects,
    Contact,
    Footer,
} from "@sections";

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center w-screen backdrop-blur-3xl bg-[#001120]/10">
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Education />
            <Projects />
            <Contact />
            <Footer />
        </section>
    );
}
