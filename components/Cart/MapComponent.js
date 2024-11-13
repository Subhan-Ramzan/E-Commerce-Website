"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdLocationOn } from "react-icons/md";
import { MdLocalShipping } from 'react-icons/md';

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
    <div className="flex flex-col bg-slate-100 h-full w-[30vw] p-2">
      <h1 class="text-sm font-semibold text-gray-900 mb-4">Delivery Options</h1>
      {location.latitude ? (
        <div className="flex justify-between items-center gap-2">
          <div>
            <MdLocationOn className="text-blue-500 text-3xl" />
          </div>
          <div>
            <p className="text-[11px] font-medium"> {location.locationName || "Fetching..."}</p>
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
          <div>
            <MdLocalShipping className="text-blue-500 text-xl" />
            <span className="text-gray-700">Cash on Delivery</span>
          </div>
        </div>
      ) : (
        <>
          <Link
            className="flex justify-between"
            href={`https://boggy-shadowed-plain.glitch.me`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdLocationOn className="text-blue-500 text-2xl" />
            <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              Click for set Location
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
