import connectDB from "@/utils/connectDB"; // Ensure your DB connection utility is set up
import Product from "@/models/Product";  // Assuming Product is a Mongoose model

// API route to fetch a product by its ID
export default async function handler(req, res) {
  const { productId } = req.query; // Get the product ID from the query parameters

  await connectDB(); // Connect to the database

  try {
    // Find the product by ID in the database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the product details
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Server error" });
  }
}
