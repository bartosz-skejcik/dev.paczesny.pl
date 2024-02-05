/* eslint-disable @next/next/no-img-element */
import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

function Cta({}: Props) {
    return (
        <section className="w-full flex flex-col items-center justify-center py-24 xl:py-44 relative my-12 xl:my-24">
            <div className="absolute inset-0 overflow-hidden w-full blur-2xl">
                <svg
                    viewBox="0 0 1024 1024"
                    className="absolute -left-[19%] md:left-1/2 md:bottom-1/3 -z-10 h-[32rem] w-[32rem] md:h-[48rem] md:w-[48rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                    aria-hidden="true"
                >
                    <circle
                        cx="512"
                        cy="512"
                        r="512"
                        fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                        fill-opacity="0.7"
                    />
                    <defs>
                        <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                            <stop stop-color="#e879f9" />
                            <stop offset="1" stop-color="#c026d3" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>
            <h6 className="uppercase text-pink-500 font-medium text-base mb-3">
                order services
            </h6>
            <h1 className="text-4xl text-center md:text-5xl font-semibold mb-5">
                Want to order a website?
            </h1>
            <p className="text-default-500 text-sm md:text-base max-w-2xl text-center mb-10">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Facilis ipsa dolor perferendis deleniti totam aut voluptatibus,
                amet recusandae ea fugiat iure vero nam natus aliquid iste
                impedit repellendus, esse commodi.
            </p>
            <div className="flex items-center relative z-50 justify-center gap-6">
                <Link href={siteConfig.links.order.buy}>
                    <Button
                        size="lg"
                        color="secondary"
                        variant="shadow"
                        endContent={<ShoppingBag />}
                    >
                        Order now
                    </Button>
                </Link>
                <Link href={siteConfig.links.order.default}>
                    <Button
                        size="lg"
                        variant="light"
                        endContent={<ArrowRight />}
                    >
                        Learn more
                    </Button>
                </Link>
            </div>
        </section>
    );
}

export default Cta;
