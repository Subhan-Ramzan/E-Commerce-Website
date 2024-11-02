"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import Image from "next/image";

const Signup = () => {
  const [imageUrl, setImageUrl] = useState(""); // Initialize imageUrl first
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    profileImage: imageUrl, // Use imageUrl from state
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    const checkSessionOrCookie = async () => {
      try {
        // Check if session exists
        if (sessionStatus === "authenticated") {
          router.push("/read");
          return;
        }

        // Check if cookie is present by making a request
        const response = await axios.get("/api/protected", {
          withCredentials: true,
        });

        if (response.status === 200 && response.data?.user) {
          router.push("/profile");
        }
      } catch (error) {
        // If no session or cookie, remain on the login page
        console.log("No session or cookie found.");
      }
    };

    checkSessionOrCookie();
  }, [sessionStatus, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = { ...form, profileImage: imageUrl }; // `imageUrl` is now an object
      const response = await axios.post("/api/signup", formData);
      setSuccess("Signup successful");
      setError(null);
      toast.success("Account created successfully!");
      router.push("/verify");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred");
      } else {
        setError("An error occurred. Please try again.");
      }
      setLoading(false);
      setSuccess(null);
    }
  };

  const handleFileChange = async (e) => {
    const selectedImage = e.target.files[0];
    if (
      selectedImage &&
      selectedImage.type.startsWith("image/") &&
      selectedImage.size <= 5 * 1024 * 1024
    ) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          setImageUrl({
            url: result.url,
            public_id: result.public_id,
          });
          setImage(result.url);
          toast.success("Image uploaded successfully!");
        } else {
          toast.error(result.error || "Failed to upload image.");
        }
      } catch (error) {
        toast.error("Error uploading image. Please try again.");
      }
    } else {
      toast.error("Please upload a valid image file (max size: 5MB)");
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up | Subhan Ramzan Portfolio</title>
        <meta
          name="description"
          content="Create your account on Subhan Ramzan's portfolio. Join now to access exclusive features, manage your projects, and connect with the community."
        />
        <meta name="robots" content="noindex" />{" "}
        {/* Prevent indexing if desired */}
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Create Your Account" />
        <meta
          property="og:description"
          content="Join Subhan Ramzan's community by signing up. Access exclusive features and manage your projects."
        />
        <meta property="og:url" content="https://subhanramzan.com/signup" />
        <meta property="og:type" content="website" />
      </Head>

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
              <div className="flex flex-col items-center mt-6">
                <label
                  htmlFor="uploadImageInput"
                  className={`cursor-pointer rounded-full relative w-40 h-40 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    image
                      ? ""
                      : "border-2 border-dashed border-gray-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-blue-500 hover:via-green-500 hover:to-purple-500 transition-all duration-500 ease-in-out"
                  }`}
                >
                  {image ? (
                    <Image
                      src={image}
                      alt="Uploaded Profile"
                      layout="fill" // Fills the entire container
                      className="rounded-full object-cover" // Ensures it stays circular and covers fully
                    />
                  ) : (
                    <div className="flex flex-col items-center text-white">
                      <FaCloudUploadAlt className="text-6xl mb-2 opacity-80" />
                      <p className="text-sm font-semibold opacity-90">
                        Upload Profile Image
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="uploadImageInput"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </div>

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
                    name="username"
                    placeholder="Enter a Username"
                    value={form.username}
                    onChange={handleChange}
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
                    name="email"
                    placeholder="Enter an Email"
                    value={form.email}
                    onChange={handleChange}
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
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white/20 text-white placeholder-white/50"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                    loading ? "cursor-not-allowed bg-gray-400" : ""
                  }`}
                  disabled={loading} // Disable button when loading
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0a12 12 0 00-12 12h4z"
                        />
                      </svg>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
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
    </>
  );
};

export default Signup;
