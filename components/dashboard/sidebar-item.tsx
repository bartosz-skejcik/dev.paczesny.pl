"use client";

import { SidebarItem } from "@/types/config";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Link from "next/link";

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
    console.log(label, variant);
    return (
        <Link
            className={`px-2 block w-full ${variant == "slim" ? "pl-8" : ""}`}
            href={href}
        >
            <div
                className={`flex ${
                    variant == "default" ? "py-2" : ""
                } w-full h-full gap-3 items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 py-2 transition-opacity`}
            >
                <div className="flex-shrink-0">{icon}</div>
                <div className="flex-1 flex flex-col text-start">
                    <span className="text-foreground text-medium">{label}</span>
                </div>
            </div>
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
    items: SidebarItem[];
}) {
    return (
        <Accordion isCompact selectionMode="multiple">
            <AccordionItem
                isCompact
                key="1"
                aria-label={label}
                title={label}
                startContent={icon}
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
