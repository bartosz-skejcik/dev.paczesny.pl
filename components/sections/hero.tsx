import GradientBackground from "@/components/gradient-background";
import Buttons from "./hero/buttons";
import Stats from "./hero/stats";
import WordRotate from "../magicui/word-rotate";

type Props = {};

async function Hero({}: Props) {
    return (
        <GradientBackground className="flex flex-col items-center lg:justify-center justify-start min-h-screen h-fit flex-1 pt-20 w-full gap-7">
            <h1 className="font-bold text-4xl lg:text-6xl text-center">
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
                <br />
                19-Year-Old
                <br />
                <WordRotate
                    words={[
                        "Self-Taught Developer",
                        "Student",
                        "Caffeine-Fueled Coder",
                    ]}
                    className="-my-2"
                />
            </h1>
            <p className="text-default-500 w-2/3 lg:w-1/2 text-lg text-center">
                Polish developer fueled by curiosity and a love for creating
                with code. Exploring new technologies and pushing boundaries.{" "}
            </p>
            <Buttons />
            <Stats />
        </GradientBackground>
    );
}

export default Hero;
