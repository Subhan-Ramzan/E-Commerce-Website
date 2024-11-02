"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

export default function OTPpage() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const router = useRouter();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    setIsButtonEnabled(newOtp.every(digit => digit !== ""));

    if (element.value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      setIsButtonEnabled(true);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isButtonEnabled) {
        const otpValue = otp.join("");
        const response = await axios.post("/api/verify-otp", { otp: otpValue }); // send OTP as 'otp'
        router.push("/login");
      } else {
        alert("Please enter a valid OTP");
      }
    } catch (error) {
      console.error("Verification failed", error);
      alert("Verification failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Enter OTP</h2>
        <div className="flex justify-center space-x-2 mb-6" onPaste={handlePaste}>
          {otp.map((data, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              className="w-12 h-12 text-center text-2xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!isButtonEnabled}
          className={`w-full py-3 text-white font-semibold rounded-lg transition-colors ${
            isButtonEnabled
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
