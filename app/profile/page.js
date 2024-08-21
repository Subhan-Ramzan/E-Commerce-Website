//app/profile/page.js
"use client";
import React, { useState, useEffect } from "react";
import { FaBars } from 'react-icons/fa';
import FaBar from "../profileBar/fabar"; // Adjust the import if needed
import ProductData from "../products/page"; // Use ProductData instead of AllProducts
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [productTroll, setProductTroll] = useState(false);
  const [handleFaBar, setHandleFaBar] = useState(false);

  const toggleFaBar = () => setHandleFaBar(!handleFaBar);

  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/login");
    }
  }, [sessionStatus, router]);

  return (
    <>
      <div className={`max-md:relative flex overflow-auto h-[90vh]`}>
        <div
          className={`max-md:absolute max-md:hidden bg-slate-950 w-[25vw] min-h-[90vh] p-4 text-white`}
        >
          <div className="flex flex-col justify-center items-center pb-6">
            <img src="" alt="UserPic" />
            <h3 className="font-semibold text-2xl">{session?.user?.name || "UserName"}</h3>
            <p className="font-normal">{session?.user?.role || "UserRole"}</p>
          </div>
          <hr />
          <div>
            <h3
              onClick={() => setProductTroll(true)}
              className="font-medium text-2xl hover:text-blue-700 py-2 cursor-pointer"
            >
              All Products
            </h3>
          </div>
        </div>
        <div onClick={toggleFaBar} className='md:hidden p-4'>
          <FaBars className='text-2xl' />
        </div>
        {handleFaBar &&
          <div className={`flex justify-between fixed w-64 top-3 bottom-3 min-h-[96vh] px-6 py-4 left-2 ${handleFaBar ? 'translate-x-0' : 'translate-x-full'} bg-gray-900 text-white transform transition-transform duration-300 ease-in-out rounded-2xl shadow-lg`}>
            <FaBar toggleFaBar={toggleFaBar} setProductTroll={setProductTroll} />
          </div>
        }
        <div className="flex flex-col w-full overflow-auto">
          {productTroll && <ProductData />}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
