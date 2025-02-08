//app/buynow/[id]/page.js
"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react"; // Icons
import { motion, AnimatePresence } from "framer-motion"; // Animations
import { useParams, useRouter } from "next/navigation";
import { API_URL, STRAPI_API_TOKEN } from "@/utils/urls";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const selectedColor = searchParams.get("selectedColor");
  const [productData, setProductData] = useState(null);
  const Token = STRAPI_API_TOKEN;
  const { data: session, status } = useSession(); // Get session data
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google"); // Automatically sign in with Google
    }
  }, [status]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cart, setCart] = useState([]);
  const url = API_URL;
  const fetchUrl = `${url}/api/products/${id}?populate=*`;
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false); // Track main thumbnail loading
  const [isOpen, setIsOpen] = useState(false);
  const subtotal = productData ? productData.data.price : 0;
  const shipping = 150;
  const total = subtotal + shipping;

  const { name, price, subtitle, thumbnail } = productData?.data
    ? productData.data
    : {};

  const mainThumbnail =
    thumbnail && selectedColor !== null
      ? `${thumbnail[selectedColor]?.url}` || `${thumbnail[selectedColor]?.url}`
      : "";

  const placeholderThumbnail =
    thumbnail && selectedColor !== null
      ? `${thumbnail[selectedColor]?.formats?.thumbnail?.url}` || ""
      : "";

  // Handle main image load
  const handleThumbnailLoad = () => {
    setThumbnailLoaded(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }

        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [Token, fetchUrl]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      stripeId: id, // Assuming COD for now
      FirstName: formData.firstName,
      LastName: formData.lastName,
      City: formData.city,
      Address: formData.address,
      PostalCode: formData.postalCode || "N/A",
      PhoneNumber: formData.phoneNumber,
      selectedColor: selectedColor,
    };

    try {
      const response = await fetch(`${url}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify({ data: orderData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Failed to place order");
      }

      const result = await response.json();
      // Reset form and UI if needed
      setFormData({
        firstName: "",
        lastName: "",
        city: "",
        address: "",
        postalCode: "",
        phoneNumber: "",
      });
      console.log("Order created:", result);

      const newOrderId = result?.data?.documentId; // Get order ID
      router.push(`/success?orderId=${newOrderId}`);
    } catch (error) {
      const errorText =
        error.message === "Internal Server Error"
          ? "Server Error: Please try again later."
          : error.message;
      router.push(`/fail?error=${encodeURIComponent(errorText)}`);
    }
  };

  return (
    <div className="min-h-[100vh] w-[90vw] mx-auto py-10 space-y-8">
      {/* Order Summary Section */}
      <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg border">
        <div
          className="flex justify-between items-center border-b pb-4 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </div>
          <h2 className="text-xl font-semibold">Rs {total}</h2>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mt-4"
            >
              {/* Product Details */}
              <div className="flex items-center gap-4">
                {/* Show Blurry Placeholder First */}
                {!thumbnailLoaded && placeholderThumbnail && (
                  <Image
                    width={200}
                    height={200}
                    src={placeholderThumbnail}
                    alt="Thumbnail Placeholder"
                    className="w-20 h-20 object-cover rounded-lg border blur-md"
                    priority
                  />
                )}

                {/* Load Main Thumbnail */}
                {mainThumbnail && (
                  <Image
                    width={200}
                    height={200}
                    src={`${mainThumbnail}`}
                    alt="Product Image"
                    className="w-20 h-20 object-cover rounded-lg border"
                    priority
                    onLoad={handleThumbnailLoad}
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-gray-600">Product Color</p>
                  <p className="text-gray-800 font-medium">{price}</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 text-gray-800">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <h3 className="font-medium">Subtotal</h3>
                  <h3 className="font-semibold">Rs {subtotal}</h3>
                </div>

                {/* Shipping */}
                <div className="flex justify-between">
                  <h3 className="font-medium">Shipping</h3>
                  <h3 className="font-semibold">Rs {shipping}</h3>
                </div>

                {/* Total */}
                <div className="flex justify-between border-t pt-4">
                  <h3 className="text-lg font-bold">Total</h3>
                  <h3 className="text-lg font-bold">Rs {total}</h3>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <form className="space-y-4" onSubmit={handleOrderSubmit}>
        {/* Delivery Section */}
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg border space-y-6">
          <h1 className="text-2xl font-bold">Delivery</h1>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country/Region
            </label>
            <input
              type="text"
              value="Pakistan"
              readOnly
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              name="firstName"
              value={formData[name]}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter your first name"
              required
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              name="lastName"
              value={formData[name]}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter your last name"
              required
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              name="city"
              value={formData[name]}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter your city"
              required
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              name="address"
              value={formData[name]}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter your address"
              required
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code (Optional)
            </label>
            <input
              name="postalCode"
              value={formData[name]}
              onChange={handleInputChange}
              type="number"
              placeholder="Enter your postal code"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              value={formData[name]}
              onChange={handleInputChange}
              type="number"
              placeholder="Enter your phone number"
              required
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Shipping Method */}
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg border">
          <h3 className="text-xl font-semibold mb-4">Shipping Method</h3>
          <div className="flex justify-between items-center p-3 bg-gray-100 border border-gray-300 rounded-lg">
            <span className="text-gray-700 font-medium">Standard</span>
            <span className="text-gray-900 font-semibold">Rs {shipping}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg border">
          <h3 className="text-xl font-semibold mb-4">Payment</h3>
          <div className="flex justify-between items-center p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <span className="text-gray-700 font-medium">
              Cash On Delivery (COD)
            </span>
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
        </div>

        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg border space-y-6">
          {/* Heading */}
          <h2 className="text-2xl font-bold border-b pb-4">Order Summary</h2>

          {/* Product Details */}
          <div className="flex items-center gap-4">
            {!thumbnailLoaded && placeholderThumbnail && (
              <Image
                width={200}
                height={200}
                src={placeholderThumbnail}
                alt="Thumbnail Placeholder"
                className="w-20 h-20 object-cover rounded-lg border blur-md"
                priority
              />
            )}

            {/* Load Main Thumbnail */}
            {mainThumbnail && (
              <Image
                width={200}
                height={200}
                src={`${mainThumbnail}`}
                alt="Product Image"
                className="w-20 h-20 object-cover rounded-lg border"
                priority
                onLoad={handleThumbnailLoad}
              />
            )}
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-gray-600">Product Color</p>
              <p className="text-gray-800 font-medium">Rs. {price}</p>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-4 text-gray-800">
            {/* Subtotal */}
            <div className="flex justify-between">
              <h3 className="font-medium">Subtotal</h3>
              <h3 className="font-semibold">Rs {subtotal}</h3>
            </div>

            {/* Shipping */}
            <div className="flex justify-between">
              <h3 className="font-medium">Shipping</h3>
              <h3 className="font-semibold">Rs {shipping}</h3>
            </div>

            {/* Total */}
            <div className="flex justify-between border-t pt-4">
              <h3 className="text-lg font-bold">Total</h3>
              <h3 className="text-lg font-bold">Rs {total}</h3>
            </div>
          </div>
        </div>

        {/* Complete Order Button */}
        <div className="max-w-lg mx-auto">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 text-white font-semibold rounded-lg transition duration-300 ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span>Processing...</span>
              </div>
            ) : (
              "Complete Order"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
