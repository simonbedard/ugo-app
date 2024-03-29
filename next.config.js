const path = require('path');


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /* The app directory enables support for layouts, Server Components, streaming, and colocated data fetching. */
  experimental: {
    appDir: true,
    serverActions: true,
  },
  
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  images: {
    domains: ['images.unsplash.com', 'images.pexels.com', 'pixabay.com', 'cdn.pixabay.com', 'live.staticflickr.com'],
    remotePatterns:[
      {
        protocol: 'https',
        hostname: '**.depositphotos.com',
      },
    ]

  },
}

module.exports = nextConfig
