/** @type {import('next').NextConfig} */
const nextConfig = {
    env : {
        REACT_APP_CLIENT_URL: 'http://localhost:3000/',
        REACT_APP_API_URL: 'http://localhost:5000/',
        FRONTPAD_SECRET: process.env.FRONTPAD_SECRET,
        FRONTPAD_API_URL: process.env.FRONTPAD_API_URL,
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
