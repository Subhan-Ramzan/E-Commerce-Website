"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

// Move the main component logic into its own client component
function FailContent() {
  const searchParams = useSearchParams();
  const errorMessage =
    searchParams.get("error") ||
    "An unknown error occurred. Please try again.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600">Order Failed!</h1>
        <p className="text-gray-600 mt-2">
          We&apos;re sorry, but your order could not be processed.
        </p>
        <div className="mt-4 p-3 bg-red-50 rounded-lg text-red-700 font-medium">
          {errorMessage}
        </div>
        <Link href="/" className="block mt-4 text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

// Wrap FailContent in Suspense to satisfy Next.js requirements
export default function FailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FailContent />
    </Suspense>
  );
}

// Export as dynamic to force runtime rendering instead of static pre-rendering
export const dynamic = "force-dynamic";
