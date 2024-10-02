//app/profile/page.js
"use client";
import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import FaBar from "../profileBar/fabar"; // Adjust the import if needed
import ProductData from "../products/page"; // Use ProductData instead of AllProducts
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";
import Image from "next/image";

const ProfilePage = () => {
  const [productTroll, setProductTroll] = useState(false); // Toggle for product data
  const [handleFaBar, setHandleFaBar] = useState(false); // Sidebar toggle

  const toggleFaBar = () => setHandleFaBar(!handleFaBar); // Toggle sidebar

  const router = useRouter();
  const { data: session, status } = useSession();

  console.log("Profile Data", status);
  console.log("Session Data:", session);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <div className="max-md:relative flex overflow-auto h-[90vh]">
      {/* Sidebar */}
      <div
        className={`max-md:absolute max-md:${
          handleFaBar ? "block" : "hidden"
        } bg-slate-950 w-[25vw] min-h-[90vh] p-4 text-white`}
      >
        <div className="flex flex-col justify-center items-center pb-6">
          {status === "authenticated" ? (
            <Link href="/profile">
              {session?.user?.image ? (
                <Image
                  src={session.user.image.url || session.user.image}
                  alt="User Profile"
                  width={40} // Sets the width to 40px
                  height={40} // Sets the height to 40px
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
            {session?.user?.name ||
              session?.user?.email?.split(/(?=\d)/)[0] ||
              "Guest"}
          </h3>
        </div>
        <hr />
        <div>
          <h3
            onClick={() => setProductTroll(!productTroll)}
            className="font-medium text-2xl hover:text-blue-700 py-2 cursor-pointer"
          >
            All Products
          </h3>
        </div>
      </div>

      {/* Toggle button for sidebar */}
      <div onClick={toggleFaBar} className="md:hidden p-4">
        <FaBars className="text-2xl" />
      </div>

      {/* Sidebar Overlay */}
      {handleFaBar && (
        <div
          className={`fixed w-64 top-3 bottom-3 min-h-[96vh] px-6 py-4 left-2 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out rounded-2xl shadow-lg`}
        >
          <FaBar toggleFaBar={toggleFaBar} setProductTroll={setProductTroll} />
        </div>
      )}

      {/* Product Section */}
      <div className="flex flex-col w-full overflow-auto">
        {productTroll && <ProductData />}
      </div>
    </div>
  );
};

export default ProfilePage;
