"use client";

/* eslint-disable jsx-a11y/alt-text */
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import {
    BotIcon,
    GraduationCap,
    LaptopIcon,
    SmartphoneIcon,
} from "lucide-react";

/* eslint-disable @next/next/no-img-element */
type Props = {};

const services = [
    {
        Icon: BotIcon,
        name: "Discord bots",
        description: "Order a personalized Discord bot for your server.",
        href: "/",
        cta: "Order now",
        background: <img className="absolute -right-20 -top-20 opacity-60" />,
        className: "lg:col-span-1 lg:row-span-2",
    },
    {
        Icon: LaptopIcon,
        name: "Web development",
        description: "Get a professional and modern website for your business.",
        href: "/",
        cta: "Order now",
        background: <img className="absolute -right-20 -top-20 opacity-60" />,
        className: "lg:col-span-2 lg:row-span-2",
    },
    {
        Icon: GraduationCap,
        name: "Code Tutoring",
        description:
            "Learn the basics of coding for languages like: Python/Javascript/HTML/C++",
        href: "/",
        cta: "Learn more",
        background: <img className="absolute -right-20 -top-20 opacity-60" />,
        className: "lg:col-span-2 lg:row-span-1",
    },
    {
        Icon: SmartphoneIcon,
        name: "Mobile app development",
        description: "Order a mobile app for your business or project idea.",
        href: "/",
        cta: "Learn more",
        background: <img className="absolute -right-20 -top-20 opacity-60" />,
        className: "lg:col-span-1 lg:row-span-1",
    },
];

function Page({}: Props) {
    return (
        <section className="min-h-screen h-full flex-1 w-full flex flex-col items-center justify-center container px-4 sm:px-0">
            <BentoGrid className="lg:grid-rows-3">
                {services.map((service) => (
                    <BentoCard key={service.name} {...service} />
                ))}
            </BentoGrid>
        </section>
    );
}

export default Page;
