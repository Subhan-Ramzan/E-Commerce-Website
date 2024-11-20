import connectDB from "@/utils/connectDB";
import Voucher from "@/models/Voucher";

export async function POST(req) {
  await connectDB();
  try {
    const { voucherCode } = await req.json();

    const voucher = await Voucher.findOne({ name: voucherCode });
    if (!voucher) {
      return new Response(JSON.stringify({ error: "Voucher not found" }), { status: 404 });
    }

    if (new Date(voucher.expirationDate) < new Date()) {
      return new Response(JSON.stringify({ error: "Voucher has expired" }), { status: 400 });
    }

    if (voucher.usageLimit <= 0) {
      return new Response(JSON.stringify({ error: "Voucher usage limit exceeded" }), { status: 400 });
    }

    voucher.usageLimit -= 1;
    await voucher.save();

    return new Response(JSON.stringify({ success: true, discountType: voucher.discountType, discountValue: voucher.discountValue }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
