// pages/api/signup.js
import connectDB from "@/utils/connectDB";
import Seller from "@/models/Seller";
import Signup from "@/models/Signup";
import bcrypt from "bcryptjs";

connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, email, password, type, profileImage } = req.body;

    try {
      if (type === 'seller') {
        let seller = await Seller.findOne({ email });
        if (seller) {
          return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        seller = new Seller({
          username,
          email,
          password: hashedPassword,
        });

        await seller.save();
        res.status(201).json({ message: "Seller created successfully" });

      } else if (type === 'user') {
        let signup = await Signup.findOne({ 'data.email': email });
        if (signup) {
          return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        signup = new Signup({
          category: 'signup',
          data: {
            username,
            email,
            password: hashedPassword,
            image: {
              url: profileImage.url, // Store the single image URL
              public_id: profileImage.public_id,
            },
          },
        });

        await signup.save();
        res.status(201).json({ message: "User created successfully" });

      } else {
        res.status(400).json({ error: "Invalid type" });
      }
    } catch (error) {
      console.error("Error saving user or seller:", error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
