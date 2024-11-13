"use client";
import MapPage from "@/components/Cart/MapComponent";

export default function Map() {
  return (
    <div>
      <MapPage />

       {/* <Link
            href={`https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json&accept-language=en`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              Click for more details
            </button>
          </Link> */}
    </div>
  );
}
