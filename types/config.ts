export interface DashboardConfig {
    sidebar: {
        client: SidebarItem[];
        admin: SidebarItem[];
    };
}

export interface SidebarItem {
    label: string;
    href?: string;
    icon: React.ReactNode;
    items?: SidebarItem[];
}
