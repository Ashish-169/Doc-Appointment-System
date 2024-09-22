/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ["ts", "tsx"],
  env: {
    SERVER_URL: process.env.SERVER_URL,
  }, // Change file extensions to TypeScript
  async redirects() {
    return [
      {
        source: "/",
        destination: "/create-event",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;