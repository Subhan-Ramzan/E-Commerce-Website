// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import ClientSessionProvider from "./ClientSessionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooter from "@/components/MobileFooter";
import { ProductProvider } from "@/context/ProductContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "New Fashion - Trendy Online Store",
  description: "Discover the latest trends in fashion and shop for clothing, accessories, and more at New Fashion.",
  keywords: "fashion, online store, clothing, accessories, trendy wear",
  author: "New Fashion Team",
  viewport: "width=device-width, initial-scale=1.0",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSessionProvider>
          <ProductProvider>
            <Navbar />
            {children}
            <MobileFooter />
            <Footer />
          </ProductProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
