import mongoose from 'mongoose';

const VoucherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  usageLimit: { type: Number, required: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  discountValue: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.Voucher || mongoose.model('Voucher', VoucherSchema);
