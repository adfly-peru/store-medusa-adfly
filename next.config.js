/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_API,
    NEXT_PUBLIC_BACKEND_GRAPHQL_URL:
      process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_URL,
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    NEXT_PUBLIC_MERCHANT_ID: process.env.NEXT_PUBLIC_MERCHANT_ID,
    NEXT_PUBLIC_CHECKOUT_URL: process.env.NEXT_PUBLIC_CHECKOUT_URL,
    NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    NEXT_PUBLIC_ALGOLIA_API_KEY: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
    NEXT_PUBLIC_ALGOLIA_INDEX_NAME: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
    NEXT_GOOGLE_CLIENT_ID: process.env.NEXT_GOOGLE_CLIENT_ID,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_FRESH_WIDGET_ID: process.env.NEXT_PUBLIC_FRESH_WIDGET_ID,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "banner.adfly.com.pe",
        port: "",
      },
      {
        protocol: "https",
        hostname: "logo.adfly.com.pe",
        port: "",
      },
      {
        protocol: "https",
        hostname: "categories.adfly.com.pe",
        port: "",
      },
      {
        protocol: "https",
        hostname: "collaborators-avatar.adfly.com.pe",
        port: "",
      },
      {
        protocol: "https",
        hostname: "department.adfly.com.pe",
        port: "",
      },
      {
        protocol: "https",
        hostname: "products.adfly.com.pe",
        port: "",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
