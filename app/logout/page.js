
"use client"; 

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/logout');

      console.log(response.data.message);
      // Redirecting to login page
      router.push('/login'); 
    } catch (err) {
      setError(err.response?.data?.error || "Logout failed");
      console.error("Logout Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
