"use client";
import React, { Suspense, useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactMarkdown from "react-markdown";
import ProductDetail from "@/components/ProductDetails";
import RelatedProducts from "@/components/RelatedProducts";
import { getDiscountedPricePercentage } from "@/utils/percentage";
import { useSession, signIn } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

const Product = ({ product }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductContent product={product} />
    </Suspense>
  );
};

const ProductContent = ({ product }) => {
  const pathname = usePathname(); // Yeh URL ka path dega
  const searchParams = useSearchParams(); // Yeh query parameters fetch karega
  const [fullUrl, setFullUrl] = useState("");

  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null); // State for color
  const [showError, setShowError] = useState(false);
  const p = product;
  const { data: session } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [number, setNumber] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false); // State for checking if image is loaded

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Construct the full URL
      setFullUrl(
        `${window.location.origin}${pathname}?${searchParams.toString()}`
      );
    }
  }, [pathname, searchParams]);

  const colorNumber = number; // Fetch order ID from URL
  const whatsappNumber = "+923299172889";
  const whatsappMessage = `Hello, I Can Help this Product My product Url is ${fullUrl} and Color Number is ${colorNumber}`;

  const handleShowError = () => {
    if (!selectedSize || selectedColor === null) {
      setShowError(true);
      return false;
    }
    return true;
  };

  const handleBuyNow = () => {
    if (handleShowError()) {
      router.push(`/buynow/${p?.documentId}?selectedColor=${selectedColor}`);
    }
    window.scrollBy({ top: -100, behavior: "smooth" });
  };

  const handleAddToCart = (productId) => {
    if (!selectedSize || selectedColor === null) {
      setShowError(true);
      return;
    }
    notify();
    if (session) {
      axios
        .post("/api/cart", {
          email: session.user.email,
          productId,
        })
        .then((res) => {
          console.log("Item added to cart:", res.data);
          setCart(res.data.items || []);
        })
        .catch((error) => {
          console.log("Error adding item to cart:", error);
        });
    } else {
      signIn("google"); // Automatically sign in with Google
    }
  };

  const notify = () => {
    if (session) {
      toast.success("Success. Check your cart!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const images = p ? p[`image${number}`] : "";

  return (
    <div className="w-[90vw] mx-auto md:py-20">
      <ToastContainer />
      <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
        {/* Left Column: Product Image Carousel */}
        <div className="w-full md:w-auto flex-[1.5] max-w-full lg:max-w-[50vw] mx-auto lg:mx-0">
          <ProductDetail thumbnail={p?.thumbnail?.url} images={images} />
        </div>

        {/* Right Column: Product Details */}
        <div className="flex-[1] py-3">
          <div className="text-[34px] font-semibold mb-2 leading-tight">
            {p?.name}
          </div>
          <div className="text-lg font-semibold mb-5">{p?.subtitle}</div>
          {/* Product Price */}
          <div className="flex items-center">
            <p className="mr-2 text-lg font-semibold">
              MRP : &#8377;{p?.price}
            </p>
            {p?.original_price && (
              <>
                <p className="text-base font-medium line-through">
                  &#8377;{p?.original_price}
                </p>
                <p className="ml-auto text-base font-medium text-green-500">
                  {getDiscountedPricePercentage(p?.original_price, p?.price)}%
                  off
                </p>
              </>
            )}
          </div>
          <div className="text-md font-medium text-black/[0.5]">
            incl. of taxes
          </div>
          <div className="text-md font-medium text-black/[0.5] mb-20">{`(Also includes all applicable duties)`}</div>
          {/* Size Selection */}
          <div className="mb-10">
            <div className="flex justify-between mb-2">
              <div className="text-md font-semibold">Select Size</div>
              <div
                className="text-md font-medium text-black/[0.4] cursor-pointer"
                onClick={() => setShowSizeGuide(true)}
                onMouseEnter={() => setShowSizeGuide(true)}
              >
                Size Guide
              </div>
            </div>
            {showSizeGuide && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full text-center relative ">
                  <button
                    className="absolute top-2 right-2 text-lg font-bold"
                    onClick={() => setShowSizeGuide(false)}
                  >
                    &times;
                  </button>
                  <h2 className="text-lg font-semibold mb-4">Size Guide</h2>
                  <div className="items-start flex flex-col mx-auto">
                    <p>
                      <strong>Small:</strong> Height 52-54 inches, Width
                      Adjustable
                    </p>
                    <p>
                      <strong>Medium:</strong> Height 55-56 inches, Width
                      Adjustable
                    </p>
                    <p>
                      <strong>Large:</strong> Height 57-58 inches, Width
                      Adjustable
                    </p>
                    <p>
                      <strong>X-Large:</strong> Height 59-60 inches, Width
                      Adjustable
                    </p>
                    <p>
                      <strong>XX-Large:</strong> Height 61-62 inches, Width
                      Adjustable
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div id="sizesGrid" className="grid grid-cols-3 gap-2">
              {p?.size?.data.map((item, i) => (
                <div
                  key={i}
                  className={`border rounded-md text-center py-3 font-medium ${
                    item.enabled
                      ? "hover:border-black cursor-pointer"
                      : "cursor-not-allowed bg-black/[0.1] opacity-50"
                  } ${selectedSize === item.size ? "border-black" : ""}`}
                  onClick={() => {
                    if (!item.enabled) return; // Prevent click if disabled
                    setSelectedSize(item.size);
                    setShowError(false);
                  }}
                >
                  {item.size}
                </div>
              ))}
            </div>
          </div>
          <div className="mb-10">
            <div className="flex justify-between mb-2">
              <div className="text-md font-semibold">Select thumbnail</div>
            </div>
            <div id="colorGrid" className="grid grid-cols-3 gap-2">
              {p?.thumbnail.map((thumbnail, i) => (
                <div
                  key={thumbnail.id}
                  onClick={() => {
                    setNumber(i);
                    setSelectedColor(i);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`relative rounded cursor-pointer transition-all ${
                    selectedColor === i ? "bg-black p-1" : ""
                  }`}
                >
                  <Image
                    // src={`${url}${thumbnail.url}`}
                    src={`${thumbnail.url}`}
                    alt={thumbnail.name}
                    width={150} // Fixed width
                    height={150} // Fixed height
                    className="object-cover rounded w-36 h-36"
                    placeholder="blur"
                    blurDataURL={`${thumbnail.url}?w=10&h=10&fit=crop&auto=format`} // Use a low-resolution image as placeholder
                    onLoad={() => setImageLoaded(true)} // Mark image as loaded
                  />
                </div>
              ))}
            </div>
            {showError && (
              <div className="text-red-600 text-lg mt-4">
                Size and color selection are required
              </div>
            )}
          </div>
          {/* Add to Cart Button */}
          <button
            className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
            onClick={() => {
              handleAddToCart(p?.documentId);
            }}
          >
            Add to Cart
          </button>
          {/* BuyNow Button */}
          <button
            className="w-full py-4 rounded-full bg-blue-600 text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:bg-blue-800 flex items-center justify-center gap-2 shadow-lg"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
          <Link
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="w-full py-4 rounded-full bg-green-500 text-white text-lg font-medium transition-transform active:scale-95 mb-10 hover:bg-green-600 flex items-center justify-center gap-2 shadow-lg">
              <FaWhatsapp size={24} /> Contact on WhatsApp
            </button>
          </Link>
          {/* Product Description */}
          <div>
            <div className="text-lg font-bold mb-5">Product Details</div>
            <div className="text-md mb-5">
              {p?.Description.map((descItem, index) => {
                if (descItem.type === "paragraph") {
                  return (
                    <p key={index} className="mb-4">
                      {descItem.children.map((child, childIndex) => {
                        if (child.type === "text") {
                          return child.bold ? (
                            <strong key={childIndex}>{child.text}</strong>
                          ) : (
                            <span key={childIndex}>{child.text}</span>
                          );
                        }
                        return null;
                      })}
                    </p>
                  );
                } else if (
                  descItem.type === "list" &&
                  descItem.format === "unordered"
                ) {
                  return (
                    <ul key={index} className="list-disc pl-5 mb-4">
                      {descItem.children.map((listItem, listIndex) => (
                        <li key={listIndex}>
                          {listItem.children.map((child, childIndex) => {
                            if (child.type === "text") {
                              return <span key={childIndex}>{child.text}</span>;
                            }
                            return null;
                          })}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <RelatedProducts currentProductId={p.documentId} />
        </div>
      </div>
    </div>
  );
};

export default Product;
