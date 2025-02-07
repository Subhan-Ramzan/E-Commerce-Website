"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
    const [isClient, setIsClient] = useState(false);
    const phoneNumber = "+923250826305"; // Apna WhatsApp number add karein (international format)
    const pathname = usePathname(); // Yeh URL ka path dega
    const searchParams = useSearchParams(); // Yeh query parameters fetch karega
    const [fullUrl, setFullUrl] = useState("");
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Construct the full URL
            setFullUrl(
                `${window.location.origin}${pathname}?${searchParams.toString()}`
            );
        }
    }, [pathname, searchParams]);

    const whatsappMessage = `Hello, I Can Help! ${fullUrl}`;

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <Link
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed max-md:bottom-[8vh] bottom-5 right-5 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        >
            <FaWhatsapp size={32} />
        </Link>
    );
}
