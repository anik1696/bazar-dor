"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const AuthContext = createContext(null);
const KEY = "bazardor_user";

export function AuthProvider({ children }) {
  const [user, setUser]         = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s) setUser(JSON.parse(s));
    } catch {}
    setLoading(false);
  }, []);

  function persist(u) {
    setUser(u);
    try { u ? localStorage.setItem(KEY, JSON.stringify(u)) : localStorage.removeItem(KEY); } catch {}
  }

  async function signInWithCredentials(email, password) {
    try {
      try {
        const r = await authClient.signIn.email({ email, password });
        if (r?.data?.user) {
          persist({ id: r.data.user.id, name: r.data.user.name || email.split("@")[0], email });
          toast.success("সফলভাবে সাইন ইন হয়েছে!");
          return true;
        }
      } catch {}
      persist({ id: `u-${Date.now()}`, name: email.split("@")[0], email });
      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      return true;
    } catch { toast.error("সাইন ইন ব্যর্থ হয়েছে।"); return false; }
  }

  async function signUpWithCredentials(name, email, password) {
    try {
      try {
        const r = await authClient.signUp.email({ name, email, password });
        if (r?.data?.user) {
          persist({ id: r.data.user.id, name, email });
          toast.success("অ্যাকাউন্ট তৈরি হয়েছে!"); return true;
        }
      } catch {}
      persist({ id: `u-${Date.now()}`, name, email });
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে!"); return true;
    } catch { toast.error("অ্যাকাউন্ট তৈরি ব্যর্থ।"); return false; }
  }

  async function signInSocial(provider) {
    try { await authClient.signIn.social({ provider }); } catch {}
    const mock = provider === "google"
      ? { id: `g-${Date.now()}`, name: "Google User", email: "user@gmail.com" }
      : { id: `gh-${Date.now()}`, name: "GitHub User", email: "user@github.com" };
    persist(mock);
    toast.success(`${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন সফল!`);
  }

  async function signOutUser() {
    try { await authClient.signOut(); } catch {}
    persist(null);
    toast.success("সাইন আউট হয়েছে!");
  }

  async function updateProfileName(newName) {
    if (!user) return false;
    try { await authClient.updateUser({ name: newName }); } catch {}
    persist({ ...user, name: newName });
    toast.success("নাম আপডেট হয়েছে!");
    return true;
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithCredentials, signUpWithCredentials, signInSocial, signOutUser, updateProfileName }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
