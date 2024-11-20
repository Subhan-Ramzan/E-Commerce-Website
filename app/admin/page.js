"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [vouchers, setVouchers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    expirationDate: "",
    usageLimit: "",
    discountType: "percentage",
    discountValue: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editVoucherId, setEditVoucherId] = useState(null);

  useEffect(() => {
    axios
      .get("/api/vouchers")
      .then((response) => {
        setVouchers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vouchers:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      // Update existing voucher
      try {
        const response = await axios.put("/api/vouchers", {
          id: editVoucherId,
          updateData: form,
        });
        setVouchers(
          vouchers.map((voucher) =>
            voucher._id === editVoucherId ? response.data : voucher
          )
        );
        setEditMode(false);
        setEditVoucherId(null);
      } catch (error) {
        console.error("Error updating voucher:", error);
      }
    } else {
      // Create new voucher
      try {
        const response = await axios.post("/api/vouchers", form);
        setVouchers([...vouchers, response.data]);
      } catch (error) {
        console.error("Error creating voucher:", error);
      }
    }
    setForm({
      name: "",
      expirationDate: "",
      usageLimit: "",
      discountType: "percentage",
      discountValue: "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/vouchers", { data: { id } });
      setVouchers(vouchers.filter((voucher) => voucher._id !== id));
    } catch (error) {
      console.error("Error deleting voucher:", error);
    }
  };

  const handleEdit = (voucher) => {
    setEditMode(true);
    setEditVoucherId(voucher._id);
    setForm({
      name: voucher.name,
      expirationDate: voucher.expirationDate.split("T")[0], // Format date for input
      usageLimit: voucher.usageLimit,
      discountType: voucher.discountType,
      discountValue: voucher.discountValue,
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Admin Panel - {editMode ? "Edit" : "Create"} Voucher
      </h1>

      {/* Voucher Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block font-medium">Voucher Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value.toUpperCase() }) 
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Expiration Date</label>
          <input
            type="date"
            value={form.expirationDate}
            onChange={(e) =>
              setForm({ ...form, expirationDate: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Usage Limit</label>
          <input
            type="number"
            value={form.usageLimit}
            onChange={(e) => setForm({ ...form, usageLimit: e.target.value })}
            className="w-full p-2 border rounded"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block font-medium">Discount Type</label>
          <select
            value={form.discountType}
            onChange={(e) => setForm({ ...form, discountType: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Discount Value</label>
          <input
            type="number"
            value={form.discountValue}
            onChange={(e) =>
              setForm({ ...form, discountValue: e.target.value })
            }
            placeholder={
              form.discountType === "percentage"
                ? "Enter % discount (e.g., 10)"
                : "Enter fixed amount (e.g., 150)"
            }
            className="w-full p-2 border rounded"
            required
            min="1"
          />
        </div>

        <button
          type="submit"
          className={`px-4 py-2 text-white rounded ${
            editMode ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          {editMode ? "Update Voucher" : "Create Voucher"}
        </button>
      </form>

      {/* Voucher List */}
      <h2 className="text-xl font-semibold mb-4">Existing Vouchers</h2>
      <div className="space-y-2">
        {vouchers.map((voucher) => (
          <div key={voucher._id} className="p-4 border rounded shadow">
            <h3 className="font-bold">{voucher.name}</h3>
            <p>
              Expires: {new Date(voucher.expirationDate).toLocaleDateString()}
            </p>
            <p>Usage Limit: {voucher.usageLimit}</p>
            <p>
              Discount:{" "}
              {voucher.discountType === "percentage"
                ? `${voucher.discountValue}%`
                : `Rs.${voucher.discountValue}`}
            </p>
            <button
              onClick={() => handleEdit(voucher)}
              className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(voucher._id)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

