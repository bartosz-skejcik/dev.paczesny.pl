"use client";

import { slideInVariant, textVariant } from "@utils/motion";
import { motion } from "framer-motion";
import { event } from "nextjs-google-analytics";
import { createRef, useState } from "react";

import ReCAPTCHA from "react-google-recaptcha";

import { toast } from "react-toastify";

type Props = {};

export default function Contact({}: Props) {
    const recaptchaRef = createRef<ReCAPTCHA>();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const sendEmail = async () => {
        if (!name || !email || !message) {
            toast.error("Please fill all the fields");
            return;
        }

        const isCaptchaVerified = recaptchaRef.current?.getValue();
        if (!isCaptchaVerified) {
            toast.error("Please verify that you are not a robot");
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
            event("email_sent", {
                category: "Contact",
                label: message,
            });
            toast.success("Email sent successfully");
            setName("");
            setEmail("");
            setMessage("");
        } else {
            toast.error("Something went wrong");
        }
    };

    const onReCAPTCHAChange = (captchaCode: string | null) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
            return;
        }
    };

    return (
        <section
            id="contact"
            className="flex items-center h-screen overflow-hidden justify-evenly"
        >
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col w-full mb-12 text-center">
                    <motion.h1
                        variants={textVariant(0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        className="mb-2 text-4xl font-medium text-accent md:text-5xl 2xl:text-6xl"
                    >
                        <span className="text-neutral-100">Contact </span>Me
                    </motion.h1>
                    <motion.p
                        variants={textVariant(0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        className="mx-auto text-base leading-relaxed lg:w-1/2 text-neutral-100"
                    >
                        If you wanna get in touch, talk to me about a project
                        collaboration or just say hi, fill up the awesome form
                        below or send an email to bartek@paczesny.pl
                    </motion.p>
                </div>
                <div className="mx-auto lg:w-1/2 md:w-2/3">
                    <div className="flex flex-wrap -m-2">
                        <motion.div
                            variants={slideInVariant("left", 0.2)}
                            initial="hidden"
                            whileInView={"show"}
                            exit="hidden"
                            className="w-1/2 p-2"
                        >
                            <label
                                htmlFor="name"
                                className="text-sm leading-7 text-gray-400"
                            >
                                Name
                            </label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-3 py-1 text-base leading-8 text-gray-100 transition-colors duration-200 ease-in-out bg-gray-800 border border-gray-700 outline-none bg-opacity-40 rounded-xl focus:border-accent/50 focus:bg-gray-900 focus:ring-2 focus:ring-accent"
                            />
                        </motion.div>
                        <motion.div
                            variants={slideInVariant("right", 0.3)}
                            initial="hidden"
                            whileInView="show"
                            exit="hidden"
                            className="w-1/2 p-2"
                        >
                            <label
                                htmlFor="email"
                                className="text-sm leading-7 text-gray-400"
                            >
                                Email
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-1 text-base leading-8 text-gray-100 transition-colors duration-200 ease-in-out bg-gray-800 border border-gray-700 outline-none bg-opacity-40 rounded-xl focus:border-accent/50 focus:bg-gray-900 focus:ring-2 focus:ring-accent"
                            />
                        </motion.div>
                        <motion.div
                            variants={slideInVariant("bottom", 0.2)}
                            initial="hidden"
                            whileInView="show"
                            exit="hidden"
                            className="w-full p-2"
                        >
                            <div className="relative">
                                <label
                                    htmlFor="message"
                                    className="text-sm leading-7 text-gray-400"
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
                            className="flex flex-col items-center justify-center w-full gap-4 p-2"
                        >
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                size="normal"
                                sitekey={
                                    process.env
                                        .NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
                                }
                                onChange={onReCAPTCHAChange}
                            />
                            <button
                                onClick={() => {
                                    sendEmail();
                                }}
                                className="flex px-8 py-1 mx-auto text-lg transition-all duration-300 bg-transparent border-2 text-accent border-accent hover:border-transparent hover:text-neutral-100 hover:scale-105 hover:-translate-y-2 focus:outline-none hover:bg-accent rounded-2xl"
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
