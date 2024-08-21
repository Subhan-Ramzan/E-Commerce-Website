// pages/api/login.js
import Signup from "@/models/Signup";
import connectDB from "@/utils/connectDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Fetch user data from the Signup collection
      const signup = await Signup.findOne({ 'data.email': email });

      if (!signup) {
        return res.status(400).json({ error: "User not found" });
      }

      const user = signup.data; // Access user data within the Signup document
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: signup._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
