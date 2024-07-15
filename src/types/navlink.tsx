import { TablerIconsProps } from "@tabler/icons-react";

type BaseLink = {
    label: string;
    icon?: React.ReactNode | TablerIconsProps | any;
};

export interface Navlink extends BaseLink {
    href: string;
}

export interface AdminLink extends BaseLink {
    href?: string;
    elements?: Navlink[];
}
