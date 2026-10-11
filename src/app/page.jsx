import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Chip } from "@heroui/react";
import { getAllProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { toBn } from "@/lib/utils";

export const metadata = { title: "হোম | বাজার দর" };

export default async function HomePage() {
  const products = await getAllProducts();

  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-10">

      {/* ── HERO ── */}
      <section className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 sm:p-10">
          <div className="flex-1 space-y-4">
            <Chip size="sm" variant="flat" className="bg-green-100 text-[#05893e] font-semibold text-xs">
              📅 আজকের বাজার আপডেট
            </Chip>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-sm sm:text-base text-gray-500 max-w-lg leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন ও দামের পরিবর্তন এক জায়গায়।
            </p>
            <Button
              as="a" href="#সব-পণ্য"
              className="bg-[#05893e] text-white font-semibold shadow-sm hover:bg-[#047f39] rounded-xl px-6"
              size="lg"
            >
              সব পণ্য দেখুন ↓
            </Button>
          </div>
          <div className="w-full md:w-auto flex justify-center shrink-0">
            <Image
              src="/bazar-hero.png" alt="বাজার দর" width={260} height={200}
              className="object-contain rounded-2xl max-h-52" priority
            />
          </div>
        </div>
      </section>

      {/* ── দাম বেড়েছে ── */}
      {risers.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-green-600">▲</span>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">আজ দাম বেড়েছে</h2>
            <Chip size="sm" variant="flat" className="bg-green-50 text-green-700 ml-auto text-xs">{toBn(risers.length)}টি পণ্য</Chip>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {risers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* ── দাম কমেছে ── */}
      {fallers.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-red-500">▼</span>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">আজ দাম কমেছে</h2>
            <Chip size="sm" variant="flat" className="bg-red-50 text-red-600 ml-auto text-xs">{toBn(fallers.length)}টি পণ্য</Chip>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {fallers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* ── সব পণ্য ── */}
      <section id="সব-পণ্য">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">সব পণ্য</h2>
          <span className="text-sm text-gray-400">— আজকের বাজারদর</span>
          <Chip size="sm" variant="flat" className="bg-gray-100 text-gray-600 ml-auto text-xs">মোট {toBn(products.length)}টি</Chip>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

    </div>
  );
}
