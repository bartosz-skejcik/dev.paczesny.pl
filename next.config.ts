import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    // ppr: true,
    // reactCompiler: true,
    viewTransition: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/a/09ir0bgwfb/**",
      },
      {
        protocol: "https",
        hostname: "scontent-waw2-2.xx.fbcdn.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
