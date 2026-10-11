import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center gap-6">
      <div className="text-7xl">😕</div>
      <div className="space-y-2">
        <h1 className="text-5xl font-extrabold text-gray-900">৪০৪</h1>
        <p className="text-xl font-bold text-gray-800">পেজটি পাওয়া যায়নি</p>
        <p className="text-gray-400 text-sm max-w-sm mx-auto">
          আপনি যে পেজটি খুঁজছেন তা সরানো হয়েছে বা বিদ্যমান নেই।
        </p>
      </div>
      <Button as={Link} href="/" className="bg-[#05893e] text-white font-semibold rounded-xl px-8" size="lg">
        ← হোম পেজে ফিরে যান
      </Button>
    </div>
  );
}
