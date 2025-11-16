"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import Image from "next/image";

import {
  FiUser,
  FiLogOut,
  FiLogIn,
  FiChevronDown
} from "react-icons/fi";

export default function Header() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    // ✔ FIX: use getSession instead of getUser
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener?.subscription?.unsubscribe();
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  async function signIn() {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <header className="w-full bg-gradient-to-br from-[#111115] via-[#262633] to-[#0e0e17] sticky top-0 z-50 shadow-lg shadow-black/20">
      <div className="max-w-6xl mx-auto py-3 px-4 flex justify-between items-center">

        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          StudentNeedy
        </h2>

        {/* RIGHT - Profile */}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-3 px-3 py-2 bg-white/5 border border-white/10 text-gray-200 rounded-xl hover:bg-white/10 transition-all"
            >
              {/* Profile IMAGE or Initial fallback */}
              {user.user_metadata?.avatar_url || user.user_metadata?.picture ? (
                <Image
    src={user.user_metadata.avatar_url || user.user_metadata.picture}
    alt="Profile"
    width={32}
    height={32}
    className="rounded-full border border-purple-500/30 object-cover"
  />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 
                flex items-center justify-center text-sm font-bold">
                  {user.email?.charAt(0)?.toUpperCase()}
                </div>
              )}

              <span className="hidden sm:inline max-w-[120px] truncate">
                {user.email}
              </span>

              <FiChevronDown
                className={`transition-transform ${menuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-[#111114]/90 backdrop-blur-xl 
              border border-white/10 rounded-xl shadow-lg shadow-black/30 animate-fadeIn"
              >
                <button
                  onClick={signOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-white/10 rounded-xl transition"
                >
                  <FiLogOut className="text-red-400" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={signIn}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-500 transition text-white"
          >
            <FiLogIn /> Sign in
          </button>
        )}
      </div>
    </header>
  );
}
