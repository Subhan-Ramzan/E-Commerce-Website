"use client";

import { useEffect, useState } from "react";

const ProductCategory = ({ productId, setCategory }) => {
  const [category, setLocalCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/uploadProduct/${productId}`);
        const data = await response.json();
        if (data.category) {
          setLocalCategory(data.category);
          setCategory(data.category); // Pass category to parent component
        }
      } catch (error) {
        console.error("Error fetching product category:", error);
      }
    };

    if (productId) fetchCategory();
  }, [productId, setCategory]);

  if (!category) return null;

  return (
    <div className="text-sm text-gray-500">
      Category: <span className="font-semibold">{category}</span>
    </div>
  );
};

export default ProductCategory;
