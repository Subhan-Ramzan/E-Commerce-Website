import Category from "./Category";
import { fetchDataFromApi } from "@/utils/api";

// Function to fetch data safely with error handling
async function safeFetchData(endpoint) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`);
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Invalid JSON response:", text);
      return null;
    }
  } catch (error) {
    console.error("API Fetch Error:", error);
    return null;
  }
}

// Generate static paths for categories
export async function generateStaticParams() {
  const category = await safeFetchData("/api/categories?populate=*");

  if (!category || !category.data) {
    console.error("No category data found");
    return []; // Return an empty array to avoid errors
  }

  return category.data.map((c) => ({ category: c.slug }));
}

// Generate metadata for categories
export async function generateMetadata({ params }) {
  if (!params?.category) return { title: "Category" };
  
  const category = await safeFetchData(
    `/api/categories?filters[slug][$eq]=${params.category}`
  );

  return {
    title: category?.data?.[0]?.name || "Category",
  };
}

// Render the CategoryPage
export default async function CategoryPage({ params }) {
  if (!params?.category) {
    console.error("Missing category param");
    return (
      <div className="w-full min-h-[80vh] text-center p-4">
        <div className="bg-red-100 text-red-600 p-4 font-medium">
          No category specified.
        </div>
      </div>
    );
  }

  const categoryData = await safeFetchData(
    `/api/categories?filters[slug][$eq]=${params.category}`
  );

  // Fetch all products if no category is found
  const products = await safeFetchData(
    `/api/products?populate=*&pagination[page]=1&pagination[pageSize]=6`
  );

  if (!categoryData?.data?.length) {
    console.warn(`Category \u0027${params.category}\u0027 not found.`);
    return (
      <div className="w-full min-h-[80vh]">
        <div className="bg-red-100 text-red-600 p-4 text-center font-medium">
          Category &apos;{params.category}&apos; not found. Showing all available products.
        </div>
        <Category initialCategory={""} initialProducts={products} slug="" />
      </div>
    );
  }

  return (
    <Category
      initialCategory={categoryData}
      initialProducts={products}
      slug={params.category}
    />
  );
}
