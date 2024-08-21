// utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import multerStorageCloudinary from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup Multer Storage with Cloudinary
const storage = multerStorageCloudinary({
  cloudinary: cloudinary,
  folder: 'nextjs-images', // Optional folder name
  allowedFormats: ['jpg', 'jpeg', 'png'],
});

const upload = multer({ storage: storage });

export { cloudinary, upload };

