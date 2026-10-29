/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.fbcdn.net' },
      { protocol: 'https', hostname: 'scontent-*.fna.fbcdn.net' },
      { protocol: 'https', hostname: 'www.facebook.com' },
      { protocol: 'https', hostname: 'graph.facebook.com' },
    ],
  },
};

module.exports = nextConfig;
