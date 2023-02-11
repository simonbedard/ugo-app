const path = require('path');


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /* The app directory enables support for layouts, Server Components, streaming, and colocated data fetching. */
  experimental: {
    appDir: true,
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  images: {
    domains: ['images.unsplash.com', 'images.pexels.com', 'pixabay.com', 'st4.depositphotos.com', 'st.depositphotos.com', 'st3.depositphotos.com', 'st2.depositphotos.com', 'st5.depositphotos.com'],
  },
}

module.exports = nextConfig
