"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function NotFoundContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600 mt-4">
                Oops! The page you&apos;re looking for doesn&apos;t exist.
            </p>
            {query && (
                <p className="text-sm text-gray-500 mt-2">
                    Did you mean to search for &quot;{query}&quot;?
                </p>
            )}
            <Link href="/" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">
                Go Back Home
            </Link>
        </div>
    );
}

export default function NotFoundPage() {
    return (
        <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
            <NotFoundContent />
        </Suspense>
    );
}