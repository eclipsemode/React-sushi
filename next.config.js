const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_CLIENT_URL: process.env.REACT_APP_CLIENT_URL,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    FRONTPAD_SECRET: process.env.FRONTPAD_SECRET,
    WEBHOOK_FRONTPAD_STATUS: process.env.WEBHOOK_FRONTPAD_STATUS,
    DADATA_TOKEN: process.env.DADATA_TOKEN,
    DADATA_SECRET: process.env.DADATA_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.DB_HOST,
        port: process.env.SERVER_PORT,
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
