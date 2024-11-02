//app/api/logout/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const response = NextResponse.json({
      message: "Logged out successfully",
      success: true,
    });
    
    response.cookies.set("token", "", {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error(`Logout Error: ${error.message}`);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
