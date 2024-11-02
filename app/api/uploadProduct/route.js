import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    await connectDB();
    const { images, ...productData } = await req.json();

    const newProduct = new Product({
      ...productData,
      images: Array.isArray(images) ? images : [], // Ensure images is an array
    });

    const savedProduct = await newProduct.save();

    return new Response(JSON.stringify({
      message: 'Product uploaded successfully',
      product: savedProduct,
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error uploading product:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to upload product', 
      details: error.message 
    }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    if (productId) {
      const product = await Product.findById(productId); // Fetch single product by ID
      if (!product) {
        return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
      }
      return new Response(JSON.stringify(product), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      const products = await Product.find({}); // Fetch all products
      return new Response(JSON.stringify(products), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch products', 
      details: error.message 
    }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}
