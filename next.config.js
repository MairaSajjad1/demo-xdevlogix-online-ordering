/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "demo.onlineorder.crossdevlogix.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
