// app/api/verify-otp/route.js
import connectDB from "@/utils/connectDB";
import User from "@/models/Signup";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {
  try {
    const reqbody = await request.json();
    const { otp } = reqbody;

    // Find user by OTP and check if it’s still valid
    const user = await User.findOne({
      otp,
      otpExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User Not Exist or OTP Expired" },
        { status: 400 }
      );
    }

    // Mark the user as verified and clear both OTP and token fields
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Email Verified Successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
