"use client";
import React from "react";
import { Heading } from "./ui/Heading";
import Link from "next/link";
import Image from "next/image";
import { Paragraph } from "./ui/Paragraph";
import { motion } from "framer-motion";

export const Products = ({ products }: { products: any[] }) => {
    return (
        <div>
            <div className="grid grid-cols-1  gap-10">
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
                            className="group flex flex-col md:flex-row items-center justify-start space-y-4 md:space-y-0 md:space-x-4 hover:bg-neutral-800 rounded-2xl transition duration-200 p-4"
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
                                        className="font-black text-lg md:text-lg lg:text-lg "
                                    >
                                        {product.title}
                                    </Heading>
                                    <Paragraph className="text-sm md:text-sm lg:text-sm mt-1 max-w-xl">
                                        {product.short_description}
                                    </Paragraph>
                                </div>
                                <div className="flex md:mb-1 mt-2 flex-wrap gap-2">
                                    {product.skills?.map(
                                        (stack: { name: string }) => (
                                            <span
                                                key={stack.name}
                                                className="text-xs  md:text-xs lg:text-xs bg-neutral-700 px-2 py-1 rounded-sm text-primary"
                                            >
                                                {stack.name}
                                            </span>
                                        )
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
