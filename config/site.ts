export const siteConfig = {
    navItems: [
        { name: "Services", href: "/services" },
        { name: "Experience", href: "#experience" },
        { name: "Resume", href: "/resume" },
        { name: "Work", href: "#projects" },
        { name: "Contact", href: "/contact" },
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
