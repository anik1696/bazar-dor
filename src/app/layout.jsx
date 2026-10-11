import "./globals.css";
import { Inter } from "next/font/google";
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PriceTicker from "@/components/PriceTicker";
import { getAllCategories, getAllProducts } from "@/lib/api";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "বাজার দর | আজকের বাজারের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বাজারভিত্তিক দাম।",
};

export default async function RootLayout({ children }) {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <html lang="bn" className="light">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#f0f5f0]`}>
        <HeroUIProvider>
          <AuthProvider>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: { borderRadius: "12px", fontSize: "14px" },
                success: { style: { background: "#f3fbf4", color: "#1d271f", border: "1px solid #1a9951" } },
                error:   { style: { background: "#fff6f5", color: "#1d271f", border: "1px solid #d03739" } },
              }}
            />
            <Navbar categories={categories} />
            <PriceTicker products={products} />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </AuthProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
