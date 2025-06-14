// next.config.js
const nextPWA = require("next-pwa");

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  fallbacks: { // Corregido de fallback a fallbacks
    document: "offline.html", // Asegúrate de que este archivo exista en tu carpeta public. Path made relative.
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // Para generar un sitio estático
  basePath: '/ER-Simulator', // El nombre de tu repositorio (CASE-SENSITIVE)
  images: {
    unoptimized: true, // Necesario para next export con next/image
  },
};

module.exports = withPWA(nextConfig);
// This configuration enables PWA support in a Next.js application.
// It uses the `next-pwa` package to handle service workers and caching.
// The PWA features are enabled only in production mode, ensuring that the development environment remains unaffected.
// The `reactStrictMode` and `swcMinify` options are also set for better performance and debugging.
// The `dest` option specifies the directory where the service worker and other PWA assets will be stored.
// The `register` and `skipWaiting` options ensure that the service worker is registered and activated immediately.
// The configuration is exported as a module, allowing Next.js to use it when building and serving the application.
// This setup is useful for creating a Progressive Web App (PWA) with Next.js, enhancing the user experience by enabling offline capabilities and faster load times.
// This code is a configuration file for a Next.js application that integrates PWA (Progressive Web App) support using the `next-pwa` package.
// It sets up the application to use service workers for caching and offline functionality.
