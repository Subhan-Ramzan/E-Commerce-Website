// pages/signup.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../app/globals.css";
import Link from "next/link";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("user"); // Added type state
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/signup", {
        username,
        email,
        password,
        type, // Send type to the API
      });
      console.log(res.data); // Optional: handle success message
      router.push("/login"); // Redirect to login page after signup
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] px-4 py-8">
        <Link href="/">
          <span className="text-4xl font-bold text-white hover:text-gray-300 transition duration-300 text-center">
            <span className="text-blue-400">&lt;</span>
            New
            <span className="text-blue-400">Fashion/&gt;</span>
          </span>
        </Link>
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-center text-3xl font-bold text-white">
            Create an account
          </h2>
          <div className="bg-white/10 backdrop-blur-lg p-8 shadow-lg rounded-lg mt-4">
            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter a Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white/20 text-white placeholder-white/50"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter an Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white/20 text-white placeholder-white/50"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white/20 text-white placeholder-white/50"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
          <p className="mt-6 text-center text-sm text-white">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-blue-400 hover:text-blue-300 transition duration-200"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
