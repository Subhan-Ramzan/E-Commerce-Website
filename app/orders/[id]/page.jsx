'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { API_URL, STRAPI_API_TOKEN } from '@/utils/urls';

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [productData, setProductData] = useState(null);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  const selectedColor = order?.selectedColor;
  const fetchUrl = `${API_URL}/api/products/${order?.stripeId}?populate=*`;

  const handleThumbnailLoad = () => {
    setThumbnailLoaded(true);
  };

  const { name, thumbnail } = productData?.data
    ? productData.data
    : {};

  const mainThumbnail =
    thumbnail && selectedColor !== null
      ? `${thumbnail[selectedColor]?.url}` || `${thumbnail[selectedColor]?.url}`
      : "";

  const placeholderThumbnail =
    thumbnail && selectedColor !== null
      ? `${thumbnail[selectedColor]?.formats?.thumbnail?.url}` || ""
      : "";

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders/${id}?populate=*`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) throw new Error('Failed to fetch order details');

        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (!order?.stripeId) return;

    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl, {
          headers: {
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch product data');

        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchUrl, order?.stripeId]);

  if (loading) return <div className="text-center py-20 text-xl">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!order) return <div className="text-center py-20">Order not found.</div>;

  return (
    <>
      <Head>
        <title>{`Order Details - ${name || 'Product Name'}`}</title>
        <meta name="description" content={`Details for order ${id}`} />
        <meta property="og:title" content={`Order Details - ${name || 'Product Name'}`} />
        <meta property="og:description" content={`Details for order ${id}`} />
        <meta property="og:image" content={mainThumbnail || placeholderThumbnail} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-12 px-6">
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Product Image */}
          <div className="relative">
            {!thumbnailLoaded && placeholderThumbnail && (
              <Image
                src={placeholderThumbnail}
                alt="Thumbnail Placeholder"
                width={1200}
                height={500}
                className="w-full h-72 object-cover"
                priority
              />
            )}

            {mainThumbnail && (
              <Image
                src={mainThumbnail}
                alt="Product Image"
                width={1200}
                height={500}
                className="w-full h-72 object-cover"
                priority
                onLoad={handleThumbnailLoad}
              />
            )}

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                {name || 'Product Name'}
              </h1>
            </div>
          </div>

          {/* Order Info */}
          <div className="p-8 space-y-10">
            {/* Status */}
            <div className="text-center">
              <span className="inline-block bg-green-100 text-green-800 text-sm px-5 py-2 rounded-full">
                Status: {order?.Option}
              </span>
            </div>

            {/* Customer Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <p><strong>Name:</strong> {order?.FirstName} {order?.LastName}</p>
                <p><strong>Email:</strong> {order?.userEmail}</p>
                <p><strong>Phone:</strong> {order?.PhoneNumber}</p>
                <p><strong>City:</strong> {order?.City}</p>
                <p><strong>Address:</strong> {order?.Address}</p>
                <p><strong>Postal Code:</strong> {order?.PostalCode || 'N/A'}</p>
              </div>
            </section>

            {/* Order Details */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <p><strong>Order ID:</strong> {id}</p>
                <p><strong>Selected Color:</strong> {order?.selectedColor}</p>
                <p><strong>Complete:</strong> {order?.Complete ? '✅ Yes' : '❌ No'}</p>
              </div>
            </section>

            {/* Back Button */}
            <div className="text-center pt-10">
              <Link href="/profile">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">
                  ← Go Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}