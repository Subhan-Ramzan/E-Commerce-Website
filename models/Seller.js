// models/Seller.js
import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Seller = mongoose.models.Seller || mongoose.model("Seller", SellerSchema);

export default Seller;
