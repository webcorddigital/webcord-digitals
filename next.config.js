/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["convex"],
  images: {
    domains: ["webcord-in.convex.cloud"],
  },
};

module.exports = nextConfig;
