import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/base/theme-switch";
import { KeyRound, LayoutDashboard } from "lucide-react";
import { readUserSession } from "@/lib/actions";

type Props = {};

export const Navbar = async ({}: Props) => {
    const { data } = await readUserSession();

    const user = data.session?.user;

    return (
        <NextUINavbar maxWidth="xl">
            <NavbarBrand as="li" className="gap-3 max-w-fit">
                <NextLink
                    className="flex justify-start items-center gap-1"
                    href="/"
                >
                    <p className="font-bold text-inherit">dev.paczesny</p>
                </NextLink>
            </NavbarBrand>
            <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
                <ul className="hidden md:flex gap-8 justify-start ml-2">
                    {siteConfig.navItems.map((item, index) => (
                        <NavbarItem key={item.href}>
                            <NextLink
                                className={clsx(
                                    linkStyles({ color: "foreground" }),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                                )}
                                color={
                                    index === 1
                                        ? "warning"
                                        : index ===
                                          siteConfig.navItems.length - 1
                                        ? "danger"
                                        : "foreground"
                                }
                                href={item.href}
                            >
                                {item.name}
                            </NextLink>
                        </NavbarItem>
                    ))}
                </ul>
            </NavbarContent>

            <NavbarContent
                className="hidden md:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="flex gap-2">
                    <ThemeSwitch />
                </NavbarItem>
                <NavbarItem className="flex items-center">
                    {user ? (
                        <Button
                            as={NextLink}
                            color="danger"
                            href={siteConfig.links.dashboard}
                            startContent={<LayoutDashboard />}
                            variant="flat"
                        >
                            Dashboard
                        </Button>
                    ) : (
                        <Button
                            as={NextLink}
                            color="danger"
                            href={siteConfig.links.login}
                            startContent={<KeyRound />}
                            variant="flat"
                        >
                            Sign up
                        </Button>
                    )}
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
                <ThemeSwitch />
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                as={NextLink}
                                color={
                                    index === 1
                                        ? "warning"
                                        : index ===
                                          siteConfig.navItems.length - 1
                                        ? "danger"
                                        : "foreground"
                                }
                                href={item.href}
                                size="lg"
                            >
                                {item.name}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};
