import GradientBackground from "@/components/gradient-background";
import Buttons from "./hero/buttons";
import Stats from "./hero/stats";

type Props = {};

async function Hero({}: Props) {
    return (
        <GradientBackground className="flex flex-col items-center lg:justify-center justify-start min-h-screen h-fit flex-1 pt-20 w-full gap-7">
            <h1 className="font-bold text-4xl lg:text-6xl text-center">
                Hello, my name is <br />
                <span
                    className=""
                    style={{
                        color: "transparent",
                        background:
                            "linear-gradient(-90deg, #a855f7, #d946ef, #f59e0b, #f59e0b, #d946ef, #a855f7, #f59e0b)",
                        backgroundSize: "400% 100%",
                        backgroundClip: "text",
                        animation: "gradient 10s ease infinite",
                    }}
                >
                    Bartek Paczesny
                </span>
            </h1>
            <p className="text-default-500 w-2/3 lg:w-1/2 text-lg text-center">
                {"I'm "}a 19 years old self-taught developer from Poland.{" "}
                {"I'm "}
                currently studying IT at ZS14 in Warsaw and working with React,
                Next.js, TypeScript, TailwindCSS, and more.
            </p>
            <Buttons />
            <Stats />
        </GradientBackground>
    );
}

export default Hero;
