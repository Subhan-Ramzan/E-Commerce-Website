import connectDB from "@/utils/connectDB";
import Voucher from "@/models/Voucher";

export async function POST(req) {
  console.log("POST endpoint hit");
  await connectDB();

  try {
    const data = await req.json();
    const voucher = await Voucher.create(data);
    return new Response(JSON.stringify(voucher), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

export async function GET() {
  console.log("GET endpoint hit");
  await connectDB();

  try {
    const vouchers = await Voucher.find();
    return new Response(JSON.stringify(vouchers), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

export async function DELETE(req) {
  await connectDB();

  try {
    const { id } = await req.json();
    const deletedVoucher = await Voucher.findByIdAndDelete(id);

    if (!deletedVoucher) {
      return new Response(JSON.stringify({ error: "Voucher not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, message: "Voucher deleted successfully" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

export async function PUT(req) {
  await connectDB();

  try {
    const { id, updateData } = await req.json(); 
    const updatedVoucher = await Voucher.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation runs on updates
    });

    if (!updatedVoucher) {
      return new Response(JSON.stringify({ error: "Voucher not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedVoucher), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
