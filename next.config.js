/** @type {import('next').NextConfig} */
const { domains } = require('next/constants');

const nextConfig = {
    images: {
        domains: ['cdn.sanity.io', 'res.cloudinary.com', 'uploadthing.com', 'lh3.googleusercontent.com', 'tailwindui.com', 'images.pexels.com'],
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig