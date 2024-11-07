import connectDB from "@/utils/connectDB";
import User from "@/models/Signup";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/nodemailer";
import crypto from "crypto";

connectDB();

export async function POST(request) {
  try {
    console.log("Starting the signup process...");
    const reqbody = await request.json();
    const { username, email, password, profileImage } = reqbody;

    console.log("Received signup request body:", reqbody);

    // Check if the user already exists by email
    console.log("Checking if the user already exists with email:", email);
    const user = await User.findOne({ email });
    if (user) {
      console.log("User already exists with email:", email);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    console.log("No existing user found. Proceeding with user creation...");

    // Hash the password
    console.log("Hashing the password for the user:", username);
    const salt = await bcryptjs.genSalt(10);
    console.log("Generated salt for password hashing:", salt);
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log("Password hashed successfully:", hashedPassword);

    // Generate tokens for verification and OTP
    console.log("Generating verification token and OTP...");
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour expiration
    console.log("Generated verification token:", verifyToken);
    console.log(
      "Verification token expiry time:",
      new Date(verifyTokenExpiry).toLocaleString()
    );

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 60 * 60 * 1000; // 1 hour expiration
    console.log("Generated OTP:", otp);
    console.log("OTP expiry time:", new Date(otpExpiry).toLocaleString());

    // Create a new user instance
    console.log("Creating a new user instance...");
    const image = profileImage
      ? {
          public_id: profileImage,
          url: `https://res.cloudinary.com/doalqbhpd/image/upload/${profileImage}`,
        }
      : null;

    // Create and save the user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
      otp,
      otpExpiry,
      verifyToken,
      verifyTokenExpiry,
    });

    console.log("New user instance created:", newUser);

    // Save the user to the database
    console.log("Saving the new user to the database...");
    const savedUser = await newUser.save();
    console.log("User saved successfully:", savedUser);

    // Send verification email
    console.log("Sending verification email to:", email);
    await sendEmail({
      email,
      emailType: "verify",
      userId: savedUser._id,
      token: verifyToken,
    });
    console.log("Verification email sent successfully!");

    // Return success response
    console.log("Signup successful! Returning response...");
    return NextResponse.json(
      { message: "User created successfully", user: savedUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in user signup:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
