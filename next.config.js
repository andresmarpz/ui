/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ["iad.microlink.io"]
  }
}

module.exports = nextConfig
