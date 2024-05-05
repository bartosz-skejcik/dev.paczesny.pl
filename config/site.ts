export const siteConfig = {
    navItems: [
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "About me", href: "/about" },
        { name: "Order", href: "/order" },
    ],
    hero: {
        github: "https://github.com/bartosz-skejcik",
        projects: "/projects",
        contact: "mailto:bartek@paczesny.pl",
    },
    links: {
        login: "/auth",
        dashboard: "/dashboard",
        order: {
            default: "/order",
            buy: "/order#buy",
        },
    },
};
