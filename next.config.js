/** @type {import('next').NextConfig} */
const nextConfig = {
    env : {
        REACT_APP_CLIENT_URL: 'http://localhost:3000/',
        REACT_APP_API_URL: 'http://localhost:5000/',
        SECRET: process.env.SECRET
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
