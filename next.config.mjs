/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "i.ytimg.com" },
      { hostname: "yt3.ggpht.com" },
      { hostname: "img.youtube.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "picsum.photos" },
      { hostname: "storage.googleapis.com" },
    ],
  },
};

export default nextConfig;
