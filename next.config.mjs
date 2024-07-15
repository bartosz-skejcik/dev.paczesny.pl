/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        // domains: [
        //   "images.unsplash.com",
        //   "res.cloudinary.com",
        //   "yt3.googleusercontent.com",
        //   "cdn.sanity.io",
        //   "seeklogo.com",
        //   "imgs.search.brave.com",
        //   "images.sftcdn.net",
        // ],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "seeklogo.com",
            },
            {
                protocol: "https",
                hostname: "**.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "**.res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "**.yt3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
            },
            {
                protocol: "https",
                hostname: "imgs.search.brave.com",
            },
            {
                protocol: "https",
                hostname: "images.sftcdn.net",
            },
        ],
    },
    experimental: {
        mdxRs: true,
    },
};

export default nextConfig;
