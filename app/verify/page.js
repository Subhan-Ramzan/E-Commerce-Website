"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/navigation";

export default function VerifyPage() {
    const [value, setValue] = useState('');  // To store token value
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);  // To control button disable state
    const router = useRouter()

    const handleChange = (e) => {
        const token = e.target.value
        setValue(token)
        setIsButtonEnabled(token.length === 64 ? true : false)
    }

    const handleSubmit = async () => {
        try {
            if (isButtonEnabled) {
                const response = await axios.post('/api/verify', { token: value })
                console.log(response.data);
                router.push('/login')
            }
            else {
                alert('Enter a token value of your Gmail');
            }
        } catch (error) {
            console.error('Verification failed', error);
            alert('Verification failed');
        }
    }

    return (
        <div className="p-6 max-w-sm mx-auto">
            <label htmlFor="token" className="block mb-2 text-lg font-medium text-gray-700">
                Token
            </label>
            <input
                id="token"
                placeholder='Enter a Token Value'
                value={value}
                onChange={handleChange}
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleSubmit}
                className={`w-full p-3 text-white rounded-lg ${isButtonEnabled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                    }`}
            >
                Click Verify
            </button>
        </div>
    );
}
