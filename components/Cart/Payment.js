"use client";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCashRegister, FaMobileAlt, FaCreditCard, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

export default function Payment({ onClose, totalPrice }) {
    const subTotal = totalPrice;

    return (
        <div className="fixed w-full h-full bg-black bg-opacity-50 top-0 left-0 flex justify-center items-center z-50 overflow-auto">
            <div className="bg-white h-[100vh] rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-auto relative">
                {/* Header */}
                <div className="flex justify-between bg-slate-900 fixed top-0 left-0 max-w-2xl m-auto right-0 items-center border-b p-3 z-50 text-white">
                    <h1 className="text-2xl font-semibold">Select Payment Method</h1>
                    <div
                        className="text-2xl hover:text-red-600 cursor-pointer"
                        onClick={onClose}
                    >
                        <CgClose />
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="pt-20">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Payment Methods</h2>
                    <div className="flex flex-col space-y-4">
                        {/* Cash on Delivery */}
                        <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-100 cursor-pointer">
                            <div className="flex items-center space-x-3">
                                {/* <FaCashRegister className="text-2xl text-gray-700" /> */}
                                <Image
                                    src="/COD.png"
                                    alt="Cash On Delivery"
                                    width={32}
                                    height={32}
                                    className="object-cover rounded-full mx-auto"
                                />
                                <h2 className="text-lg font-medium">Cash On Delivery</h2>
                            </div>
                            <FaArrowRight className="text-gray-500" />
                        </div>

                        {/* Easy Paisa */}
                        <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-100 cursor-pointer">
                            <div className="flex items-center space-x-3">
                                {/* EasyPaisa Icon */}
                                <Image
                                    src="/Easypaisa.jpg" // Replace with the actual path
                                    alt="Easy Paisa"
                                    width={32} // Width in pixels
                                    height={32} // Height in pixels
                                    className="object-contain"
                                />
                                <h2 className="text-lg font-medium">Easy Paisa</h2>
                            </div>
                            <FaArrowRight className="text-gray-500" />
                        </div>

                        {/* Jazz Cash */}
                        <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-100 cursor-pointer">
                            <div className="flex items-center space-x-3">
                                {/* JazzCash Icon */}
                                <Image
                                    src="/JazzCash2.jpeg"
                                    alt="Jazz Cash"
                                    width={32} // Width in pixels
                                    height={32} // Height in pixels
                                    className="object-contain"
                                />
                                <h2 className="text-lg font-medium">Jazz Cash</h2>
                            </div>
                            <FaArrowRight className="text-gray-500" />
                        </div>

                        {/* Credit/Debit Card */}
                        <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-100 cursor-pointer">
                            <div className="flex items-center space-x-3">
                                <FaCreditCard className="text-2xl text-blue-600" />
                                <h2 className="text-lg font-medium">Credit/Debit Card</h2>
                            </div>
                            <FaArrowRight className="text-gray-500" />
                        </div>
                    </div>
                </div>

                {/* Subtotal and Total */}
                <div className="flex flex-col bg-slate-50 mt-4 max-w-2xl m-auto fixed bottom-0 left-0 right-0 p-4">
                    <div className="flex justify-between items-center text-lg font-semibold text-gray-900 mb-2">
                        <span>Sub Total</span>
                        <span className="font-medium">
                            {`₨. ${subTotal.toLocaleString()}`}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-semibold text-gray-900">
                        <span>Total Amount</span>
                        <span className="text-blue-600 font-bold">
                            {`₨. ${totalPrice.toLocaleString()}`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
