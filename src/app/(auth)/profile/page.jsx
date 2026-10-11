"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, Avatar } from "@heroui/react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, isLoading, signOutUser } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!isLoading && !user) router.replace("/sign-in"); }, [user, isLoading, router]);

  if (isLoading || !user) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 border-4 border-[#05893e] border-t-transparent rounded-full animate-spin"/></div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-400 mt-1">আপনার অ্যাকাউন্টের তথ্য।</p>
      </div>

      {/* User card */}
      <Card shadow="none" className="border border-gray-200 bg-white">
        <CardBody className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar name={user.name} className="w-16 h-16 text-xl bg-[#05893e] text-white font-bold" showFallback />
            <div className="flex-1 min-w-0">
              <p className="text-xl font-bold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button as={Link} href="/profile/update" variant="bordered" size="sm" radius="lg"
                className="border-gray-200 text-gray-700 hover:border-[#05893e] hover:text-[#05893e]">
                ✏️ তথ্য আপডেট
              </Button>
              <Button onPress={signOutUser} variant="bordered" size="sm" radius="lg"
                className="border-red-200 text-red-500 hover:bg-red-50">
                ↩ সাইন আউট
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Info table */}
      <Card shadow="none" className="border border-gray-200 bg-white overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <h2 className="font-bold text-gray-900">তথ্য</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {[["পুরো নাম", user.name], ["ইমেইল", user.email], ["অ্যাকাউন্ট আইডি", user.id]].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between px-5 py-3.5">
              <span className="text-sm text-gray-400">{k}</span>
              <span className="text-sm font-semibold text-gray-800 truncate max-w-[200px]">{v}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
