import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      await connectDB();

      const products = await Product.find({});

      res.status(200).json({ products });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
