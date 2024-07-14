/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "res.cloudinary.com",
      "yt3.googleusercontent.com",
      "cdn.sanity.io",
      "seeklogo.com",
      "imgs.search.brave.com",
      "images.sftcdn.net",
    ],
  },
  experimental: {
    mdxRs: true,
  },
};

export default nextConfig;
