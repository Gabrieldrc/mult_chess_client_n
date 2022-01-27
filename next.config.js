/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async redirects() {
    return [
      {
        source: '/chess/room',
        destination: '/chess',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
