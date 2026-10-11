"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Navbar as HNavbar, NavbarBrand, NavbarContent, NavbarItem,
  Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
} from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import { getBengaliDate } from "@/lib/utils";

export default function Navbar({ categories = [] }) {
  const pathname = usePathname();
  const { user, signOutUser } = useAuth();
  const date = getBengaliDate();

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      {/* Top row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[68px]">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#05893e] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
              <Image
                src="/logo-icon.png" alt="লোগো" width={28} height={28}
                className="object-contain"
                onError={(e) => { e.currentTarget.style.display="none"; e.currentTarget.parentElement.textContent="🛒"; }}
              />
            </div>
            <div className="leading-tight">
              <p className="font-bold text-xl text-gray-900">বাজার দর</p>
              <p className="text-xs text-gray-400">{date}</p>
            </div>
          </Link>

          {/* Auth area */}
          <div className="flex items-center gap-2">
            {user ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                    <Avatar
                      name={user.name}
                      size="sm"
                      className="bg-[#05893e] text-white text-xs font-bold"
                      showFallback
                    />
                    <span className="text-sm font-semibold text-gray-800 hidden sm:block max-w-[100px] truncate">
                      {user.name?.split(" ")[0]}
                    </span>
                    <span className="text-gray-400 text-xs">▾</span>
                  </button>
                </DropdownTrigger>
                <DropdownMenu aria-label="User menu" className="w-56">
                  <DropdownItem key="info" isReadOnly className="opacity-100 cursor-default">
                    <div className="py-1">
                      <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                  </DropdownItem>
                  <DropdownItem key="profile" as={Link} href="/profile" startContent={<span>👤</span>}>
                    আমার প্রোফাইল
                  </DropdownItem>
                  <DropdownItem key="signout" color="danger" startContent={<span>↩</span>} onPress={signOutUser}>
                    সাইন আউট
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <>
                <Button as={Link} href="/sign-in" variant="light" size="sm" className="text-gray-700 font-medium">
                  সাইন ইন
                </Button>
                <Button as={Link} href="/sign-up" size="sm" className="bg-[#05893e] text-white font-medium shadow-sm hover:bg-[#047f39]">
                  সাইন আপ
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Category strip */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 py-2 overflow-x-auto scrollbar-none">
            <Link href="/" className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              pathname === "/" ? "bg-[#05893e] text-white shadow-sm" : "hover:bg-gray-100 text-gray-700"
            }`}>
              <span>🏠</span><span className="hidden sm:inline">হোম</span>
            </Link>
            {categories.map((cat) => {
              const active = pathname.startsWith(`/category/${cat.slug}`) || pathname.startsWith(`/category/${cat.id}`);
              return (
                <Link key={cat.id} href={`/category/${cat.slug}`}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                    active ? "bg-[#05893e] text-white shadow-sm" : "hover:bg-gray-100 text-gray-700"
                  }`}>
                  <span>{cat.icon}</span><span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
