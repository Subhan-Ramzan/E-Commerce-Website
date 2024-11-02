import { cloudinary } from "@/utils/cloudinary";
import { NextResponse } from "next/server";

// Set the runtime environment
export const runtime = 'nodejs'; // Use Node.js runtime

// Helper function to parse multipart form data and return buffer
async function parseMultipartFormData(req) {
  const contentType = req.headers.get('content-type');
  if (!contentType || !contentType.includes('multipart/form-data')) {
    throw new Error('Invalid content-type, expected multipart/form-data');
  }

  const formData = await req.formData();
  const file = formData.get('image');
  
  if (!file || !(file instanceof File)) {
    throw new Error('No file uploaded');
  }

  const buffer = await file.arrayBuffer();
  return Buffer.from(buffer);
}

// Define the POST request handler
export async function POST(req) {
  try {
    const fileBuffer = await parseMultipartFormData(req);

    // Upload to Cloudinary with extended timeout
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'nextjs-images', timeout: 120000 },  // 120 seconds timeout
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          resolve(result);
        }
      );
      stream.end(fileBuffer);  // End stream after sending file buffer
    });

    // Success response with uploaded image URL
    return NextResponse.json({
      message: 'Image uploaded successfully',
      url: result.secure_url,
      public_id: result.public_id,
    }, { status: 201 });

  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
