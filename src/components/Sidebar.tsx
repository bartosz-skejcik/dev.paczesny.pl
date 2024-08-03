"use client";

import { navlinks } from "@/constants/navlinks";
import { AdminLink, Navlink } from "@/types/navlink";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Heading } from "./ui/Heading";
import { socials } from "@/constants/socials";
import { Badge } from "./ui/Badge";
import { AnimatePresence, motion } from "framer-motion";
import {
    IconChevronDown,
    IconLayoutSidebarRightCollapse,
    IconLogout,
} from "@tabler/icons-react";
import { getUserProfile } from "@lib/supabase/client";
import { adminLinks } from "@/constants/admin-links";

const isMobile = () => {
    if (typeof window === "undefined") return false;
    const width = window.innerWidth;
    return width <= 1024;
};

export const Sidebar = ({ user }: { user: any }) => {
    const [open, setOpen] = useState(isMobile() ? false : true);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        if (user) {
            getUserProfile(user.email).then((profile) => {
                setProfile(profile);
            });
        }
    }, [user]);

    const handleLogout = async () => {
        const response = await fetch("/auth/logout", {
            method: "POST",
        });

        if (response.ok) {
            // Redirect to the login page or home page after logout
            window.location.reload();
        } else {
            console.error("Failed to logout");
        }
    };

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
                            <Navigation setOpen={setOpen} profile={profile} />
                        </div>
                        <div className="flex w-full flex-col gap-4">
                            <Badge href="/resume" text="Read Resume" />
                            {profile && (
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center justify-center gap-2 rounded-full bg-transparent py-2 font-medium text-primary ring-1 ring-primary transition-all duration-200 hover:bg-primary hover:text-black"
                                >
                                    <IconLogout className="h-4 w-4" />
                                    <span className="text-sm">Logout</span>
                                </button>
                            )}
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
    profile,
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    profile: any;
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

            {profile && profile.user_roles.role === "admin" && (
                <>
                    <Heading
                        as="p"
                        className="px-2 pt-10 text-sm md:text-sm lg:text-sm"
                    >
                        Admin
                    </Heading>
                    {adminLinks.map((link: AdminLink, index) =>
                        link.elements && link.elements.length > 0 ? (
                            <Dropdown
                                key={index}
                                link={link}
                                isActive={isActive}
                                items={link.elements}
                            />
                        ) : (
                            <NavLink
                                key={index}
                                link={link}
                                isActive={isActive}
                            />
                        ),
                    )}
                </>
            )}

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

const Dropdown = ({
    items,
    link,
    isActive,
}: {
    items: Navlink[];
    link: AdminLink;
    isActive: (href: string) => boolean;
}) => {
    const [open, setOpen] = useState(false);

    const variants = {
        open: {
            opacity: 1,
            height: "auto",
            transition: { duration: 0.2 },
        },
        closed: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.2 },
        },
    };

    return (
        <div className="flex flex-col space-y-1">
            <button
                className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-secondary transition duration-200 hover:text-primary"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center space-x-2">
                    <link.icon
                        className={twMerge(
                            "h-4 w-4 flex-shrink-0",
                            isActive(link.href!) && "text-sky-500",
                        )}
                    />
                    <span>{link.label}</span>
                </div>
                <div
                    className={twMerge(
                        open ? "rotate-180" : "",
                        "transition-all duration-200",
                    )}
                >
                    <IconChevronDown className="h-4 w-4" />
                </div>
            </button>
            <motion.ul
                initial="closed"
                animate={open ? "open" : "closed"}
                variants={variants}
                className="space-y-1 overflow-hidden pl-2 sm:pl-4"
            >
                {items.map((element: Navlink, idx) => (
                    <NavLink key={idx} link={element} isActive={isActive} />
                ))}
            </motion.ul>
        </div>
    );
};

const NavLink = ({
    link,
    isActive,
}: {
    link: AdminLink | Navlink;
    isActive: (href: string) => boolean;
}) => {
    return (
        <Link
            href={link.href ?? "#"}
            className={twMerge(
                "flex items-center space-x-2 rounded-md px-2 py-2 text-sm text-secondary transition duration-200 hover:text-primary",
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
