"use client";

import Link from "next/link";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { usePlausible } from "next-plausible";

type Props = {
    index: number;
    item: { name: string; href: string };
};

function NavbarItem({ index, item }: Props) {
    const plausible = usePlausible();
    return (
        <Link
            className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium"
            )}
            color={
                index === 1
                    ? "warning"
                    : index === siteConfig.navItems.length - 1
                    ? "danger"
                    : "foreground"
            }
            href={item.href}
            onClick={() => {
                plausible("navbar-item-click", {
                    props: {
                        position: "navbar",
                        name: item.name,
                    },
                });
            }}
        >
            {item.name}
        </Link>
    );
}

export default NavbarItem;
