const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "wsrv.nl",
      "blobimageshikshafinder.blob.core.windows.net",
      "unsplash.com",
      "images.unsplash.com",
      "source.unsplash",
    ],
  },
};

module.exports = withPWA(nextConfig);
