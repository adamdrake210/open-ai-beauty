/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // experimental: {
  //   appDir: true,
  // },
  images: {
    domains: [
      "oaidalleapiprodscus.blob.core.windows.net",
      "openailabsprodscus.blob.core.windows.net",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;