/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
  async redirects() {
    return [
      {
        source: "/register",
        destination: "/join",
        permanent: true,
      },
    ];
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
      },
      {
        protocol: "https",
        hostname: `**.cdninstagram.com`,
      },
      {
        protocol: "https",
        hostname: `**.fbcdn.net`,
      },
      {
        protocol: "https",
        hostname: `tailwindui.com`,
      },
    ],
  },
};

module.exports = nextConfig;
