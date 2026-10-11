"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, Card, CardBody, Divider } from "@heroui/react";
import { useAuth } from "@/context/AuthContext";

function SignInForm() {
  const { user, isLoading, signInWithCredentials, signInSocial } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { if (!isLoading && user) router.replace(from); }, [user, isLoading, router, from]);

  async function handleSubmit(e) {
    e.preventDefault(); setError("");
    if (!email || !password) { setError("ইমেইল ও পাসওয়ার্ড দিন।"); return; }
    if (password.length < 6) { setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষর।"); return; }
    setSubmitting(true);
    const ok = await signInWithCredentials(email, password);
    setSubmitting(false);
    if (ok) router.replace(from); else setError("ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
  }

  async function handleSocial(provider) {
    // Pass callbackURL so BetterAuth redirects back here after OAuth
    // The browser navigates away to Google/GitHub — no need to call router.replace
    await signInSocial(provider, from);
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10 bg-[#f0f5f0]">
      <div className="w-full max-w-md space-y-5">
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">সাইন ইন</h1>
          <p className="text-sm text-gray-500">বিস্তারিত দাম ও বাজার তুলনা দেখতে লগইন করুন।</p>
        </div>

        <Card shadow="none" className="border border-gray-200 bg-white">
          <CardBody className="p-6 sm:p-8 space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-2.5 text-sm">⚠️ {error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="ইমেইল" type="email" placeholder="you@example.com"
                value={email} onValueChange={setEmail}
                variant="bordered" radius="lg" classNames={{ input: "text-sm" }}
                isRequired
              />
              <Input
                label="পাসওয়ার্ড" type="password" placeholder="কমপক্ষে ৬ অক্ষর"
                value={password} onValueChange={setPassword}
                variant="bordered" radius="lg" classNames={{ input: "text-sm" }}
                isRequired
              />
              <Button
                type="submit" fullWidth isLoading={submitting}
                className="bg-[#05893e] text-white font-semibold rounded-xl h-11"
              >
                {!submitting && "সাইন ইন"}
              </Button>
            </form>

            <div className="flex items-center gap-3">
              <Divider className="flex-1" />
              <span className="text-xs text-gray-400">অথবা</span>
              <Divider className="flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="bordered" radius="lg" onPress={() => handleSocial("google")}
                className="border-gray-200 text-gray-700 text-sm font-medium gap-2">
                <svg width="16" height="16" viewBox="0 0 48 48"><path d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 13 4 24s8.9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" fill="#FFC107"/><path d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" fill="#FF3D00"/><path d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A11.9 11.9 0 0124 36c-5.3 0-9.8-3.4-11.4-8.2L6 32.8C9.5 39.6 16.2 44 24 44z" fill="#4CAF50"/><path d="M43.6 20.1H42V20H24v8h11.3a12 12 0 01-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" fill="#1976D2"/></svg>
                Google
              </Button>
              <Button variant="bordered" radius="lg" onPress={() => handleSocial("github")}
                className="border-gray-200 text-gray-700 text-sm font-medium gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </Button>
            </div>

            <p className="text-sm text-center text-gray-500">
              অ্যাকাউন্ট নেই?{" "}
              <Link href="/sign-up" className="text-[#05893e] font-semibold hover:underline">সাইন আপ করুন</Link>
            </p>
          </CardBody>
        </Card>

        <div className="text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-[#05893e] transition-colors">← হোম পেজে ফিরে যান</Link>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[70vh]"><div className="w-8 h-8 border-4 border-[#05893e] border-t-transparent rounded-full animate-spin"/></div>}>
      <SignInForm />
    </Suspense>
  );
}
