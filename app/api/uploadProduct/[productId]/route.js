import connectDB from '@/utils/connectDB';
import Product from '@/models/Product';

export async function GET(req, { params }) {
  const { productId } = params; // Use params to get the dynamic productId

  await connectDB(); // Ensure database is connected

  try {
    const product = await Product.findById(productId); // Fetch product by ID
    if (!product) {
      return new Response(JSON.stringify({ message: 'Product not found' }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error', error }), {
      status: 500,
    });
  }
}
