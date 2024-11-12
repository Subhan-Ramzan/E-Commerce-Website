"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const socket = io("https://boggy-shadowed-plain.glitch.me"); // Backend server URL

export default function MapPage() {
  const [location, setLocation] = useState({ latitude: null, longitude: null, locationName: "" });
  // const router = useRou
  const router = useRouter()

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
    <div>
      <h1>Live Location</h1>
      {location.latitude ? (
        <>
          <p>Latitude: {location.latitude || "Fetching..."}</p>
          <p>Longitude: {location.longitude || "Fetching..."}</p>
          <p>Location Name: {location.locationName || "Fetching..."}</p>
          <Link
            href={`https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json&accept-language=en`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              Click for more details
            </button>
          </Link>
        </>
      ) : (
        <Link
          href={`https://boggy-shadowed-plain.glitch.me`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Click for fetch Location
          </button>
        </Link>
      )}

    </div>
  );
}
