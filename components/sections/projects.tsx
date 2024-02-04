import { Project } from "@/types/project";
import React from "react";
import { Parallax } from "../parallax";

type Props = {};

const projects = [
    {
        title: "EduFlex - Online Tutoring Appointment System",
        short_description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima eligendi voluptate sed incidunt.",
        full_description:
            "This project is a dynamic web application developed using Next.js. It's designed to streamline the process of scheduling tutoring appointments for students. The system allows students to select from a range of subjects, and then automatically assigns a teacher who specializes in the chosen subject. The application effectively demonstrates the use of modern React concepts such as hooks and functional components, and showcases efficient handling of asynchronous data and user interface design.",
        stack: [
            "Next.js",
            "TailwindCSS",
            "Framer Motion",
            "Prisma",
            "Auth.js",
            "MySQL",
        ],
        link: "https://edu-flex.live",
        github: "https://github.com/FanthStudios/eduflex",
        thumbnail:
            "https://cdn.sanity.io/images/06dqgoqc/production/e8e79153156a9af8ff252ea7ee56ac1fec9b1b2a-1920x949.png",
    },
    {
        title: "Liquido - Najwieksza siec e-papiersow",
        short_description:
            "Project made in Nuxt.js using TailwindCSS and Typescript. The website uses a CMS to display data such as a list of stores and their locations. Animations while scrolling using the FramerMotion library have also been added.",
        full_description:
            "Project made in Nuxt.js using TailwindCSS and Typescript. The website uses a CMS to display data such as a list of stores and their locations. Animations while scrolling using the FramerMotion library have also been added.",
        stack: ["Next.js", "TailwindCSS", "Framer Motion"],
        link: "https://liquido.fanth.pl",
        github: "#",
        thumbnail:
            "https://cdn.sanity.io/images/06dqgoqc/production/f9888470c5c898f793635f1cb12de1da1a144c5a-1920x948.png",
    },
    {
        title: "Agencytech.pl",
        short_description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, Prisma, Framer Motion and MySQL. It includes a dashboard panel for clients to manage their orders as well as admins for managing clients projects. The payments on the website are handled by Stripe. with a checkout form and custom webhooks",
        full_description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, Prisma, Framer Motion and MySQL. It includes a dashboard panel for clients to manage their orders as well as admins for managing clients projects. The payments on the website are handled by Stripe. with a checkout form and custom webhooks",
        stack: ["Next.js", "TailwindCSS", "Framer Motion", "Prisma", "MySQL"],
        link: "https://liquido.fanth.pl",
        github: "#",
        thumbnail:
            "https://cdn.sanity.io/images/06dqgoqc/production/a89ab77cb5e042ebfb7a180f538a9c95e4765e64-1920x859.png",
    },
    {
        title: "HouseElectronics.eu",
        short_description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, and Framer Motion. It includes a contact form with reCAPTCHA.",
        full_description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, and Framer Motion. It includes a contact form with reCAPTCHA.",
        stack: ["Next.js", "TailwindCSS", "Framer Motion"],
        link: "https://houseelectronics.eu",
        github: "https://github.com/bartosz-skejcik/paczesny.pl",
        thumbnail:
            "https://cdn.sanity.io/images/06dqgoqc/production/f095c0259fb7d45d9cbc4798d2e5d71f60cef88c-1920x862.png",
    },
    {
        title: "EduFlex - Online Tutoring Appointment System",
        short_description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima eligendi voluptate sed incidunt.",
        full_description:
            "This project is a dynamic web application developed using Next.js. It's designed to streamline the process of scheduling tutoring appointments for students. The system allows students to select from a range of subjects, and then automatically assigns a teacher who specializes in the chosen subject. The application effectively demonstrates the use of modern React concepts such as hooks and functional components, and showcases efficient handling of asynchronous data and user interface design.",
        stack: [
            "Next.js",
            "TailwindCSS",
            "Framer Motion",
            "Prisma",
            "Auth.js",
            "MySQL",
        ],
        link: "https://edu-flex.live",
        github: "https://github.com/FanthStudios/eduflex",
        thumbnail:
            "https://cdn.sanity.io/images/06dqgoqc/production/e8e79153156a9af8ff252ea7ee56ac1fec9b1b2a-1920x949.png",
    },
    {
        title: "Liquido - Najwieksza siec e-papiersow",
        short_description:
            "Project made in Nuxt.js using TailwindCSS and Typescript. The website uses a CMS to display data such as a list of stores and their locations. Animations while scrolling using the FramerMotion library have also been added.",
        full_description:
            "Project made in Nuxt.js using TailwindCSS and Typescript. The website uses a CMS to display data such as a list of stores and their locations. Animations while scrolling using the FramerMotion library have also been added.",
        stack: ["Next.js", "TailwindCSS", "Framer Motion"],
        link: "https://liquido.fanth.pl",
        github: "#",
        thumbnail:
            "https://cdn.sanity.io/images/06dqgoqc/production/f9888470c5c898f793635f1cb12de1da1a144c5a-1920x948.png",
    },
    {
        title: "Agencytech.pl",
        short_description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, Prisma, Framer Motion and MySQL. It includes a dashboard panel for clients to manage their orders as well as admins for managing clients projects. The payments on the website are handled by Stripe. with a checkout form and custom webhooks",
        full_description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, Prisma, Framer Motion and MySQL. It includes a dashboard panel for clients to manage their orders as well as admins for managing clients projects. The payments on the website are handled by Stripe. with a checkout form and custom webhooks",
        stack: ["Next.js", "TailwindCSS", "Framer Motion", "Prisma", "MySQL"],
        link: "https://liquido.fanth.pl",
        github: "#",
        thumbnail:
            "https://cdn.sanity.io/images/06dqgoqc/production/a89ab77cb5e042ebfb7a180f538a9c95e4765e64-1920x859.png",
    },
    {
        title: "HouseElectronics.eu",
        short_description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, and Framer Motion. It includes a contact form with reCAPTCHA.",
        full_description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, and Framer Motion. It includes a contact form with reCAPTCHA.",
        stack: ["Next.js", "TailwindCSS", "Framer Motion"],
        link: "https://houseelectronics.eu",
        github: "https://github.com/bartosz-skejcik/paczesny.pl",
        thumbnail:
            "https://cdn.sanity.io/images/06dqgoqc/production/f095c0259fb7d45d9cbc4798d2e5d71f60cef88c-1920x862.png",
    },
    {
        title: "EduFlex - Online Tutoring Appointment System",
        short_description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima eligendi voluptate sed incidunt.",
        full_description:
            "This project is a dynamic web application developed using Next.js. It's designed to streamline the process of scheduling tutoring appointments for students. The system allows students to select from a range of subjects, and then automatically assigns a teacher who specializes in the chosen subject. The application effectively demonstrates the use of modern React concepts such as hooks and functional components, and showcases efficient handling of asynchronous data and user interface design.",
        stack: [
            "Next.js",
            "TailwindCSS",
            "Framer Motion",
            "Prisma",
            "Auth.js",
            "MySQL",
        ],
        link: "https://edu-flex.live",
        github: "https://github.com/FanthStudios/eduflex",
        thumbnail:
            "https://cdn.sanity.io/images/06dqgoqc/production/e8e79153156a9af8ff252ea7ee56ac1fec9b1b2a-1920x949.png",
    },
    {
        title: "Liquido - Najwieksza siec e-papiersow",
        short_description:
            "Project made in Nuxt.js using TailwindCSS and Typescript. The website uses a CMS to display data such as a list of stores and their locations. Animations while scrolling using the FramerMotion library have also been added.",
        full_description:
            "Project made in Nuxt.js using TailwindCSS and Typescript. The website uses a CMS to display data such as a list of stores and their locations. Animations while scrolling using the FramerMotion library have also been added.",
        stack: ["Next.js", "TailwindCSS", "Framer Motion"],
        link: "https://liquido.fanth.pl",
        github: "#",
        thumbnail:
            "https://cdn.sanity.io/images/06dqgoqc/production/f9888470c5c898f793635f1cb12de1da1a144c5a-1920x948.png",
    },
    {
        title: "Agencytech.pl",
        short_description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, Prisma, Framer Motion and MySQL. It includes a dashboard panel for clients to manage their orders as well as admins for managing clients projects. The payments on the website are handled by Stripe. with a checkout form and custom webhooks",
        full_description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, Prisma, Framer Motion and MySQL. It includes a dashboard panel for clients to manage their orders as well as admins for managing clients projects. The payments on the website are handled by Stripe. with a checkout form and custom webhooks",
        stack: ["Next.js", "TailwindCSS", "Framer Motion", "Prisma", "MySQL"],
        link: "https://liquido.fanth.pl",
        github: "#",
        thumbnail:
            "https://cdn.sanity.io/images/06dqgoqc/production/a89ab77cb5e042ebfb7a180f538a9c95e4765e64-1920x859.png",
    },
    {
        title: "HouseElectronics.eu",
        short_description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, and Framer Motion. It includes a contact form with reCAPTCHA.",
        full_description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, and Framer Motion. It includes a contact form with reCAPTCHA.",
        stack: ["Next.js", "TailwindCSS", "Framer Motion"],
        link: "https://houseelectronics.eu",
        github: "https://github.com/bartosz-skejcik/paczesny.pl",
        thumbnail:
            "https://cdn.sanity.io/images/06dqgoqc/production/f095c0259fb7d45d9cbc4798d2e5d71f60cef88c-1920x862.png",
    },
    {
        title: "Agencytech.pl",
        short_description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, Prisma, Framer Motion and MySQL. It includes a dashboard panel for clients to manage their orders as well as admins for managing clients projects. The payments on the website are handled by Stripe. with a checkout form and custom webhooks",
        full_description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, Prisma, Framer Motion and MySQL. It includes a dashboard panel for clients to manage their orders as well as admins for managing clients projects. The payments on the website are handled by Stripe. with a checkout form and custom webhooks",
        stack: ["Next.js", "TailwindCSS", "Framer Motion", "Prisma", "MySQL"],
        link: "https://liquido.fanth.pl",
        github: "#",
        thumbnail:
            "https://cdn.sanity.io/images/06dqgoqc/production/a89ab77cb5e042ebfb7a180f538a9c95e4765e64-1920x859.png",
    },
    {
        title: "HouseElectronics.eu",
        short_description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, and Framer Motion. It includes a contact form with reCAPTCHA.",
        full_description:
            "A website for a company that provides IT services built with Next.js, TailwindCSS, and Framer Motion. It includes a contact form with reCAPTCHA.",
        stack: ["Next.js", "TailwindCSS", "Framer Motion"],
        link: "https://houseelectronics.eu",
        github: "https://github.com/bartosz-skejcik/paczesny.pl",
        thumbnail:
            "https://cdn.sanity.io/images/06dqgoqc/production/f095c0259fb7d45d9cbc4798d2e5d71f60cef88c-1920x862.png",
    },
] as Project[];

const header = {
    title: "Highlight of my best projects",
    text: "projects",
    description:
        "We build beautiful items with the latest technologies and frameworks. We are a team of passionate developers and designers that love to build amazing items",
};

function Projects({}: Props) {
    return (
        <section className="my-10">
            <Parallax items={projects} header={header} />
        </section>
    );
}

export default Projects;
