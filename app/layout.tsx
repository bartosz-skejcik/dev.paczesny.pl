import "../styles/globals.css";

import { Lexend } from "@next/font/google";

import { Session } from "next-auth";
import { headers } from "next/headers";
import AuthContext from "./AuthContext";
import Script from "next/script";

const lexend = Lexend({
    subsets: ["latin"],
});

async function getSession(cookie: string): Promise<Session> {
    const response = await fetch(
        `${process.env.LOCAL_AUTH_URL}/api/auth/session`,
        {
            headers: {
                cookie,
            },
        }
    );

    const session = await response.json();

    return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession(headers().get("cookie") ?? "");
    return (
        <html lang="en">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body
                style={{
                    overflowX: "hidden",
                }}
                className={`${lexend.className} bg-no-repeat bg-center bg-cover bg-[url(/cover-mobile.svg)] md:bg-[url(/cover.svg)] w-screen`}
            >
                <Script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                />
                <Script id="gtag">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){
                        dataLayer.push(arguments);
                    }
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                        page_path: window.location.pathname,
                    });
                `}
                </Script>
                <AuthContext session={session}>{children}</AuthContext>
            </body>
        </html>
    );
}
