import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  try {
    const products = await Product.find({
      $or: [
        { category: { $regex: query, $options: "i" } }, // Exact match in category field
        { description: { $regex: query, $options: "i" } }, // Partial match in description
      ],
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error searching products:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export function POST() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
