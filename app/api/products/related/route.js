import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const name = searchParams.get("name");
    const skip = parseInt(searchParams.get("skip") || "0");
    const limit = parseInt(searchParams.get("limit") || "1");

    if (!category || !name) {
      return new Response(JSON.stringify({ error: "Category and name are required." }), {
        status: 400,
      });
    }

    await connectDB();

    const relatedProducts = await Product.find({
      $or: [
        { category: { $regex: category, $options: "i" } },
        { name: { $regex: name, $options: "i" } },
      ],
    })
      .skip(skip)
      .limit(limit)
      .lean();

    // Deduplicate by `_id` (optional, but ensures no duplicates even in backend)
    const uniqueProducts = Array.from(
      new Map(relatedProducts.map((p) => [p._id.toString(), p])).values()
    );

    return new Response(JSON.stringify(uniqueProducts), { status: 200 });
  } catch (error) {
    console.error("Error fetching related products:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching related products" }),
      { status: 500 }
    );
  }
}
