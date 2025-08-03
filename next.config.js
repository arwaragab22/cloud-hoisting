process.env.HOME = "D:/next-folder";
process.env.USERPROFILE = "D:/next-folder";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.watchOptions = {
      ignored: [
        "**/node_modules/**",
        "**/.next/**",
        "**/C:/Users/**",
        "**/Users/**",
      ],
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
