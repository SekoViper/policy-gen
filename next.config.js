/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  test: /\.hbs$/,
  use: 'raw-loader',
}

module.exports = nextConfig
