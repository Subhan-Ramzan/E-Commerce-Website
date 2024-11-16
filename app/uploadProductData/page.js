"use client";
import React, { useState, useContext } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ProductContext } from "@/context/ProductContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CldImage, CldUploadWidget } from "next-cloudinary";

const UploadProduct = ({ onClose }) => {
  const { addProduct } = useContext(ProductContext);
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    description: "",
    price: "",
  });
  const [publicIds, setPublicIds] = useState([]); // Multiple images
  const categories = ["Abaya", "Chaddar", "Dupatta", "Hijab", "Niqab"];

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: data.productName,
      brand: data.brandName,
      category: data.category,
      description: data.description,
      price: data.price,
      productImage: publicIds,
    };

    try {
      const response = await fetch("/api/uploadProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        addProduct(result.product);
        onClose(); // Close the modal or perform additional actions
      } else {
        toast.error(result.error || "Failed to upload product.");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Error uploading product. Please try again.");
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-100 text-white bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 ">
      <div className="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] p-4 rounded w-full max-w-2xl h-full max-h-[100%] overflow-auto z-50">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-2xl">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>
        <form
          className="grid p-4 gap-2 overflow-y-auto h-full pb-12"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded text-black"
            required
          />
          <label htmlFor="brandName" className="mt-3">
            Brand Name:
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter Brand Name"
            name="brandName"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded text-black"
            required
          />
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            value={data.category}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded text-black"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <label htmlFor="productImage" className="mt-3">
            Product Images:
          </label>
          <div className="flex flex-col items-center mt-6 w-full ">
            <CldUploadWidget
              uploadPreset="next-image"
              multiple
              onSuccess={({ event, info }) => {
                if (event === "success") {
                  setPublicIds((prev) => [...prev, info.public_id]);
                }
              }}
            >
              {({ open }) => (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 ease-in-out"
                >
                  <FaCloudUploadAlt className="mr-2 text-2xl" />
                  Upload Images
                </button>
              )}
            </CldUploadWidget>

            {/* Image display container with horizontal scrolling */}
            <div className="flex mt-4 gap-4 max-w-full overflow-x-auto whitespace-nowrap">
              {publicIds.map((id) => (
                <div
                  key={id}
                  className="relative w-32 h-32 rounded-lg overflow-hidden shadow-md inline-block"
                >
                  <CldImage
                    src={id}
                    alt="Uploaded Image"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded text-black h-24 mb-3"
            placeholder="Enter product description"
            required
          />
          <label htmlFor="price">Selling Price (PKR):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={data.price}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded text-black mb-3"
            required
          />
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 rounded text-white"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UploadProduct;
