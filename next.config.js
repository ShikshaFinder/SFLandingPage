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
  i18n: {
    locales: ["en", "fr", "es"], // Add the languages you support
    defaultLocale: "en", // Set a default language
  },
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
  env: {
    AZURE_OPENAI_ENDPOINT: process.env.AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_API_KEY: process.env.AZURE_OPENAI_API_KEY,
  },
  experimental: {},
});
