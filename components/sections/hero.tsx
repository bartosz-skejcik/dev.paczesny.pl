import GradientBackground from "@/components/gradient-background";
import { createSupabaseServerClientReadOnly } from "@/lib/supabase/server";
import { Button } from "@nextui-org/button";
import { Github, LogOut, Mailbox, Rocket } from "lucide-react";

type Props = {};

async function Hero({}: Props) {
    // TEMPORARY

    const handleSignout = async (e: FormData) => {
        "use server";

        console.log("signing out");

        const supabase = await createSupabaseServerClientReadOnly();

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error(error);
        }
    };

    return (
        <GradientBackground className="flex flex-col items-center justify-center min-h-screen w-full gap-7">
            <h1 className="font-bold text-6xl text-center">
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
            <p className="text-default-500 w-2/3 lg:w-1/3 text-center">
                {"I'm "}a 19 years old self-taught developer from Poland.{" "}
                {"I'm "}
                currently studying IT at ZS14 in Warsaw and working with React,
                Next.js, TypeScript, TailwindCSS, and more.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                    size="lg"
                    variant="bordered"
                    color="secondary"
                    startContent={<Github />}
                >
                    Github
                </Button>
                <Button
                    size="lg"
                    className="m-2"
                    variant="shadow"
                    color="warning"
                    startContent={<Rocket />}
                >
                    My projects
                </Button>
                <Button
                    size="lg"
                    variant="bordered"
                    color="danger"
                    startContent={<Mailbox />}
                >
                    Contact me
                </Button>
            </div>
        </GradientBackground>
    );
}

export default Hero;
