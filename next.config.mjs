/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "127.0.0.1",
      "giving-poem-6ff11e31eb.media.strapiapp.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "via.placeholder.com",
      "avatars.githubusercontent.com",
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96],
    path: "/_next/image",
    loader: "default",
  },
};

export default nextConfig;
