"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Heading } from "@ui/Heading";
import { Paragraph } from "@ui/Paragraph";
import { motion } from "framer-motion";
import { Tables } from "@lib/database.types";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

interface Product extends Tables<"projects"> {
    skills?: Tables<"skills">[];
}

export const SingleProduct = ({ product }: { product: Product }) => {
    const [activeImage, setActiveImage] = useState<string>(product.thumbnail!);
    return (
        <div className="py-10">
            <Link
                href={"/projects"}
                className="flex w-fit items-center rounded-full focus:outline-none transition ring-neutral-100 bg-transparent hover:bg-neutral-200 shadow-lg hover:shadow-white/20 sm:backdrop-blur-sm ring-1 focus-visible:ring-offset-2 ring-neutral-950/60 text-sm font-medium p-2 mt-auto text-neutral-200 hover:text-neutral-950"
            >
                <IconArrowLeft className="w-4 h-4" />
            </Link>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
                key={activeImage}
                className="relative mt-6 sm:mt-8"
            >
                <Image
                    src={activeImage}
                    alt="thumbnail"
                    height="1000"
                    width="1000"
                    className="rounded-md object-contain"
                />
                <div className="absolute bottom-0 h-40 w-full bg-gradient-to-b from-transparent to-neutral-900" />
            </motion.div>
            {/* <div className="flex flex-row justify-center my-8 flex-wrap">
                {product.images.map((image, idx) => (
                    <button
                        onClick={() => setActiveImage(image)}
                        key={`image-thumbnail-${idx}`}
                    >
                        <Image
                            src={image}
                            alt="product thumbnail"
                            height="1000"
                            width="1000"
                            className="h-14 w-16 md:h-40 md:w-60 object-cover object-top mr-4 mb-r border rounded-lg border-neutral-800"
                        />
                    </button>
                ))}
            </div> */}
            <div className="flex lg:flex-row justify-between items-center flex-col mt-20">
                <Heading className="font-black mb-2 pb-1">
                    {" "}
                    {product.title}
                </Heading>
            </div>
            <div className="flex space-x-2 md:mb-1 mt-2 md:mt-0">
                {product.skills?.map((stack: { name: string }) => (
                    <span
                        key={stack.name}
                        className="text-xs  md:text-xs lg:text-xs bg-neutral-800 px-2 py-1 rounded-sm text-secondary whitespace-nowrap"
                    >
                        {stack.name}
                    </span>
                ))}
            </div>
            <div className="mb-5">
                <Paragraph className="max-w-xl mt-4">
                    {product.full_description}
                </Paragraph>
            </div>
            {/* <div className="prose prose-sm md:prose-base max-w-none text-neutral-500">
                {product?.content}
            </div> */}

            <Link
                href={product.link || "#"}
                target="__blank"
                className="inline-flex items-center gap-1 group/button rounded-full hover:scale-105 focus:outline-none transition ring-offset-neutral-100 bg-neutral-200 text-black shadow-lg shadow-white/20 sm:backdrop-blur-sm group-hover/button:bg-neutral-950/15 group-hover/button:scale-105 focus-visible:ring-1 focus-visible:ring-offset-2 ring-neutral-950/60 text-sm font-medium px-4 py-2 mt-auto origin-left"
            >
                Live Preview
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                >
                    <path d="M5 12l14 0"></path>
                    <path d="M13 18l6 -6"></path>
                    <path d="M13 6l6 6"></path>
                </svg>
            </Link>
        </div>
    );
};
