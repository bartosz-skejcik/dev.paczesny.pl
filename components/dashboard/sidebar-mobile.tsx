"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { useState } from "react";

type Props = {};

function SidebarMobile({}: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <Navbar className="md:hidden bg-foreground-50">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="md:hidden"
                />
                <NavbarBrand>
                    {/* <AcmeLogo /> */}
                    <p className="font-bold text-inherit md:hidden">
                        dev.paczesny
                    </p>
                </NavbarBrand>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2
                                    ? "primary"
                                    : index === menuItems.length - 1
                                    ? "danger"
                                    : "foreground"
                            }
                            className="w-full"
                            href="#"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

export default SidebarMobile;
