"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Select, SelectItem, Chip, Button } from "@heroui/react";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import { toBn, sortProducts } from "@/lib/utils";

function CategoryContent() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [sort, setSort] = useState(new Set(["default"]));

  useEffect(() => {
    if (!slug) return;
    setLoading(true); setNotFound(false);
    Promise.all([
      fetch(`/api/categories/${slug}`),
      fetch(`/api/products?category=${slug}`),
    ]).then(async ([cRes, pRes]) => {
      if (!cRes.ok) { setNotFound(true); setLoading(false); return; }
      const [cat, prods] = await Promise.all([cRes.json(), pRes.json()]);
      setCategory(cat);
      setProducts(Array.isArray(prods) ? prods : []);
    }).catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const sortKey = [...sort][0];
  const sorted = sortProducts(products, sortKey);

  if (loading) return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <div className="bg-white border border-gray-200 rounded-2xl p-5 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-gray-200 rounded w-32" />
            <div className="h-3 bg-gray-200 rounded w-48" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    </div>
  );

  if (notFound || !category) return (
    <div className="max-w-2xl mx-auto px-4 py-20 flex flex-col items-center text-center gap-6">
      <div className="text-6xl">😕</div>
      <h1 className="text-2xl font-bold text-gray-900">বিভাগটি পাওয়া যায়নি</h1>
      <p className="text-gray-500 text-sm">এই বিভাগের কোনো তথ্য নেই।</p>
      <Button as={Link} href="/" className="bg-[#05893e] text-white rounded-xl px-6">← হোম পেজে ফিরে যান</Button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-2xl">{category.icon}</div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{category.nameBn}</h1>
            <p className="text-sm text-gray-400">{toBn(products.length)}টি পণ্যের আজকের দাম</p>
          </div>
        </div>
      </div>

      {/* Sort bar */}
      <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3 flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-gray-400">মোট {toBn(products.length)}টি পণ্য</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">সাজান:</span>
          <Select
            size="sm"
            selectedKeys={sort}
            onSelectionChange={setSort}
            className="w-52"
            classNames={{ trigger: "border-gray-200 bg-white rounded-xl h-9 text-sm", value: "text-sm" }}
          >
            <SelectItem key="default">ডিফল্ট</SelectItem>
            <SelectItem key="price-asc">দাম: কম থেকে বেশি</SelectItem>
            <SelectItem key="price-desc">দাম: বেশি থেকে কম</SelectItem>
          </Select>
        </div>
      </div>

      {/* Grid / empty */}
      {sorted.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="text-5xl">📭</div>
          <p className="text-gray-400 text-sm">এই বিভাগে কোনো পণ্য নেই।</p>
          <Button as={Link} href="/" className="bg-[#05893e] text-white rounded-xl px-6">← হোম পেজে ফিরে যান</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {sorted.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </div>
    }>
      <CategoryContent />
    </Suspense>
  );
}
