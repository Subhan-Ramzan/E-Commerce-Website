// pages/api/search.js
import connectDB from "@/utils/connectDB";// Assume you have dbConnect to handle MongoDB connection
import Product from "@/models/Product";

export default async function handler(req, res) {
  await dbConnect();

  const { query } = req.query;

  if (req.method === "GET") {
    try {
      const products = await Product.find({
        $or: [
          { name: { $regex: query, $options: "i" } }, // Search by name (case-insensitive)
          { brand: { $regex: query, $options: "i" } }, // Search by brand (case-insensitive)
          { description: { $regex: query, $options: "i" } }, // Search by description
        ],
      });

      res.status(200).json(products); // Return the matching products
    } catch (error) {
      console.error("Error searching products:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
