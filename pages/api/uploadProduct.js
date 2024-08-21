//pages/api/uploadProduct.js
import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";

export const config = {
  api: {
    bodyParser: true,
  },
};
const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      await connectDB();

      const { images, ...productData } = req.body;

      const newProduct = new Product({
        ...productData,
        images: Array.isArray(images) ? images : [], // Ensure images is an array
      });

      const savedProduct = await newProduct.save();

      res.status(201).json({
        message: 'Product uploaded successfully',
        product: savedProduct,
      });
    } catch (error) {
      console.error('Error uploading product:', error);
      res.status(500).json({ error: 'Failed to the upload product', details: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      await connectDB();
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

