// app/api/products/related/route.js

import connectDB from "@/utils/connectDB"; // MongoDB connection utility
import Product from "@/models/Product";  // Product model

export async function GET(req) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const name = searchParams.get('name');
    const skip = parseInt(searchParams.get('skip') || '0'); // Default to 0 if not provided
    const limit = parseInt(searchParams.get('limit') || '1'); // Default to 6 if not provided

    if (!category || !name) {
      return new Response(JSON.stringify({ error: "Category and name are required." }), {
        status: 400,
      });
    }

    await connectDB(); // Connect to MongoDB

    // Find related products that match either category or name
    const relatedProducts = await Product.find({
      $or: [
        { category: { $regex: category, $options: "i" } }, // Case-insensitive match for category
        { name: { $regex: name, $options: "i" } } // Case-insensitive match for name
      ]
    })
    .skip(skip) // Skip the already loaded products
    .limit(limit); // Limit the results

    return new Response(JSON.stringify(relatedProducts), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error fetching related products" }), {
      status: 500,
    });
  }
}
