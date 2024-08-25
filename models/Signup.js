// models/Signup.js
import mongoose from "mongoose";

const SignupSchema = new mongoose.Schema({
  category: { type: String, required: true },
  data: {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {
      url: { type: String, required: true }, // Only store a single image
      public_id: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  },
});

const Signup = mongoose.models.Signup || mongoose.model("Signup", SignupSchema);

export default Signup;
