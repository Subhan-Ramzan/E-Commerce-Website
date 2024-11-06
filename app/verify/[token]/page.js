"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const VerifyPage = ({ params }) => {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (params.token) {
            setToken(params.token); // Set the token from the route params
        }
    }, [params.token]);

    const handleSubmit = async () => {
        if (!token) return; // Check if the token is available

        setIsLoading(true); // Start loading state
        try {
            const res = await axios.post('/api/verify', { token });
            setSuccess(res.data.message || 'Verification successful!');
            setError(null); // Clear any previous errors
            router.push('/login');
        } catch (error) {
            setError('Token is expired or invalid.');
            setSuccess(null); // Clear any previous success message
        } finally {
            setIsLoading(false); // End loading state
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-xl font-bold mb-4">Email Verification</h1>
            <button
                onClick={handleSubmit}
                className={`bg-green-500 p-3 rounded-lg text-white ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
            >
                {isLoading ? "Verifying..." : "Verify Email"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
    );
};

export default VerifyPage;
