import localFont from "next/font/local";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

// Font files can be colocated inside of `app`
const CalSans = localFont({
    src: [{ path: "../../../fonts/CalSans-SemiBold.woff2" }],
    display: "swap",
});

export const Heading = ({
    className,
    children,
    as: Tag = "h1",
    clipBg = true,
}: {
    className?: string;
    children: ReactNode;
    as?: keyof JSX.IntrinsicElements;
    clipBg?: boolean;
}) => {
    return (
        <Tag
            className={twMerge(
                CalSans.className,
                `text-base font-semibold md:text-xl lg:text-4xl ${clipBg ? "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" : "text-primary"}`,
                className,
            )}
        >
            {children?.toString()}
        </Tag>
    );
};
