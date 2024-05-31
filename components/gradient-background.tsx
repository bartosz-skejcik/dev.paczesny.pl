"use client";

import { useIsSSR } from "@react-aria/ssr";
import { useTheme } from "next-themes";
import React from "react";

type Props = {
    className?: string;
    children: React.ReactNode;
};

function GradientBackground({ className, children }: Props) {
    const isSSR = useIsSSR();

    const { theme } = useTheme();

    return (
        <main
            style={{
                backgroundColor: "transparent",
                backgroundImage:
                    "linear-gradient(to right, rgba(150, 150, 150, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(150, 150, 150, 0.3) 1px, transparent 1px)",
                backgroundSize: "10vh 10vh",
                height: "100vh",
            }}
            className="min-h-screen flex items-center justify-center flex-col"
        >
            <div
                className={className}
                style={{
                    background:
                        theme == "light" || isSSR
                            ? "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.99) 75%)"
                            : "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.99) 75%)",
                }}
            >
                {children}
            </div>
        </main>
    );
}

export default GradientBackground;
