'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { API_URL } from '@/utils/urls';

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders/${id}?populate=*`, {
          headers: {
            Authorization: `Bearer YOUR_STRAPI_API_TOKEN`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch order details');

        const data = await res.json();
        setOrder(data.data.attributes); // assuming Strapi v4 response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-xl">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!order) return <div className="text-center py-20">Order not found.</div>;

  const thumbnailUrl = order.thumbnail?.data?.attributes?.url
    ? `${API_URL}${order.thumbnail.data.attributes.url}`
    : '/placeholder.jpg';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Thumbnail */}
        <div className="relative">
          <img
            src={thumbnailUrl}
            alt="Order Thumbnail"
            className="w-full h-72 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Order #{id}
            </h1>
          </div>
        </div>

        {/* Order Info */}
        <div className="p-8 space-y-8">
          <div className="text-center">
            <span className="inline-block bg-purple-100 text-purple-800 text-sm px-4 py-1 rounded-full">
              Status: {order.Option}
            </span>
          </div>

          {/* Customer Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Customer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
              <p><strong>Name:</strong> {order.FirstName} {order.LastName}</p>
              <p><strong>Email:</strong> {order.userEmail}</p>
              <p><strong>Phone:</strong> {order.PhoneNumber}</p>
              <p><strong>City:</strong> {order.City}</p>
              <p><strong>Address:</strong> {order.Address}</p>
              <p><strong>Postal Code:</strong> {order.PostalCode || 'N/A'}</p>
            </div>
          </section>

          {/* Order Details */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Order Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
              <p><strong>Stripe ID:</strong> {order.stripeId}</p>
              <p><strong>Selected Color:</strong> {order.selectedColor}</p>
              <p><strong>Complete:</strong> {order.Complete ? '✅ Yes' : '❌ No'}</p>
            </div>
          </section>

          {/* Back Button */}
          <div className="text-center pt-8">
            <button
              onClick={() => window.history.back()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full shadow-xl hover:scale-105 transition-transform"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
