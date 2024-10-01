const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
});

module.exports = withPWA({
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
  experimental: {
    runtime: "experimental-edge",
  },
});
