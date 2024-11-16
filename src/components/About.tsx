"use client";
import { Paragraph } from "@ui/Paragraph";
import Image from "next/image";

import { motion } from "framer-motion";

export default function About() {
    const images = [
        "/images/about/f1.jpeg",
        "/images/about/mscds.jpeg",
        "/images/about/coding.jpeg",
        "/images/about/coding1.jpeg",
    ];
    return (
        <div>
            <div className="my-10 grid grid-cols-2 gap-10 md:grid-cols-4">
                {images.map((image, index) => (
                    <motion.div
                        key={image}
                        initial={{
                            opacity: 0,
                            y: -50,
                            rotate: 0,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            rotate: index % 2 === 0 ? 3 : -3,
                        }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                    >
                        <Image
                            src={image}
                            width={200}
                            height={400}
                            alt="about"
                            className="block h-40 w-full rotate-3 transform rounded-md object-cover shadow-xl transition duration-200 hover:rotate-0 md:h-60"
                        />
                    </motion.div>
                ))}
            </div>

            <div className="max-w-4xl">
                <Paragraph className="mt-4">
                    I’m Bartek, a fullstack developer and first-year Computer
                    Science student at Vistula University in Poland. With 5
                    years of coding experience and a hands-on approach, I’ve
                    built projects ranging from AI-powered SaaS tools to Content
                    Creator Tools for organizing and planning videos/streams
                    with AI. I’ve also had the chance to sharpen my skills
                    during internships, contributing to dynamic user interfaces
                    and improving application performance.
                </Paragraph>
                <Paragraph className="mt-4">
                    Outside of coding, I’m a goalkeeper for my local football
                    team, where we’ve placed in the top 3 in 4 out of 6
                    tournaments. When I’m not on the pitch, I’m following
                    Formula One and geeking out over race strategies and team
                    dynamics.
                </Paragraph>

                <Paragraph className="mt-4">
                    I’m always experimenting with new ideas in my side projects,
                    whether it’s integrating AI into apps or creating tools that
                    simplify workflows. These projects are my way of exploring
                    what’s next in tech and turning ambitious ideas into
                    reality.
                </Paragraph>
            </div>
        </div>
    );
}
