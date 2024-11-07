import mongoose, { Schema } from "mongoose";

const SignupSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please input a Username"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please input an Email"],
    },
    password: {
      type: String,
      required: [true, "Please input a Password"],
    },
    image: {
      public_id: { type: String, required: [true, "Please upload a public_id for the image"] },
      url: { type: String, required: [true, "Please upload an image URL"] },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    otp: String,
    otpExpiry: Date,
  },
  {
    timestamps: true,
  }
);

const Signup = mongoose.models.Signup || mongoose.model("Signup", SignupSchema);

export default Signup;
