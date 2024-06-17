/** @type {import('next').NextConfig} */

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const hostname = baseUrl ? new URL(baseUrl).hostname : "127.0.0.1";

const nextConfig = {
  images: {
    domains: [hostname],
  },
};

export default nextConfig;
