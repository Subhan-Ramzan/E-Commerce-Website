import React from "react";
import { CgClose } from "react-icons/cg";
import { FaCar, FaTag, FaMinus, FaPlus } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdLocationOn } from "react-icons/md";
import io from "socket.io-client";
import { CldImage } from "next-cloudinary";

const socket = io("https://boggy-shadowed-plain.glitch.me");

export default function Buynow({ onClose, product }) {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const router = useRouter()

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    locationName: "",
  });

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

  useEffect(() => {
    const fetchCookieData = async () => {
      try {
        const response = await axios.get("/api/protected", {
          withCredentials: true,
        });
        setUserData(response.data.user);
        const user = response.data.user;
        const id = user.id;

        if (id) {
          const imageResponse = await axios.get(`/api/profileimage/${id}`);
          setPublicId(imageResponse.data.public_id);
        } else {
          console.log("No user ID found; skipping profile image fetch");
        }
      } catch (error) {
        console.log("Failed to fetch protected data:", error);
        setUserData(null);
        console.log("User data set to null due to fetch error");
      }
    };

    if (status === "unauthenticated" && userData === null) {
      fetchCookieData();
    }
  }, [status, userData, router]);

  return (
    <div className="fixed w-full h-full bg-black bg-opacity-50 top-0 left-0 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white h-[100vh] rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-auto relative">
        {/* Header */}
        <div className="flex justify-between bg-slate-900 fixed top-0 left-0 max-w-2xl m-auto right-0 items-center border-b p-3 z-50 text-white">
          <h1 className="text-2xl font-semibold ">Checkout</h1>
          <div
            className="text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        {/* User Info */}
        <div className="pt-[7vh]">
          <h2 className="text-lg font-medium text-gray-950">
            {status === "authenticated" || userData !== null ? (
              <>
                <p className="">
                  {session?.user?.name ||
                    userData.username ||
                    session?.user?.email?.split(/(?=\d)/)[0]}
                </p>
              </>
            ) : (
              <>
                <p>Guest</p>
              </>
            )}
          </h2>
          <div className="text-sm text-gray-600 py-2">
            <div className="flex justify-between items-center gap-2">
              <div>
                <MdLocationOn className="text-blue-500 text-3xl" />
              </div>
              <div>
                <p className="text-[12px] font-semibold">
                  {location.locationName || "Change Your Location..."}
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
          </div>

          <p className="text-sm text-red-500 mt-1">
            *Please make sure to verify your location before proceeding.*
          </p>

        </div>

        <hr className="my-4" />

        {/* Product Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaTag className="text-gray-700" />
            <h2 className="text-xl font-medium text-gray-800">Your Product</h2>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0">
              <CldImage
                src={product.productImage[0].public_id}
                alt={product.name}
                width={200}
                height={200}
                className="object-fill w-full h-full rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-gray-800 font-medium break-words w-[60vw] md:w-[60vw] lg:w-[50vw] xl:w-[35vw] overflow-hidden text-ellipsis line-clamp-3">
                ajkfdnjalkfdhnajklfajljkndfajklnfkjalnfakljndflakjnfkjalnakjkjklmklmnlkdsfmlksfdlsajlkdfkjaljalkdfjalkjalkjfklasjfakljfdkljakldjaflkjsdk
              </p>

              <p className="text-sm text-gray-600 break-words w-[60vw] md:w-[60vw] lg:w-[50vw] xl:w-[35vw] overflow-hidden text-ellipsis line-clamp-2 ">{product.description}</p>
              <div className="flex justify-between items-center mt-2">
                <h3 className="text-lg font-semibold text-gray-800">{product.price}</h3>
                <div className="flex items-center gap-2">
                  <button className="p-1 bg-gray-200 rounded">
                    <FaMinus />
                  </button>
                  <p className="text-gray-800">1</p>
                  <button className="p-1 bg-gray-200 rounded">
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <hr className="my-4" />

        {/* Delivery Section */}
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">Standard Delivery</h2>
            <p className="flex items-center gap-2 text-gray-700">
              <FaCar />
              <span>$5.00</span>
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-1">Guaranteed by: [Date]</p>
        </div>

        <hr className="my-4" />

        {/* Voucher Section */}
        <div className="flex items-center mt-2 border rounded-md overflow-hidden">
          <input
            className="flex-1 p-2 outline-none bg-gray-100 text-gray-700"
            type="text"
            placeholder="Enter Discount Voucher"
          />
          <button className="p-2 bg-blue-500 text-white font-medium hover:bg-blue-600">
            Apply
          </button>
        </div>

        <hr className="my-4" />

        {/* Pricing Details */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="text-gray-800">Subtotal</h3>
            <h2 className="text-lg text-blue-600 font-semibold">
              <span className="text-lg font-semibold mr-1 transition-transform duration-300 hover:scale-125">
                ₨.
              </span>
              {product.price.toLocaleString("en-IN")}
            </h2>
          </div>
          <div className="flex justify-between">
            <h3 className="text-gray-800">Shipping Fee</h3>
            <h2 className="text-gray-950">
              <span className="text-lg font-semibold mr-1 transition-transform duration-300 hover:scale-125">
                ₨.
              </span>
              149
            </h2>
          </div>
          <div className="flex justify-between">
            <h3 className="flex items-center gap-2 text-gray-800">
              <FaTag />
              Voucher
            </h3>
            <h2 className="text-gray-800">
              <span className="text-lg font-semibold mr-1 transition-transform duration-300 hover:scale-125">
                ₨.
              </span>
              -149
            </h2>
          </div>
          <div className="flex justify-between">
            <h3 className="flex items-center gap-2 text-gray-800">
              <FaTag />
              Shipping Fee Voucher
            </h3>
            <h2 className="text-gray-800"> <span className="text-lg font-semibold mr-1 transition-transform duration-300 hover:scale-125">
              ₨.
            </span>-50</h2>
          </div>
        </div>

        <hr className="my-4" />

        {/* Total and Place Order */}
        <div className="flex justify-between items-center bg-slate-50 mt-4 max-w-2xl m-auto fixed bottom-0 left-0 right-0 p-2">
          <div className="text-lg font-semibold text-gray-900">
            Total: 
            <span className="text-blue-500 font-bold"> <span className="text-lg font-bold mr-1 transition-transform duration-300 hover:scale-125">
              ₨.
            </span>2,000</span>
          </div>
          <button className="bg-green-500 text-white font-medium py-2 px-4 rounded hover:bg-green-600">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
