/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["products.adfly.com.pe"],
  },
};

module.exports = nextConfig;
