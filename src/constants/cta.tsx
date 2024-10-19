import { CtaLink } from "@/types/cta";
import { BriefcaseIcon, SquareGanttChartIcon } from "lucide-react";

export const CtaLinks: CtaLink[] = [
    {
        label: "Projects",
        href: "/projects",
        id: "cta_projects",
        icon: <SquareGanttChartIcon className="size-4" />,
    },
    {
        label: "Work Experience",
        href: "/work",
        id: "cta_work_experience",
        icon: <BriefcaseIcon className="size-4" />,
    },
];
