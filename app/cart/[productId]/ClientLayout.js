"use client";

import { useState, useEffect } from "react";
import ProductCategory from "@/components/Cart/ProductCategory";

const ClientLayout = ({ productId, children }) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    // Fetch category client-side if needed
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/uploadProduct/${productId}`);
        const data = await response.json();
        setCategory(data.category);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    if (productId) fetchCategory();
  }, [productId]);

  return (
    <div>
      <ProductCategory category={category} />
      {children}
    </div>
  );
};

export default ClientLayout;
