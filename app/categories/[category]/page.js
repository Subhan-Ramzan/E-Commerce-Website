import Category from "./Category";
import { fetchDataFromApi } from "@/utils/api";

// Generate static paths for categories
export async function generateStaticParams() {
  const category = await fetchDataFromApi("/api/categories?populate=*");

  if (!category || !category.data) {
    return []; // Return an empty array to avoid the error
  }

  const params = category.data.map((c) => ({
    category: c.slug,
  }));

  return params;
}

// Generate metadata for categories
export async function generateMetadata({ params }) {
  // Await params before accessing
  const par = await params;
  const category = await fetchDataFromApi(
    `/api/categories?filters[slug][$eq]=${par?.category}` // Use "category" here
  );

  return {
    title: category?.data?.[0]?.name || "Category",
  };
}

// Render the CategoryPage
export default async function CategoryPage({ params }) {
  // Await the category param to ensure it's available
  const { category } = params; // This will now work correctly
  const categoryData = await fetchDataFromApi(
    `/api/categories?filters[slug][$eq]=${category}` // Use "category" here
  );

  // Fetch all products if no category found
  const products = await fetchDataFromApi(
    `/api/products?populate=*&pagination[page]=1&pagination[pageSize]=6`
  );

  // Handle no category found
  if (!categoryData?.data?.length) {
    return (
      <div className="w-full min-h-[80vh]">
        <div className="bg-red-100 text-red-600 p-4 text-center font-medium">
          Category &apos;{category}&apos; not found. Showing all available
          products.
        </div>
        <Category initialCategory={""} initialProducts={products} slug="" />
      </div>
    );
  }

  return (
    <Category
      initialCategory={categoryData}
      initialProducts={products}
      slug={category}
    />
  );
}
