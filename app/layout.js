import { Inter } from "next/font/google";
import "./globals.css";
import ClientSessionProvider from "./ClientSessionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooter from "@/components/MobileFooter";
import { ProductProvider } from "@/context/ProductContext";
import Sidebar from "@/components/app-sidebar";
import SearchBar from "@/components/SearchNavbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Suspense } from "react"; // ✅ Import Suspense for handling hydration

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "New Fashion - Trendy Online Store",
  description:
    "Discover the latest trends in fashion and shop for clothing, accessories, and more at New Fashion.",
  keywords: "fashion, online store, clothing, accessories, trendy wear",
  author: "New Fashion Team",
  icons: {
    icon: "/favicon.ico", 
  },
};

// ✅ Move viewport to a separate export
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="relative">
        <ClientSessionProvider>
          <Sidebar />
          <ProductProvider>
            <Navbar />
            <Suspense fallback={<div>Loading search...</div>}>
              <SearchBar /> {/* ✅ Wrapped SearchBar in Suspense to fix hydration issues */}
            </Suspense>
            <div className="pt-16 max-md:pt-32 min-h-[90vh]">{children}</div>
            <MobileFooter />
            <Footer />
          </ProductProvider>
        </ClientSessionProvider>

        {/* ✅ WhatsApp Floating Button */}
        <WhatsAppButton />
      </body>
    </html>
  );
}
