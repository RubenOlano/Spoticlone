/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co", "mosaic.scdn.co", "community.spotify.com"],
  },
};

module.exports = nextConfig;
