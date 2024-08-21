//pages/api/upload.js
import { cloudinary } from "@/utils/cloudinary";
import connectDB from "@/utils/connectDB";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle form data
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      await connectDB();

      const form = formidable({ multiples: false });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Error parsing form:', err);
          return res.status(500).json({ error: 'Failed to parse form' });
        }

        const image = files.image[0];
        if (!image) {
          return res.status(400).json({ error: 'No image uploaded' });
        }

        try {
          const result = await cloudinary.uploader.upload(image.filepath);
          const imageUrl = result.secure_url;

          res.status(201).json({
            message: 'Image uploaded successfully',
            url: imageUrl,
            public_id: result.public_id,
          });
        } catch (uploadError) {
          console.error('Error uploading image to Cloudinary:', uploadError);
          res.status(500).json({ error: 'Failed to upload image' });
        }
      });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Failed to process request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
