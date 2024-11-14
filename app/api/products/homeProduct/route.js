import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const skip = parseInt(searchParams.get("skip") || "0");
    const limit = parseInt(searchParams.get("limit") || "4");

    await connectDB();

    const allProducts = await Product.find({})
      .skip(skip)
      .limit(limit)
      .lean();

    // Deduplicate by `_id` (optional, but ensures no duplicates even in backend)
    const uniqueProducts = Array.from(
      new Map(allProducts.map((p) => [p._id.toString(), p])).values()
    );

    return new Response(JSON.stringify(uniqueProducts), { status: 200 });
  } catch (error) {
    console.error("Error fetching all products:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching all products" }),
      { status: 500 }
    );
  }
}
