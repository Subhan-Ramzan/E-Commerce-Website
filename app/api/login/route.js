//app/api/login/route.js
import connectDB from "@/utils/connectDB";
import Signup from "@/models/Signup";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/nodemailer";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request) {
  try {
    const reqbody = await request.json();
    const { email, password } = reqbody;
    console.log(`Login Email:${email}`);

    const user = await Signup.findOne({email});
    if (!user) {
      return NextResponse.json(
        { error: `Error User Not found` },
        { status: 400 }
      );
    }
    console.log("User Exist");

    if (!user.isVerified) {
        return NextResponse.json(
          { error: "Please verify your email before logging in" },
          { status: 400 }
        );
      }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: `Check Your Password` },
        { status: 400 }
      );
    }

    const TokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(TokenData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);

    const response = NextResponse.json({
      message: "Logged in Successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error(`Login Error: ${error.message}`);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
