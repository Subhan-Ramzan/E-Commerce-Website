// app/protected/page.js
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axios.get("/api/protected", {
          withCredentials: true, // Allows sending cookies with request
        });

        setUserData(response.data.user);
      } catch (error) {
        console.error("Failed to fetch protected data:", error);
        router.push("/login");
      }
    };

    fetchProtectedData();
  }, [router]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <p>Welcome, {userData.username}!</p>
    </div>
  );
}
