// pages/search.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchResults = () => {
  const router = useRouter();
  const { query } = router.query; // Get the search term from the URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (query) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
          const data = await response.json();
          setProducts(data); // Set the fetched products
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      fetchProducts();
    }
  }, [query]);

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
