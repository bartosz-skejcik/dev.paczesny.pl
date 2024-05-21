const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = withPlausibleProxy()({
    images: {
        domains: ["cdn.sanity.io"],
    },
});

export default nextConfig;
