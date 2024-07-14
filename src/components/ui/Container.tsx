import React from "react";
import { twMerge } from "tailwind-merge";

export const Container = ({
    children,
    maxWidth,
}: {
    children: React.ReactNode;
    maxWidth?: string;
}) => {
    return (
        <main
            className={twMerge(
                "w-full mx-auto py-20 px-4 md:px-10",
                maxWidth ?? "max-w-4xl"
            )}
        >
            {children}
        </main>
    );
};
