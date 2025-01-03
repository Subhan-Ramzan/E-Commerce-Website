// app/api/products/route.js
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
    const category = searchParams.get("category"); // New query parameter for category filtering

    if (productId) {
      // Fetch single product by ID
      const product = await Product.findById(productId);
      if (!product) {
        return new Response(JSON.stringify({ error: "Product not found" }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify(product), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      let query = {};

      if (category) {
        // Case-insensitive regex for matching category exactly or finding it in the description
        query = {
          $or: [
            { category: { $regex: `^${category}$`, $options: "i" } }, // Exact match in category field
            { description: { $regex: category, $options: "i" } },      // Partial match in description
          ],
        };
      }

      // Fetch products based on the constructed query
      const products = await Product.find(query);
      return new Response(JSON.stringify(products), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch products",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
