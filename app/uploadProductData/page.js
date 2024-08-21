//app/uploadProductData/page.js
"use client";
import React, { useState, useContext } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ProductContext } from "@/context/ProductContext";

const UploadProduct = ({ onClose }) => {
  const { addProduct } = useContext(ProductContext);
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    description: "",
    price: "",
  });
  const [imageUrl, setImageUrl] = useState("");

  const categories = ["Abaya", "Chaddar", "Dupatta", "Hijab", "Niqab"];

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          setImageUrl(result.url);
          alert("Image uploaded successfully!");
        } else {
          alert(result.error || "Failed to upload image.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: data.productName,
      brand: data.brandName,
      category: data.category,
      description: data.description,
      price: data.price,
      images: imageUrl ? [{ url: imageUrl, public_id: "example_public_id" }] : [], // Replace "example_public_id" if needed
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
        alert(result.message);
        addProduct(result.product);
        onClose(); // Close the modal or perform additional actions
      } else {
        alert(result.error || "Failed to upload product.");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Error uploading product. Please try again.");
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-100 text-white bg-opacity-35 py-7 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] p-4 rounded w-full max-w-2xl h-full max-h-[90%] overflow-hidden">
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
            Product Image:
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded text-black h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </div>
          </label>
          <div className="h-28">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Uploaded"
                className="h-full w-auto inline-block mr-2"
              />
            )}
          </div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded text-black h-36"
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
            className="p-2 bg-slate-100 border rounded text-black"
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
    </div>
  );
};

export default UploadProduct;
