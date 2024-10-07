/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "i.ytimg.com" },
      { hostname: "yt3.ggpht.com" },
      { hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;
