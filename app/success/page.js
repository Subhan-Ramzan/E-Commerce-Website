"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react"; 
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId"); 
  const whatsappNumber = "+923299172889";
  const whatsappMessage = `Hello, I Can Help this Order my order ID is ${orderId}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your order. We will contact you soon.
        </p>

        {orderId && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg text-gray-800 font-semibold">
            Your Order ID: <span className="text-blue-600">{orderId}</span>
          </div>
        )}

        {/* WhatsApp Button */}
        {orderId && (
          <Link
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
          >
            Contact on WhatsApp
          </Link>
        )}
        <Link
          href="/profile"
          className="block mt-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Check Your Order
        </Link>

        <Link href="/" className="block mt-4 text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

// Wrap the main component in Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

// Force dynamic rendering to avoid pre-rendering issues
export const dynamic = "force-dynamic";
