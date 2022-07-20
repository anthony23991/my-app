/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
