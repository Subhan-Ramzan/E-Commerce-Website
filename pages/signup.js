//pages/signup.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../app/globals.css";
import Link from "next/link";
import { FaCloudUploadAlt } from "react-icons/fa";
import Image from "next/image";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("user");
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading animation

    try {
      const res = await axios.post("/api/signup", {
        username,
        email,
        password,
        type,
        profileImage: imageUrl,
      });

      // Assuming response contains a success message or status
      toast.success("Account created successfully!"); // Display success toast

      setTimeout(() => {
        router.push("/login");
      }, 300); // Wait for 1 second before redirecting
    } catch (error) {
      setError(
        error.response?.data?.error || "An error occurred during signup"
      );
      toast.error(
        error.response?.data?.error || "An error occurred during signup"
      ); // Display error toast

      setIsSubmitting(false);
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
            public_id: result.public_id, // Ensure to store public_id
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
          <div className="bg-white/10 p-8 shadow-lg rounded-lg mt-4">
            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center mt-6">
                <label
                  htmlFor="uploadImageInput"
                  className={`cursor-pointer rounded-full border-2 border-dashed border-gray-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-blue-500 hover:via-green-500 hover:to-purple-500 transition-all duration-500 ease-in-out flex items-center justify-center w-40 h-40 relative shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    image ? "uploaded" : ""
                  }`}
                >
                  {image ? (
                    <Image
                      src={image}
                      alt="Uploaded Profile"
                      layout="responsive" // Makes the image responsive
                      width={100} // Set the width for the image (in pixels)
                      height={100} // Set the height for the image (in pixels)
                      className="rounded-full object-cover upload-animation" // Keep the rounded shape
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

              {/* Username Field */}
              <div className="relative group">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative group">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative group">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="relative group">
                <button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create account"}
                </button>
              </div>
            </form>
          </div>
          <p className="mt-10 text-center text-sm text-white">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
      <ToastContainer /> {/* Toast Container for notifications */}
    </>
  );
};

export default Signup;
