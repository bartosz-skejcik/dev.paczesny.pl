import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@components/Sidebar";
import { Footer } from "@components/Footer";
import { twMerge } from "tailwind-merge";
import { RootProviders } from "./providers";
import Script from "next/script";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Bartek Paczesny - Developer",
    description:
        "A fullstack developer from Poland, obsessed with figuring out how stuff works and making cool things with code. Has been coding for 5 years, including a 2-month internship as a Junior Software Engineer. Self-taught in everything, focused on clean design and making sure builds work for everyone.",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
                <Sidebar />
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
