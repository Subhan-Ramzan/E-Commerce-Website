// app/api/profileimage/[id]/route.js
import connectDB from "@/utils/connectDB";
import User from "@/models/Signup";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB(); // Ensure DB connection

  const { id } = params;
  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return only the public_id from user's image object
    return NextResponse.json({ public_id: user.image.public_id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
