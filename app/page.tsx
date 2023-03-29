import Analytics from "analytics";
//@ts-ignore
import googleAnalytics from "@analytics/google-analytics";

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
    const analytics = Analytics({
        app: "portfolio",
        plugins: [
            googleAnalytics({
                measurementIds: [`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`],
            }),
        ],
    });
    analytics.page();
    return (
        <section
            style={{
                overflowX: "hidden",
            }}
            className="flex flex-col items-center justify-center backdrop-blur-3xl bg-[#001120]/10"
        >
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
