import mongoose, { Schema } from "mongoose";

const SignupSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please input a Username"],
      trim: true,
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [50, "Username can't exceed 50 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please input an Email"],
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please input a Password"],
      minLength: [6, "Password must be at least 6 characters long"],
    },
    image: {
      public_id: {
        type: String,
        required: [true, "Please upload a public_id for the image"],
      },
      url: {
        type: String,
        required: [true, "Please upload an image URL"],
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
      default: null,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
      default: null,
    },
    verifyToken: {
      type: String,
      default: null,
    },
    verifyTokenExpiry: {
      type: Date,
      default: null,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexing to improve query performance
SignupSchema.index({ username: 1, email: 1 });

const Signup = mongoose.models.Signup || mongoose.model("Signup", SignupSchema);

export default Signup;
