"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input, Card, CardBody } from "@heroui/react";
import { useAuth } from "@/context/AuthContext";

export default function UpdateProfilePage() {
  const { user, isLoading, updateProfileName } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/sign-in");
    if (user) setName(user.name || "");
  }, [user, isLoading, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    const ok = await updateProfileName(name.trim());
    setSubmitting(false);
    if (ok) router.replace("/profile");
  }

  if (isLoading || !user) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 border-4 border-[#05893e] border-t-transparent rounded-full animate-spin"/></div>;

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">তথ্য আপডেট করুন</h1>
        <p className="text-sm text-gray-400 mt-1">আপনার প্রদর্শন নাম পরিবর্তন করুন।</p>
      </div>

      <Card shadow="none" className="border border-gray-200 bg-white">
        <CardBody className="p-6 sm:p-8 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="নাম"
              placeholder="আপনার নাম লিখুন"
              value={name}
              onValueChange={setName}
              variant="bordered"
              radius="lg"
              isRequired
            />
            <Button
              type="submit" fullWidth isLoading={submitting}
              isDisabled={!name.trim()}
              className="bg-[#05893e] text-white font-semibold rounded-xl h-11"
            >
              {!submitting && "আপডেট করুন"}
            </Button>
          </form>
          <div className="text-center">
            <Link href="/profile" className="text-sm text-gray-400 hover:text-[#05893e] transition-colors">← প্রোফাইলে ফিরে যান</Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
