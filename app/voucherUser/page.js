'use client';

import { useState } from 'react';
import axios from 'axios';

export default function UserPage() {
  const [voucherCode, setVoucherCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleApplyVoucher = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    try {
      const response = await axios.post('/api/vouchers/apply', { voucherCode });
      setResult(response.data); // Contains success, discountType, and discountValue
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Apply Voucher</h1>

      {/* Voucher Form */}
      <form onSubmit={handleApplyVoucher} className="mb-6 space-y-4">
        <div>
          <label className="block font-medium">Enter Voucher Code</label>
          <input
            type="text"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Apply Voucher</button>
      </form>

      {/* Results */}
      {result && (
        <div className="p-4 border rounded shadow bg-green-50">
          <h2 className="text-lg font-semibold text-green-700">Voucher Applied Successfully!</h2>
          <p>
            Discount: {result.discountType === 'percentage' ? `${result.discountValue}%` : `Rs.${result.discountValue}`}
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 border rounded shadow bg-red-50">
          <h2 className="text-lg font-semibold text-red-700">Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
