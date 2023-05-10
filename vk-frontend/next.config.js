/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'restless-frost-9292.fly.dev',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
}

module.exports = nextConfig