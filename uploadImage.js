// pages/api/images.js
import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";


const handler = async (req, res) => {
  await connectDB(); // Connect to MongoDB

  try {
    const images = await Product.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

export default handler;
