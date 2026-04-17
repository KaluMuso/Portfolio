"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase-admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#060608] flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden">
            <Image src="/Vergeo5.png" alt="Vergeo Group" fill className="object-cover" />
          </div>
          <div>
            <p className="font-black text-lg bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent leading-none">
              Vergeo Group
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Admin Panel</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#0d0d14] border border-white/[0.08] rounded-3xl p-8 shadow-2xl">
          <h1 className="text-2xl font-black text-white mb-1">Welcome back</h1>
          <p className="text-gray-500 text-sm mb-8">Sign in to the control panel</p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-black uppercase tracking-[0.15em] text-gray-500 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#060608] border border-white/[0.1] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-blue-500/50 focus:bg-[#080810] transition-all"
                  placeholder="you@vergeo.company"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-black uppercase tracking-[0.15em] text-gray-500 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#060608] border border-white/[0.1] rounded-xl pl-11 pr-12 py-3.5 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-blue-500/50 focus:bg-[#080810] transition-all"
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl font-bold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 text-white py-4 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>Sign in <ArrowRight size={15} /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-700 mt-6 font-bold">
          Restricted to authorized Vergeo Group personnel
        </p>
      </div>
    </div>
  );
}
