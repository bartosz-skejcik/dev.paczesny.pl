"use client";
import React from "react";
import { Heading } from "./ui/Heading";
import Link from "next/link";
import Image from "next/image";
import { Paragraph } from "./ui/Paragraph";
import { motion } from "framer-motion";
import { Tables } from "@lib/database.types";

type FormData = Tables<"projects"> & {
    images?: Tables<"images">[];
    skills: { name: string }[];
};

export const Products = ({ products }: { products: FormData[] }) => {
    return (
        <div>
            <div className="grid grid-cols-1 gap-10">
                {products.map((product, idx: number) => (
                    <motion.div
                        key={product.id}
                        initial={{
                            opacity: 0,
                            x: -50,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{ duration: 0.2, delay: idx * 0.1 }}
                    >
                        <Link
                            href={
                                product.id
                                    ? `/projects/${product.id}`
                                    : product.id
                            }
                            key={product.id}
                            onClick={() => {
                                window.logEvent("view-project", {
                                    projectId: product.id,
                                });
                            }}
                            className="group flex flex-col items-center justify-start space-y-4 rounded-2xl p-4 transition duration-200 hover:bg-neutral-800 md:flex-row md:space-x-4 md:space-y-0"
                        >
                            <Image
                                src={product.thumbnail!}
                                alt="thumbnail"
                                height="200"
                                width="200"
                                className="rounded-md"
                            />
                            <div className="flex flex-col justify-between">
                                <div>
                                    <Heading
                                        as="h4"
                                        className="text-lg font-black md:text-lg lg:text-lg"
                                    >
                                        {product.title}
                                    </Heading>
                                    <Paragraph className="mt-1 max-w-xl text-sm md:text-sm lg:text-sm">
                                        {product.description}
                                    </Paragraph>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2 md:mb-1">
                                    {product.skills?.map(
                                        (stack: { name: string }) => (
                                            <span
                                                key={stack.name}
                                                className="rounded-sm bg-neutral-700 px-2 py-1 text-xs text-primary md:text-xs lg:text-xs"
                                            >
                                                {stack.name}
                                            </span>
                                        ),
                                    )}
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
