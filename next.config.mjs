/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
    // You can add additional image configuration options here
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Example sizes
    imageSizes: [16, 32, 48, 64, 96], // Example image sizes
    path: '/_next/image', // Default path for Next.js image optimization
    loader: 'default', // Loader type, can be adjusted if using custom loaders
  },
  // Add other Next.js configurations if needed
};

export default nextConfig;
