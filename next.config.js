/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: ["firebasestorage.googleapis.com", "picsum.photos"],
  },
};

module.exports = nextConfig;
