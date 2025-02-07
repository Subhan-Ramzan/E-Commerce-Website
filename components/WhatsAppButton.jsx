"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { Suspense } from "react";

export default function WhatsAppButton() {
    const phoneNumber = "+923250826305"; // WhatsApp number
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Ensure code runs only on client-side
    const fullUrl = typeof window !== "undefined"
        ? `${window.location.origin}${pathname}?${searchParams.toString()}`
        : "";

    const whatsappMessage = `Hello, I Can Help! ${fullUrl}`;

    return (
        <Suspense fallback={null}>
            <Link
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed max-md:bottom-[8vh] bottom-5 right-5 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
            >
                <FaWhatsapp size={32} />
            </Link>
        </Suspense>
    );
}
