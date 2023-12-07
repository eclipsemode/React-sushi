/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_CLIENT_URL: process.env.REACT_APP_CLIENT_URL,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    FRONTPAD_SECRET: process.env.FRONTPAD_SECRET,
    WEBHOOK_FRONTPAD_STATUS: process.env.WEBHOOK_FRONTPAD_STATUS,
    DADATA_TOKEN: process.env.DADATA_TOKEN,
    DADATA_SECRET: process.env.DADATA_SECRET
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
