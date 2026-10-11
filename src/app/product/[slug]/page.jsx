"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import { toBn, unitLong, unitShort } from "@/lib/utils";
import toast from "react-hot-toast";

function ProductContent() {
  const { slug } = useParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("পণ্যের বিস্তারিত দেখতে সাইন ইন করুন।");
      router.push(`/sign-in?from=/product/${slug}`);
    }
  }, [user, authLoading, slug, router]);

  useEffect(() => {
    if (!slug || !user) return;
    fetch(`/api/products/${slug}`)
      .then((r) => { if (!r.ok) { setNotFound(true); return null; } return r.json(); })
      .then((d) => { if (d) setProduct(d); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug, user]);

  if (authLoading || (!user && !authLoading)) {
    return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-4 border-[#05893e] border-t-transparent rounded-full animate-spin" /></div>;
  }
  if (loading) return <Skeleton />;
  if (notFound || !product) return (
    <div className="max-w-2xl mx-auto px-4 py-20 flex flex-col items-center gap-5 text-center">
      <div className="text-6xl">😕</div>
      <h1 className="text-2xl font-bold text-gray-900">পণ্যটি পাওয়া যায়নি</h1>
      <p className="text-gray-400 text-sm">এই পণ্যের কোনো তথ্য নেই।</p>
      <Button as={Link} href="/" className="bg-[#05893e] text-white rounded-xl px-6">← হোম পেজে ফিরে যান</Button>
    </div>
  );

  const up = product.change?.dir === "up", down = product.change?.dir === "down";
  const sym = up ? "▲" : down ? "▼" : "—";
  const markets = (product.markets || []).map((m) => ({ ...m, avg: ((m.min + m.max) / 2) }));
  const mins = markets.map((m) => m.min);
  const maxs = markets.map((m) => m.max);
  const globalMin = mins.length ? Math.min(...mins) : product.today;
  const globalMax = maxs.length ? Math.max(...maxs) : product.today;
  const globalAvg = markets.length ? Math.round(markets.reduce((s,m) => s+m.avg,0)/markets.length) : product.today;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
        <Link href="/" className="hover:text-[#05893e]">হোম</Link>
        <span>›</span>
        <Link href={`/category/${product.category}`} className="hover:text-[#05893e]">{product.categoryNameBn}</Link>
        <span>›</span>
        <span className="text-gray-700 font-medium truncate">{product.nameBn}</span>
      </nav>

      {/* Header card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-4xl shrink-0">
            {product.image || product.categoryIcon}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">{product.nameBn}</h1>
            <p className="text-sm text-gray-400 mt-1">{unitLong(product.unit)} · {product.categoryNameBn}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Chip size="sm" variant="flat" color={up?"success":down?"danger":"default"}>
                {sym} {toBn(product.change?.pct ?? 0)}%
              </Chip>
              <span className={`text-sm ${up?"text-green-600":down?"text-red-500":"text-gray-400"}`}>
                গতকালের তুলনায় {toBn(Math.abs(product.today - product.yesterday))} টাকা {up?"বেড়েছে":down?"কমেছে":"অপরিবর্তিত"}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <p className="text-xs text-gray-400">আজকের দাম</p>
            <p className="text-3xl font-extrabold text-gray-900 leading-tight">{toBn(product.today)}</p>
            <p className="text-sm text-gray-400">টাকা / {unitShort(product.unit)}</p>
          </div>
        </div>
      </div>

      {/* Summary + Market table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-lg mb-4">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: "সর্বনিম্ন দাম", val: globalMin, sub: "সবচেয়ে কম", color: "text-gray-900", bg: "bg-gray-50 border border-gray-100" },
              { label: "সর্বাধিক দাম", val: globalMax, sub: "সবচেয়ে বেশি", color: "text-gray-900", bg: "bg-gray-50 border border-gray-100" },
              { label: "গড় দাম",        val: globalAvg, sub: "গড় হিসাব",    color: "text-[#05893e]", bg: "bg-green-50 border border-green-100" },
            ].map(({ label, val, sub, color, bg }) => (
              <div key={label} className={`rounded-xl p-3 sm:p-4 text-center ${bg}`}>
                <p className="text-xs text-gray-400 mb-1">{label}</p>
                <p className={`text-base sm:text-xl font-bold ${color}`}>{toBn(val)} টাকা</p>
                <p className="text-xs text-gray-400 mt-1">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {markets.length > 0 && (
          <div className="p-5 sm:p-6">
            <h2 className="font-bold text-gray-900 text-lg mb-4">বাজারভিত্তিক আজকের দাম</h2>
            <Table
              aria-label="বাজার দাম"
              shadow="none"
              classNames={{ wrapper: "p-0 border border-gray-200 rounded-xl", th: "bg-gray-50 text-gray-600 text-xs font-semibold" }}
            >
              <TableHeader>
                <TableColumn>বাজার</TableColumn>
                <TableColumn>বিভাগ</TableColumn>
                <TableColumn className="text-right">সর্বনিম্ন</TableColumn>
                <TableColumn className="text-right">সর্বাধিক</TableColumn>
                <TableColumn className="text-right">গড়</TableColumn>
              </TableHeader>
              <TableBody>
                {markets.map((m, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-sm text-gray-900">{m.market}</TableCell>
                    <TableCell className="text-sm text-gray-400">{m.division}</TableCell>
                    <TableCell className="text-sm text-right text-gray-700">{toBn(m.min)} টাকা</TableCell>
                    <TableCell className="text-sm text-right text-gray-700">{toBn(m.max)} টাকা</TableCell>
                    <TableCell className="text-sm text-right font-bold text-[#05893e]">{toBn(m.avg.toFixed(2))} টাকা</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <div className="text-center pb-4">
        <Link href={`/category/${product.category}`} className="text-sm text-[#05893e] hover:underline">
          ← {product.categoryNameBn} বিভাগে ফিরে যান
        </Link>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-48" />
      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-5">
        <div className="w-20 h-20 bg-gray-200 rounded-2xl shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-gray-200 rounded w-48" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
        <div className="space-y-2"><div className="h-8 bg-gray-200 rounded w-20"/><div className="h-4 bg-gray-200 rounded w-16"/></div>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <div className="h-5 bg-gray-200 rounded w-32"/>
        <div className="grid grid-cols-3 gap-4">{[1,2,3].map(i=><div key={i} className="h-24 bg-gray-200 rounded-xl"/>)}</div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return <Suspense fallback={<Skeleton />}><ProductContent /></Suspense>;
}
