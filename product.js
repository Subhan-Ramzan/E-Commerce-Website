//pages/api/product.js
import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      await connectDB();
      const { category } = req.query; // Get category from query string

      let filter = {};
      if (category) {
        filter.category = category; // If category exists, filter by category
      }

      const products = await Product.find(filter); // Find products with optional filter
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products", details: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
