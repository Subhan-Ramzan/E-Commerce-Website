//pages/api/getProduct.js
import connectDB from '@/utils/connectDB';
import Product from '@/models/Product';

export default async function handler(req, res) {
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
    res.status(405).json({ message: 'Method not allowed' });
  }
}
