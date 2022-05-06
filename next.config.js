/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.scdn.co",
      "mosaic.scdn.co",
      "community.spotify.com",
      "i.pinimg.com",
    ],
  },
};

module.exports = nextConfig;
