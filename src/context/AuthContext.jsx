"use client";
import React, { createContext, useContext } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }
    : null;

  async function signInWithCredentials(email, password) {
    try {
      const result = await authClient.signIn.email({ email, password });
      if (result?.error) {
        toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
        return false;
      }
      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      return true;
    } catch {
      toast.error("সাইন ইন ব্যর্থ হয়েছে।");
      return false;
    }
  }

  async function signUpWithCredentials(name, email, password) {
    try {
      const result = await authClient.signUp.email({ name, email, password });
      if (result?.error) {
        toast.error("অ্যাকাউন্ট তৈরি ব্যর্থ।");
        return false;
      }
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
      return true;
    } catch {
      toast.error("অ্যাকাউন্ট তৈরি ব্যর্থ।");
      return false;
    }
  }

  async function signInSocial(provider, callbackURL = "/") {
    try {
      await authClient.signIn.social({ provider, callbackURL });
    } catch {
      toast.error(`${provider} দিয়ে সাইন ইন ব্যর্থ হয়েছে।`);
    }
  }

  async function signOutUser() {
    try {
      await authClient.signOut();
      toast.success("সাইন আউট হয়েছে!");
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে।");
    }
  }

  async function updateProfileName(newName) {
    try {
      await authClient.updateUser({ name: newName });
      toast.success("নাম আপডেট হয়েছে!");
      return true;
    } catch {
      toast.error("আপডেট ব্যর্থ হয়েছে।");
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isPending,
        signInWithCredentials,
        signUpWithCredentials,
        signInSocial,
        signOutUser,
        updateProfileName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
