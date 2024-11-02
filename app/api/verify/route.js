// app/api/verify/route.js
import connectDB from "@/utils/connectDB";
import User from "@/models/Signup";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {
  try {
    const reqbody = await request.json();
    const { token } = reqbody;

    // Find user by token and check if it’s still valid
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User Not Exist or Token Expired" },
        { status: 400 }
      );
    }

    // Mark the user as verified and clear both token and OTP fields
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Email Verified Successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
