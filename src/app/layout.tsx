import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@components/Sidebar";
import { Footer } from "@components/Footer";
import { twMerge } from "tailwind-merge";
import { getUser } from "@/actions/user";
import { RootProviders } from "./providers";
import Script from "next/script";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Bartek Paczesny - Developer",
    description:
        "Bartek Paczesny is a Polish front-end developer fueled by curiosity and a love for creating with code. Exploring new technologies and pushing boundaries. He's a junior software engineer with 2 years of work experience folowed by 4 years of experience in coding. A self-taught developer with a strong focus on visual design and accessibility.",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data } = await getUser();
    return (
        <html lang="en">
            <body
                className={twMerge(
                    inter.className,
                    "flex h-screen overflow-hidden bg-neutral-950 antialiased",
                )}
            >
                <Script
                    src="/analytics.js"
                    defer
                    data-analytics-url={process.env.NEXT_PUBLIC_ANALYTICS_URL}
                />
                {/* <AnalyticsProvider> */}
                <Sidebar user={data.user} />
                <div className="flex-1 overflow-y-auto bg-neutral-950 lg:pl-2 lg:pt-2">
                    <div className="min-h-screen flex-1 overflow-y-auto border border-transparent bg-neutral-900 lg:rounded-tl-xl lg:border-neutral-800">
                        <RootProviders>{children}</RootProviders>
                        <Footer />
                    </div>
                </div>
                {/* </AnalyticsProvider> */}
            </body>
        </html>
    );
}
