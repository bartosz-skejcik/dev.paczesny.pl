import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@components/Sidebar";
import { Footer } from "@components/Footer";
import { twMerge } from "tailwind-merge";
import { getUser } from "@/actions/user";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Bartek Paczesny - Developer",
    description:
        "Bartek Paczesny is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
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
                <Sidebar user={data.user} />
                <div className="flex-1 overflow-y-auto bg-neutral-950 lg:pl-2 lg:pt-2">
                    <div className="min-h-screen flex-1 overflow-y-auto border border-transparent bg-neutral-900 lg:rounded-tl-xl lg:border-neutral-800">
                        {children}
                        <Footer />
                    </div>
                </div>
            </body>
        </html>
    );
}
