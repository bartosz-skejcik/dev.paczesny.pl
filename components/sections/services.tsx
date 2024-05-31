"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import LampContainer from "@/components/lamp";
import { motion } from "framer-motion";
import { GradientCard } from "@/components/gradient-card";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
    {
        title: "Website Development",
        description:
            "Crafting visually appealing and user-friendly websites is my forte. From personal portfolios to business websites, I leverage cutting-edge technologies to ensure your online presence stands out.",
        image: "/web.jpeg",
    },
    {
        title: "E-commerce Solutions",
        description:
            "Turn your products into an online sensation. I specialize in creating robust and secure online shops that provide a seamless shopping experience for your customers.",
        image: "/e-commerce.jpeg",
    },
    {
        title: "Discord Bot Development",
        description:
            "Enhance your Discord server with custom bots tailored to your community's needs. From moderation tools to interactive features, I can bring your server to life.",
        image: "/discord.jpeg",
    },
    {
        title: "Server Configuration",
        description:
            "Optimize and secure your server environment. Whether it's setting up servers from scratch or fine-tuning existing configurations, I ensure optimal performance and reliability.",
        image: "/server.jpeg",
    },
];

type Props = {};

function Services({}: Props) {
    return (
        <>
            <LampContainer>
                <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.2,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="mt-8 bg-gradient-to-b from-pink-300 dark:to-neutral-300 dark:via-neutral-300 via-neutral-500 to-neutral-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                >
                    Elevate Your Digital Presence
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="text-default-500 text-base md:text-lg max-w-4xl text-center mb-10 relative z-10"
                >
                    As a forward-thinking developer, I specialize in delivering
                    cutting-edge websites, seamless e-commerce solutions,
                    dynamic Discord bots, and optimized server configurations.
                    Let{"'"}s collaborate to turn your digital aspirations into
                    reality!
                </motion.p>
            </LampContainer>
            <div className="w-5/6 lg:w-2/3 xl:w-[60%] mx-auto gap-12 min-h-[50vh] grid grid-cols-1 grid-rows-4 items-center md:grid-cols-2 md:grid-rows-2">
                {services.map((service, index) => (
                    <GradientCard
                        key={index}
                        containerClassName="w-full h-full"
                        className="rounded-[15px] p-4 bg-neutral-200 dark:bg-black w-full h-full flex items-start justify-start flex-col"
                    >
                        <Image
                            src={"/images" + service.image}
                            alt="jordans"
                            height="1080"
                            width="1920"
                            className="object-cover object-top group-hover:object-center opacity-50 group-hover:opacity-100 rounded-3xl group-hover:rounded-xl transition-all duration-300 self-center h-44 w-full aspect-[16/9]"
                        />
                        <h3 className="text-xl font-medium mb-2 mt-6">
                            {service.title}
                        </h3>
                        <p className="text-default-500 text-base">
                            {service.description}
                        </p>
                        <Button
                            size="sm"
                            className="mt-2"
                            color="warning"
                            variant="light"
                            as={Link}
                            href="/order"
                            endContent={<ArrowRight size={14} />}
                        >
                            Learn More
                        </Button>
                    </GradientCard>
                ))}
            </div>
        </>
    );
}

export default Services;
