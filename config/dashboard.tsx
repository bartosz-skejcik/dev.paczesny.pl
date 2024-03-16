import { DashboardConfig } from "@/types/config";
import {
    AreaChart,
    Banknote,
    Database,
    FolderKanban,
    GraduationCap,
    Hammer,
    LayoutDashboard,
    MessagesSquare,
    ShoppingBasket,
    Star,
} from "lucide-react";

export const dashboardConfig: DashboardConfig = {
    sidebar: {
        client: [
            {
                label: "Dashboard",
                href: "/dashboard",
                icon: <LayoutDashboard />,
            },
            {
                label: "Order History",
                href: "/dashboard/orders",
                icon: <ShoppingBasket />,
            },
            {
                label: "Billing",
                href: "/dashboard/billing",
                icon: <Banknote />,
            },
            {
                label: "Feedback & Review",
                href: "/dashboard/feedback",
                icon: <Star />,
            },
        ],
        admin: [
            {
                label: "Dashboard",
                href: "/dashboard",
                icon: <LayoutDashboard />,
            },
            {
                label: "Orders",
                href: "/dashboard/orders",
                icon: <ShoppingBasket />,
            },
            {
                label: "Messages",
                href: "/dashboard/messages",
                icon: <Banknote />,
            },
            {
                label: "Website CMS",
                icon: <MessagesSquare />,
                items: [
                    {
                        label: "Projects",
                        href: "/dashboard/cms/projects",
                        icon: <FolderKanban />,
                    },
                    {
                        label: "Education",
                        href: "/dashboard/cms/education",
                        icon: <GraduationCap />,
                    },
                    {
                        label: "Skills",
                        href: "/dashboard/cms/skills",
                        icon: <Hammer />,
                    },
                ],
            },
            {
                label: "Analytics",
                href: "/dashboard/analytics",
                icon: <AreaChart />,
            },
            {
                label: "Feedback & Review",
                href: "/dashboard/feedback",
                icon: <Star />,
            },
        ],
    },
};
