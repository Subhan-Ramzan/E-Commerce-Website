"use client";
import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { FaCar, FaTag, FaMinus, FaPlus } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import io from "socket.io-client";
import { CldImage } from "next-cloudinary";
import { PlusIcon, MinusIcon } from "./Icons";

// Socket connection
const socket = io("https://boggy-shadowed-plain.glitch.me");

export default function Buynow({ onClose, product }) {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const router = useRouter();

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    locationName: "",
  });

  const [voucherCode, setVoucherCode] = useState("");
  const [voucher, setVoucher] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const shippingFee = 149; // Example shipping fee
  const initialSubtotal = product.price;

  // Apply voucher code and calculate discount
  const handleApplyVoucher = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    try {
      const response = await axios.post("/api/vouchers/apply", { voucherCode });
      setResult(response.data);
      onVoucherApply(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  // Set voucher details
  const onVoucherApply = (voucherData) => {
    setVoucher(voucherData);
  };

  // Calculate total price based on voucher
  const calculateTotalPrice = () => {
    let price = initialSubtotal;
    if (voucher) {
      if (voucher.discountType === "percentage") {
        price = price - (price * voucher.discountValue) / 100;
      } else {
        price = price - voucher.discountValue;
      }
    }
    console.log(price);
    return price + shippingFee;
  };

  // Effect to listen for location updates
  useEffect(() => {
    socket.on("receive-location", (data) => {
      setLocation({
        latitude: data.latitude,
        longitude: data.longitude,
        locationName: data.locationName,
      });
    });

    return () => {
      socket.off("receive-location");
    };
  }, []);

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
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
        }
      } catch (error) {
        setUserData(null);
      }
    };

    if (status === "unauthenticated" && userData === null) {
      fetchUserData();
    }
  }, [status, userData, router]);

  const totalDemoPrice = calculateTotalPrice();
  const totalPrice = Math.round(totalDemoPrice);

  return (
    <div className="fixed w-full h-full bg-black bg-opacity-50 top-0 left-0 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white h-[100vh] rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-auto relative">
        {/* Header */}
        <div className="flex justify-between bg-slate-900 fixed top-0 left-0 max-w-2xl m-auto right-0 items-center border-b p-3 z-50 text-white">
          <h1 className="text-2xl font-semibold">Checkout</h1>
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
              <p>
                {session?.user?.name ||
                  userData.username ||
                  session?.user?.email?.split(/(?=\d)/)[0]}
              </p>
            ) : (
              <p>Guest</p>
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
                  href="https://boggy-shadowed-plain.glitch.me"
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
          <div className="flex flex-col justify-between w-full">
            <p className="text-gray-800 font-medium">{product.name}</p>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div className="flex justify-between items-center mt-2 w-full">
              <h3 className="text-lg font-semibold text-gray-800">
                ₨. {product.price}
              </h3>
              <div className="flex items-center gap-2">
                <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 focus:outline-none transition-all duration-300 shadow">
                  <MinusIcon />
                </button>
                <p className="text-lg font-medium text-gray-700">1</p>
                <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none transition-all duration-300 shadow">
                  <PlusIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* Delivery Section */}
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">
              Standard Delivery
            </h2>
            <p className="flex items-center gap-2 text-gray-700">
              <FaCar />
              <span>₨. {shippingFee}</span>
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
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value.toLocaleUpperCase())}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleApplyVoucher(e); // Trigger the same function when Enter is pressed
              }
            }}
          />
          <button
            className="p-2 bg-blue-500 text-white font-medium hover:bg-blue-600"
            onClick={handleApplyVoucher}
          >
            Apply
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <hr className="my-4" />

        {/* Pricing Details */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="text-gray-800">Subtotal</h3>
            <h2 className="text-lg text-gray-950 font-semibold">
              ₨. {initialSubtotal.toLocaleString()}
            </h2>
          </div>
          <div className="flex justify-between">
            <h3 className="text-gray-800">Shipping Fee</h3>
            <h2 className="text-gray-950 font-semibold">₨. {shippingFee}</h2>
          </div>
          {voucher && voucher.discountValue > 0 && (
            <div className="flex justify-between">
              <h3 className="text-gray-800">Voucher Discount</h3>
              <h2 className="text-red-600">
                -₨.{" "}
                {voucher.discountType === "percentage"
                  ? `${voucher.discountValue}%`
                  : `${voucher.discountValue}`}
              </h2>
            </div>
          )}
          <div className="flex justify-between font-bold">
            <h3 className="text-gray-900 font-bold text-lg">Total</h3>
            <h3 className="text-blue-600 font-bold text-lg">₨. {totalPrice.toLocaleString()}</h3>
          </div>
        </div>

        <hr className="my-2 py-4" />

        {/* Place Order */}
        <div className="flex justify-between items-center bg-slate-50 mt-4 max-w-2xl m-auto fixed bottom-0 left-0 right-0 p-2">
          <div className="text-lg font-semibold text-gray-900">
            Total:
            <span className="text-blue-500 font-bold">
              {` ₨. ${totalPrice.toLocaleString()}`}
            </span>
          </div>
          <button className="bg-green-500 text-white font-medium py-2 px-4 rounded hover:bg-green-600">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
