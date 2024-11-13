"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdLocationOn } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import { BsExclamationCircle } from "react-icons/bs";
const socket = io("https://boggy-shadowed-plain.glitch.me"); // Backend server URL

export default function MapPage() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    locationName: "",
  });
  // const router = useRou
  const router = useRouter();

  useEffect(() => {
    // Listen for location updates from the server
    socket.on("receive-location", (data) => {
      console.log("Location received:", data);
      setLocation({
        latitude: data.latitude,
        longitude: data.longitude,
        locationName: data.locationName,
      });
    });

    return () => {
      socket.off("receive-location"); // Cleanup on component unmount
    };
  }, []);

  return (
    <>
      <div className="flex flex-col bg-gray-50 h-full w-full md:w-[30vw] p-4 rounded-lg shadow-lg">
        <span className="flex justify-between items-center mb-4">
          <h1 className="text-sm font-extrabold text-gray-900">
            Delivery Options
          </h1>
          <div className="relative group">
            <BsExclamationCircle className="text-gray-600 text-xl cursor-pointer" />
            <div className="absolute top-full -left-24 z-50 transform -translate-x-1/2 mt-2 w-[220px] bg-white border border-gray-300 shadow-md rounded-md p-2 hidden group-hover:block">
              <h2 className="text-xs font-bold text-gray-800 mb-2">
                Delivery Policy Includes:
              </h2>
              <ul className="list-disc ml-4 text-xs text-gray-700 space-y-1">
                <li>Fast delivery within 3-5 business days.</li>
                <li>Tracking information provided after dispatch.</li>
                <li>Free shipping on orders over $50.</li>
                <li>Signature required for valuable packages.</li>
              </ul>
            </div>
          </div>
        </span>
        {location.latitude ? (
          <>
            <div className="flex justify-between items-center gap-2">
              <div>
                <MdLocationOn className="text-blue-500 text-3xl" />
              </div>
              <div>
                <p className="text-[12px] font-semibold">
                  {location.locationName || "Fetching..."}
                </p>
              </div>
              <div>
                <Link
                  href={`https://boggy-shadowed-plain.glitch.me`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="px-4 py-2 text-blue-600 font-semibold rounded-lg text-base">
                    Change
                  </button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div>
            <Link
              className="flex justify-between items-center"
              href={`https://boggy-shadowed-plain.glitch.me`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdLocationOn className="text-blue-500 text-2xl" />
              <p className="text-lg font-bold">Default Location</p>
              <button className="px-4 py-2 text-blue-600 font-semibold rounded-lg text-base">
                Change
              </button>
            </Link>
          </div>
        )}
        <div className="flex gap-3 items-center p-1 pt-3">
          <MdLocalShipping className="text-blue-500 text-xl" />
          <span className="text-gray-900 font-semibold">
            Available Cash on Delivery <span className="font-extrabold">(COD)</span>
          </span>
        </div>
        <hr className="border-gray-300" />

        <div className="pt-2 flex justify-between items-center">
          <h1 className="text-sm font-extrabold text-gray-900 mb-4">
            Return and Warranty
          </h1>
          {/* Hover trigger for warranty info */}
          <div className="relative group">
            <BsExclamationCircle className="text-gray-600 text-xl cursor-pointer" />
            {/* Tooltip - shows on hover */}
            <div className="absolute top-full z-50 -left-24 transform -translate-x-1/2 mt-2 w-[200px] bg-white border border-gray-300 shadow-md rounded-md p-2 hidden group-hover:block">
              <h2 className="text-xs font-bold text-gray-800 mb-2">
                Warranty Applicable For:
              </h2>
              <ul className="list-disc ml-4 text-xs text-gray-700 space-y-1">
                <li>Manufacturing defects</li>
                <li>Damaged or broken items upon delivery</li>
                <li>Functional issues within 7 days</li>
                <li>Incorrect item delivered</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#2563EB"
              width="30px"
              height="30px"
              className="drop-shadow-md"
            >
              <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3zm0 18c-3.74-1.17-6-5.22-6-10V6.26L12 4.34l6 1.92V10c0 4.78-2.26 8.83-6 10z" />
            </svg>
            <span
              className="absolute top-[-5px] right-[-5px] bg-blue-500 text-white text-[10px] font-bold rounded-full px-[6px] py-[2px] shadow-sm"
            >
              7
            </span>
          </div>
          <p className="text-xs font-medium text-gray-900">
            7 Days Return Warranty
          </p>
        </div>
        <hr className="border-gray-300" />

        <div className="mt-3">
          <div className="flex flex-col bg-white shadow-md rounded-md p-3 w-full">
            <h1 className="text-lg font-bold text-gray-900 mb-3">Seller Statistics</h1>

            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-700 font-medium">Positive Seller Ratings</span>
              <span className="text-sm font-bold text-green-600">90%</span>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-700 font-medium">Ship on Time</span>
              <span className="text-sm font-bold text-blue-600">97%</span>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-700 font-medium">Chat Response Rate</span>
              <span className="text-sm font-bold text-gray-500">Not enough data</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

