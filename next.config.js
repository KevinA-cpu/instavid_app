/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["yt3.ggpht.com"],
  },
  transpilePackages: ["react-redux", "redux-persist"],
};

module.exports = nextConfig;
