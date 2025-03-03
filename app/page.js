import Category from "@/components/Category";
import HeroSection from "@/components/HeroSection";
import HomeHeading from "@/components/HomeHeading";
import ProductCard from "@/components/ProductCard";
import { fetchDataFromApi } from "@/utils/api";

// Revalidate every 60 seconds for ISR
export const revalidate = 3600;

// ✅ Dynamic Metadata for SEO
export async function generateMetadata() {
  const products = await fetchDataFromApi("/api/products?populate=*");
  const coverImg = await fetchDataFromApi("/api/cover-images?populate=*");

  const firstProduct = products?.data[0];
  const coverImageData = coverImg?.data[0]?.CoverImage?.data;
  const coverImageUrl = coverImageData?.attributes?.url;
  const fullCoverImageUrl = coverImageUrl
    ? coverImageUrl.startsWith("https://")
      ? coverImageUrl
      : `${API_URL}${coverImageUrl}`
    : "/default-cover.jpg";

  return {
    title: "New Fashion - Trendy Online Store",
    description: "Discover the latest trends in fashion and shop for clothing, accessories, and more at New Fashion.",
    keywords: "fashion, online store, clothing, accessories, trendy wear",
    openGraph: {
      title: "New Fashion - Trendy Online Store",
      description: "Discover the latest trends in fashion and shop for clothing, accessories, and more at New Fashion.",
      images: [
        {
          url: fullCoverImageUrl,
          width: 1200,
          height: 630,
          alt: "New Fashion Cover Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "New Fashion - Trendy Online Store",
      description: "Discover the latest trends in fashion and shop for clothing, accessories, and more at New Fashion.",
      images: [fullCoverImageUrl],
    },
  };
}


export default async function Home() {
  try {
    // Fetching products data
    const products = await fetchDataFromApi("/api/products?populate=*");
    const coverImg = await fetchDataFromApi("/api/cover-images?populate=*");

    // ✅ Structured Data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "New Fashion",
      url: "https://newfashion.vercel.app",
      description: "Discover the latest trends in fashion and shop for clothing, accessories, and more at New Fashion.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://newfashion.vercel.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    };

    return (
      <>
        {/* ✅ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div className="md:min-w-[90vw] w-[95vw] mx-auto">
          <Category />
          {/* Pass the CoverImg data to HeroSection */}
          <HeroSection CoverImages={coverImg?.data[0]?.CoverImage || []} />
          <HomeHeading />
          <ProductCard products={products} />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading the page. Please try again later.</div>;
  }
}