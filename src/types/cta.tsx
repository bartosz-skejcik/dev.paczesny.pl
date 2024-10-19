import { ReactNode } from "react";

export interface CtaLink {
    href: string;
    label: string;
    id: `cta_${string}`;
    icon: ReactNode;
}
