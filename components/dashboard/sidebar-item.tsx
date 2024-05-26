"use client";

import { SidebarItem as SidebarItemType } from "@/types/config";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarItem({
    label,
    icon,
    href,
    variant = "default",
}: {
    label: string;
    icon: React.ReactNode;
    href: string;
    variant?: "slim" | "default";
}) {
    const path = usePathname();

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                variant == "slim" ? "pl-8" : ""
            }`}
        >
            <div
                className={`flex-shrink-0 ${
                    path == href ? "text-blue-500" : "text-foreground"
                } transition-all duration-200`}
            >
                {icon}
            </div>
            <span
                className={`transition-all duration-200 ${
                    path == href ? "text-blue-500" : "text-foreground"
                }`}
            >
                {label}
            </span>
            {/* <Chip className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
            </Chip> */}
        </Link>
    );
}

export function SidebarDropdown({
    label,
    icon,
    items,
}: {
    label: string;
    icon: React.ReactNode;
    items: SidebarItemType[];
}) {
    return (
        <Accordion isCompact>
            <AccordionItem
                isCompact
                key="1"
                aria-label={label}
                title={label}
                startContent={icon}
                classNames={{
                    title: "text-sm",
                    base: "ml-[0.22rem]",
                }}
            >
                {items.map((item, idx) => {
                    return (
                        <SidebarItem
                            key={idx}
                            label={item.label}
                            icon={item.icon}
                            href={item.href!}
                            variant="slim"
                        />
                    );
                })}
            </AccordionItem>
        </Accordion>
    );
}
