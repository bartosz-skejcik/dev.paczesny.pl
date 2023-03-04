"use client";

import { slideInVariant, textVariant } from "@utils/motion";
import { motion } from "framer-motion";
import { useState } from "react";

import { toast } from "react-toastify";

type Props = {};

export default function Contact({}: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const sendEmail = async () => {
        if (!name || !email || !message) {
            toast.error("Please fill all the fields");
            return;
        }

        const res = await fetch("/api/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                message,
            }),
        });

        const data = await res.json();

        if (data.success) {
            toast.success("Email sent successfully");
            setName("");
            setEmail("");
            setMessage("");
        } else {
            toast.error("Something went wrong");
        }
    };

    return (
        <section
            id="contact"
            className="h-screen flex items-center justify-evenly overflow-hidden"
        >
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <motion.h1
                        variants={textVariant(0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        className="font-medium text-accent text-4xl md:text-5xl 2xl:text-6xl mb-2"
                    >
                        <span className="text-neutral-100">Contact </span>Me
                    </motion.h1>
                    <motion.p
                        variants={textVariant(0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        className="lg:w-1/2 mx-auto leading-relaxed text-base text-neutral-100"
                    >
                        If you wanna get in touch, talk to me about a project
                        collaboration or just say hi, fill up the awesome form
                        below or send an email to bartek@paczesny.pl
                    </motion.p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <motion.div
                            variants={slideInVariant("left", 0.2)}
                            initial="hidden"
                            whileInView={"show"}
                            exit="hidden"
                            className="p-2 w-1/2"
                        >
                            <label
                                htmlFor="name"
                                className="leading-7 text-sm text-gray-400"
                            >
                                Name
                            </label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                id="name"
                                name="name"
                                className="w-full bg-gray-800 bg-opacity-40 rounded-xl border border-gray-700 focus:border-accent/50 focus:bg-gray-900 focus:ring-2 focus:ring-accent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </motion.div>
                        <motion.div
                            variants={slideInVariant("right", 0.3)}
                            initial="hidden"
                            whileInView="show"
                            exit="hidden"
                            className="p-2 w-1/2"
                        >
                            <label
                                htmlFor="email"
                                className="leading-7 text-sm text-gray-400"
                            >
                                Email
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                name="email"
                                className="w-full bg-gray-800 bg-opacity-40 rounded-xl border border-gray-700 focus:border-accent/50 focus:bg-gray-900 focus:ring-2 focus:ring-accent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </motion.div>
                        <motion.div
                            variants={slideInVariant("bottom", 0.2)}
                            initial="hidden"
                            whileInView="show"
                            exit="hidden"
                            className="p-2 w-full"
                        >
                            <div className="relative">
                                <label
                                    htmlFor="message"
                                    className="leading-7 text-sm text-gray-400"
                                >
                                    Message
                                </label>
                                <textarea
                                    onChange={(e) => setMessage(e.target.value)}
                                    id="message"
                                    name="message"
                                    className="w-full bg-gray-800 bg-opacity-40 rounded-xl border border-gray-700 focus:border-accent/50 focus:bg-gray-900 focus:ring-2 focus:ring-accent h-32 text-base outline-none text-gray-100 py-1.5 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                ></textarea>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={slideInVariant("bottom", 0.2)}
                            initial="hidden"
                            whileInView="show"
                            exit="hidden"
                            className="p-2 w-full"
                        >
                            <button
                                onClick={() => {
                                    sendEmail();
                                }}
                                className="flex mx-auto text-accent bg-transparent border-2 border-accent hover:border-transparent hover:text-neutral-100 py-1 px-8 transition-all duration-300 hover:scale-105 hover:-translate-y-2 focus:outline-none hover:bg-accent rounded-2xl text-lg"
                            >
                                Send
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
