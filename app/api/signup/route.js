//app/api/signup/route.js
import connectDB from "@/utils/connectDB";
import User from "@/models/Signup";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/nodemailer";
import crypto from "crypto";

connectDB();
export async function POST(request) {
  try {
    const reqbody = await request.json();
    const { username, email, password, profileImage } = reqbody;
    console.log(reqbody);

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyTokenExpiry = Date.now() + 60 * 60 * 1000;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 60 * 60 * 1000;

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image: {
        url: profileImage.url, // Store the single image URL
        public_id: profileImage.public_id,
      },
      otp,
      otpExpiry,
      verifyToken,
      verifyTokenExpiry,
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send verification email
    await sendEmail({
      email,
      emailType: "verify",
      userId: savedUser._id,
      token: verifyToken,
    });

    // Return a success response
    return NextResponse.json(
      { message: "User created successfully", user: savedUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
