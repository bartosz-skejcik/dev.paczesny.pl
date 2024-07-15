import {
    IconBolt,
    IconBooks,
    IconBriefcase2,
    IconChartBar,
    IconServer,
} from "@tabler/icons-react";

export const adminLinks = [
    {
        href: "/analytics",
        label: "Analytics",
        icon: IconChartBar,
    },
    {
        label: "Website CMS",
        icon: IconServer,
        elements: [
            {
                href: "/cms/projects",
                label: "Projects",
                icon: IconBriefcase2,
            },
            {
                href: "/cms/skills",
                label: "Skills",
                icon: IconBolt,
            },
            {
                href: "/cms/education",
                label: "Education",
                icon: IconBooks,
            },
        ],
    },
];
