"use client";
import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import FaBar from "../profileBar/fabar";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import AllProducts from "../../api123/allProducts/page";
import UplaodData from "../../api123/uploadProductData/page";

const Page = () => {
  const [uploadProduct, setUploadProduct] = useState(false);
  const [handleFaBar, setHandleFaBar] = useState(false); // Sidebar toggle
  const [productTroll, setProductTroll] = useState(false); // Toggle for product data
  const [userData, setUserData] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const toggleProducts = () => {
    setProductTroll(!productTroll); // Toggle product display
  };
  const toggleFaBar = () => setHandleFaBar(!handleFaBar); // Toggle sidebar

  useEffect(() => {
    const fetchCookieData = async () => {
      try {
        const response = await axios.get("/api/protected", {
          withCredentials: true,
        });
        setUserData(response.data.user);

        const id = response.data.user.id;
        if (id) {
          const imageResponse = await axios.get(`/api/profileimage/${id}`);
          setPublicId(imageResponse.data.public_id);
        }
      } catch (error) {
        setUserData(null);
        signIn("google"); // Automatically sign in with Google
      }
    };

    if (status === "unauthenticated" && userData === null) {
      fetchCookieData();
    }
  }, [status, userData, router]);

  return (
    <div className="max-md:relative flex overflow-auto h-[90vh]">
      {/* Sidebar */}
      <div
        className={`max-md:absolute max-md:${
          handleFaBar ? "block" : "hidden"
        } bg-slate-950 w-[25vw] min-h-[90vh] p-4 text-white`}
      >
        <div className="flex flex-col justify-center items-center pb-6">
          {status === "authenticated" || userData !== null ? (
            <Link href="/profile">
              {session?.user?.image ? (
                <Image
                  src={session.user.image.url || session.user.image}
                  alt="User Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover cursor-pointer"
                />
              ) : publicId ? (
                <CldImage
                  src={publicId}
                  alt="User Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover cursor-pointer"
                />
              ) : (
                <FaRegCircleUser className="text-2xl md:text-3xl cursor-pointer" />
              )}
            </Link>
          ) : (
            <FaRegCircleUser className="text-2xl md:text-3xl cursor-pointer" />
          )}
          <h3>
            {status === "authenticated" || userData !== null ? (
              <p className="text-white">
                {session?.user?.name ||
                  userData.username ||
                  session?.user?.email?.split(/(?=\d)/)[0] ||
                  "Guest"}
              </p>
            ) : (
              <p className="text-white">Guest</p>
            )}
          </h3>
        </div>
        <hr />
        <div>
          {loading ? (
            <div className="flex flex-col justify-center items-center mt-4">
              <div className="loader-circle h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 font-medium mt-4">
                Loading products, please wait...
              </p>
            </div>
          ) : (
            <h3
              onClick={toggleProducts}
              className="font-medium text-2xl hover:text-blue-700 py-2 cursor-pointer"
            >
              Show All Products
            </h3>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full overflow-auto">
        {/* Toggle button for sidebar */}
        <div
          onClick={toggleFaBar}
          className="md:hidden p-4 flex items-center justify-center"
        >
          <FaBars className="text-2xl" />
          <div className="flex flex-row w-full justify-between items-center px-3">
            <h3 className="font-bold text-lg md:text-2xl ">Your Products</h3>
            <div className="ml-auto">
              <button
                onClick={() => setUploadProduct(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-2 py-2 md:px-4 rounded-lg"
              >
                Upload Product
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Overlay */}
        {handleFaBar && (
          <div
            className={`fixed w-64 top-3 bottom-3 min-h-[96vh] px-6 py-4 left-2 z-50 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out rounded-2xl shadow-lg`}
          >
            <FaBar
              toggleFaBar={toggleFaBar}
              setProductTroll={setProductTroll}
            />
          </div>
        )}

        {/* Product Management */}
        <div className="h-auto pb-2 md:pb-2">
          <div className="flex max-md:hidden flex-row w-full justify-between items-center px-3">
            <h3 className="font-bold text-lg md:text-2xl p-3">Your Products</h3>
            <div className="ml-auto">
              <button
                onClick={() => setUploadProduct(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-2 py-2 md:px-4 rounded-lg"
              >
                Upload Product
              </button>
            </div>
          </div>
          {/* <div>
            <AllProducts />
          </div> */}
        </div>
        {productTroll && <AllProducts setLoading={setLoading} />}
      </div>
      <div>
        {uploadProduct && (
          <UplaodData onClose={() => setUploadProduct(false)} />
        )}
      </div>
      <div></div>
      {/* </div>
        {productTroll && <AllProducts />}
      </div> */}
    </div>
  );
};

export default Page;
