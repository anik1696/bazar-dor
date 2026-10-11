"use client";
import React from "react";
import Link from "next/link";
import { toBn, formatPricePerUnit } from "@/lib/utils";

export default function PriceTicker({ products = [] }) {
  if (!products.length) return null;

  function Item({ p }) {
    const up = p.change?.dir === "up", down = p.change?.dir === "down";
    const sym = up ? "▲" : down ? "▼" : "—";
    const cls = up ? "text-green-600" : down ? "text-red-500" : "text-gray-400";
    return (
      <Link href={`/product/${p.slug}`}
        className="flex items-center gap-2 px-4 border-r border-gray-100 hover:bg-gray-50 transition-colors shrink-0 h-9">
        <span className="text-base leading-none">{p.image || p.categoryIcon}</span>
        <span className="text-xs sm:text-sm font-medium text-gray-800 whitespace-nowrap">{p.nameBn}</span>
        <span className="text-xs text-gray-400 whitespace-nowrap">{formatPricePerUnit(p.today, p.unit)}</span>
        <span className={`text-xs font-bold whitespace-nowrap ${cls}`}>{sym} {toBn(p.change?.pct ?? 0)}%</span>
      </Link>
    );
  }

  return (
    <div className="w-full bg-white border-b border-gray-200 overflow-hidden">
      <div className="flex animate-marquee w-max">
        <div className="flex items-center">{products.map((p, i) => <Item key={`a${i}`} p={p} />)}</div>
        <div className="flex items-center" aria-hidden>{products.map((p, i) => <Item key={`b${i}`} p={p} />)}</div>
      </div>
    </div>
  );
}
