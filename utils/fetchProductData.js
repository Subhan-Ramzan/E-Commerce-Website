import connectDB from "./connectDB";

import { ObjectId } from "mongodb"; // Import ObjectId

export async function getProductCategory(productId) {
  try {
    const { db } = await connectDB();

    // Convert productId to ObjectId
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });

    return product?.category || null;
  } catch (error) {
    console.error("Error fetching product category:", error);
    return null;
  }
}
