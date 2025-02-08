"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
    const phoneNumber = "+923250826305"; // WhatsApp number
    const [fullUrl, setFullUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setFullUrl(window.location.href); // ✅ Get full URL including query params
        }
    }, []);

    const whatsappMessage = `Hello, I Can Help! ${fullUrl}`;

    return (
        <Link
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed max-md:bottom-[8vh] bottom-5 right-5 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        >
            <FaWhatsapp size={32} />
        </Link>
    );
}
