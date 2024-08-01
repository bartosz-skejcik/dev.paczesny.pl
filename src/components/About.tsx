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
                    I am an ambitious and aspiring Frontend Developer with a
                    background in computer science from technical school,
                    possessing knowledge and skills in both frontend and backend
                    development. I have designed web applications using
                    Express.js and created scripts in Python.
                </Paragraph>
                <Paragraph className="mt-4">
                    My experience includes designing and building websites with
                    React.js, TailwindCSS, and Framer Motion. I have achieved
                    success in school projects. I have analytical skills and am
                    familiar with web technologies, libraries, and frameworks
                    such as React and Next.
                </Paragraph>

                <Paragraph className="mt-4">
                    As an intern, I aim to gain practical industry experience
                    and develop my skills in a professional environment. I want
                    to work with a team to learn from experienced developers who
                    can help me acquire new skills and achieve my career goals
                    in the future.
                </Paragraph>
            </div>
        </div>
    );
}
