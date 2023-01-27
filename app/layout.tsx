import "../styles/globals.css";
import { Lexend } from "@next/font/google";

const lexend = Lexend({
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pl">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body
                style={{
                    backgroundImage: "url('/cover.svg')",
                    overflowX: "hidden",
                }}
                className={`${lexend.className} bg-no-repeat bg-center bg-cover`}
            >
                {children}
            </body>
        </html>
    );
}
