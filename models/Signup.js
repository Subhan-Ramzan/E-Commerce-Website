// models/Signup.js
import mongoose from "mongoose";

const SignupSchema = new mongoose.Schema({
  category: { type: String, required: true },
  data: {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
});

const Signup = mongoose.models.Signup || mongoose.model("Signup", SignupSchema);

export default Signup;
