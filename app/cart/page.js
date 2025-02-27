"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CartItem from "@/components/CartItem";
import { useSession, signIn } from "next-auth/react"; // Add next-auth for session management
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCallback } from "react";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession(); // Track session status

  const router = useRouter();
  const [cart, setCart] = useState([]);

  const fetchCart = useCallback(() => {
    let guestId = localStorage.getItem("guestId");
    const userEmail = session ? session.user.email : guestId;

    axios
      .get(`/api/cart/${userEmail}`)
      .then((res) => {
        setCart(res.data.items || []);
      })
      .catch((error) => {
        console.log("Error fetching cart:", error);
      });
  }, [session]); // `session` is a dependency here

  useEffect(() => {
    fetchCart();
  }, [session, fetchCart]); // `fetchCart` is now stable due to `useCallback`

  const [totalPrice, setTotalPrice] = useState([]);

  // Function to receive data from child
  const TotalPriceData = (data) => {
    setTotalPrice(data);
  };

  return (
    <div className="w-[90vw] mx-auto md:py-20">
      {cart?.length > 0 ? (
        <>
          {/* HEADING AND PARAGRAPH START */}
          <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
            <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
              Shopping Cart
            </div>
          </div>
          {cart?.length > 0 ? (
            totalPrice?.map((item, index) => <p key={index}>{item}</p>)
          ) : (
            <p>No items in the cart</p>
          )}

          {/* HEADING AND PARAGRAPH END */}

          {/* CART CONTENT START */}
          <div className="flex flex-col lg:flex-row gap-12 py-10">
            {/* CART ITEMS START */}
            <div className="flex-[2]">
              <div className="text-lg font-bold">Cart Items</div>
              {/* Map through the cart items and display them */}
              {cart.map((item, index) => (
                <CartItem
                  key={index}
                  data={{
                    documentId: item.product,
                    quantity: item.quantity,
                  }}
                  onTotalPrice={TotalPriceData}
                  onItemRemoved={fetchCart}
                />
              ))}
            </div>

            {/* CART ITEMS END */}

            {/* SUMMARY START */}
            <div className="flex-[1]">
              <div className="text-lg font-bold">Summary</div>

              <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                <div className="flex justify-between">
                  <div className="uppercase text-md md:text-lg font-bold text-black">
                    Total
                  </div>
                  <div className="text-md md:text-lg font-medium text-black">
                    {/* Rs. {totalPrice} */}
                  </div>
                </div>
                <div className="text-sm md:text-md py-5 border-t mt-5">
                  The subtotal reflects the total price of your order, including
                  duties and taxes, before any applicable discounts. It does not
                  include delivery costs and international transaction fees.
                </div>
              </div>

              {/* BUTTON START */}
              <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center">
                Checkout
                {loading && (
                  <Image
                    alt="Spinner"
                    width={100}
                    height={100}
                    src="/spinner.svg"
                  />
                )}
              </button>
              {/* BUTTON END */}
            </div>
            {/* SUMMARY END */}
          </div>
          {/* CART CONTENT END */}
        </>
      ) : (
        <>
          {/* This is empty screen */}
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <Image
              src="/empty-cart.jpg"
              alt="Image"
              width={300}
              height={300}
              className="w-[300px] md:w-[400px]"
            />
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your cart.
              <br />
              Go ahead and explore top categories.
            </span>
            <Link
              href="/"
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
