/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ["i.postimg.cc", "postimg.cc"],
  },
  reactStrictMode: true,
  // other options...
};

module.exports = nextConfig;
