import { Navbar } from "@components";
import {
    About,
    Hero,
    Skills,
    Education,
    Projects,
    Contact,
    Footer,
    Offline,
} from "@sections";

const getWebStatus = async () => {
    interface ResponseData {
        status: "online" | "offline";
    }
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/status`);
    const data: ResponseData = await res.json();
    return data.status;
};

const getAboutData = async () => {
    const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/sanity/get?collection=about`
    );
    const data = await res.json();
    if (data && data.length > 0) {
        return data[0];
    } else {
        return null;
    }
};

export default async function Home() {
    // const status = await getWebStatus();
    const aboutData = await getAboutData();

    return (
        <section
            style={{
                overflowX: "hidden",
            }}
            className="flex flex-col items-center justify-center backdrop-blur-3xl bg-[#001120]/10"
        >
            {/* {status === "online" ? ( */}
            {/* <> */}
            <Navbar />
            <Hero />
            <About data={aboutData as AboutResponse} />
            <Skills />
            <Education />
            <Projects />
            <Contact />
            <Footer />
            {/* </> */}
            {/* ) : ( */}
            {/* <Offline /> */}
            {/* )} */}
        </section>
    );
}
