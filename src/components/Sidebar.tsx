"use client";

import { navlinks } from "@/constants/navlinks";
import { AdminLink, Navlink } from "@/types/navlink";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Heading } from "./ui/Heading";
import { socials } from "@/constants/socials";
import { AnimatePresence, motion } from "framer-motion";
import { IconLayoutSidebarRightCollapse } from "@tabler/icons-react";

const isMobile = () => {
    if (typeof window === "undefined") return false;
    const width = window.innerWidth;
    return width <= 1024;
};

export const Sidebar = () => {
    const [open, setOpen] = useState(isMobile() ? false : true);

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.2, ease: "linear" }}
                        exit={{ x: "-100%" }}
                        className="fixed left-0 z-[100] flex h-screen max-w-[14rem] flex-col justify-between bg-neutral-950 px-6 py-10 lg:relative lg:w-fit"
                    >
                        <div>
                            <SidebarHeader />
                            <Navigation setOpen={setOpen} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                className="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 backdrop-blur-sm lg:hidden"
                onClick={() => setOpen(!open)}
            >
                <IconLayoutSidebarRightCollapse className="h-6 w-6 text-secondary" />
            </button>
        </>
    );
};

export const Navigation = ({
    setOpen,
}: {
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    return (
        <div className="relative z-[100] my-10 flex flex-col space-y-1">
            {navlinks.map((link: Navlink) => (
                <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                        isMobile() && setOpen(false);
                        window.logEvent("nav_link_click", {
                            link: link.label,
                        });
                    }}
                    className={twMerge(
                        "flex items-center space-x-2 rounded-md px-2 py-2 text-sm text-secondary transition duration-200 hover:text-primary",
                        isActive(link.href!) &&
                            "bg-neutral-900 text-primary shadow-lg",
                    )}
                >
                    <link.icon
                        className={twMerge(
                            "h-4 w-4 flex-shrink-0",
                            isActive(link.href!) && "text-sky-500",
                        )}
                    />
                    <span>{link.label}</span>
                </Link>
            ))}

            <Heading
                as="p"
                className="px-2 pt-10 text-sm md:text-sm lg:text-sm"
            >
                Socials
            </Heading>
            {socials.map((link: Navlink) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={twMerge(
                        "flex items-center space-x-2 rounded-md px-2 py-2 text-sm text-secondary transition duration-200 hover:text-primary",
                    )}
                >
                    <link.icon
                        className={twMerge(
                            "h-4 w-4 flex-shrink-0",
                            isActive(link.href) && "text-sky-500",
                        )}
                    />
                    <span>{link.label}</span>
                </Link>
            ))}
        </div>
    );
};

const SidebarHeader = () => {
    return (
        <div className="flex space-x-2">
            <Image
                src="https://yt3.googleusercontent.com/W0Ek01osdSGlE6v_aHrtP0ONJIk3bGMqX6z-gSOh9bc0PBzmAGaPFofZSSEtr0T6dC079sMGkQ=s160-c-k-c0x00ffffff-no-rj"
                alt="Avatar"
                height="40"
                width="40"
                className="flex-shrink-0 rounded-full object-cover object-top"
            />
            <div className="flex flex-col text-sm">
                <p className="font-bold text-primary">Bartek Paczesny</p>
                <p className="font-light text-secondary">Developer</p>
            </div>
        </div>
    );
};
