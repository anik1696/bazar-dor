import React from "react";
import Link from "next/link";
import { Card, CardBody, Chip } from "@heroui/react";
import { toBn, formatPrice, unitLong } from "@/lib/utils";

export function ChangeBadge({ change }) {
  if (!change) return null;
  const up = change.dir === "up";
  const down = change.dir === "down";
  const sym = up ? "▲" : down ? "▼" : "—";
  const color = up ? "success" : down ? "danger" : "default";

  return (
    <Chip size="sm" color={color} variant="flat" className="text-xs font-bold h-6">
      {sym} {toBn(change.pct ?? 0)}%
    </Chip>
  );
}

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <Link href={`/product/${product.slug}`} className="block group">
      <Card
        isPressable
        shadow="none"
        className="border border-gray-200 hover:border-[#05893e]/40 hover:shadow-md transition-all duration-200 h-full bg-white"
      >
        <CardBody className="p-4 flex flex-col gap-3 h-full">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform border border-gray-100">
              {product.image || product.categoryIcon || "🛒"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-[#05893e] transition-colors">
                {product.nameBn}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{unitLong(product.unit)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">আজকের দাম</p>
              <p className="font-bold text-gray-900 text-sm sm:text-base">{formatPrice(product.today)}</p>
            </div>
            <ChangeBadge change={product.change} />
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card shadow="none" className="border border-gray-200 bg-white">
      <CardBody className="p-4 animate-pulse">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
        <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
          <div className="space-y-1.5">
            <div className="h-3 bg-gray-200 rounded w-14" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
          <div className="h-6 bg-gray-200 rounded-full w-16" />
        </div>
      </CardBody>
    </Card>
  );
}
