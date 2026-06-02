"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // Redirect based on role
      if (data.user.role === "root") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/chat";
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="glass-surface p-8 rounded-lg flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline-lg text-headline-lg text-primary uppercase tracking-tighter">
          register
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <div className="p-3 border border-error/50 bg-error/10 text-error font-label-mono text-[12px]">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-label-caps text-primary/70">FULL NAME</label>
            <input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-surface-container-lowest border border-outline-variant/30 p-4 font-label-mono text-label-mono focus:outline-none focus:active-glow text-on-surface transition-all"
              placeholder="NAME"
              type="text"
            />
          </div>
          
          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-label-caps text-primary/70">EMAIL ADDRESS</label>
            <input
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-surface-container-lowest border border-outline-variant/30 p-4 font-label-mono text-label-mono focus:outline-none focus:active-glow text-on-surface transition-all"
              placeholder="OPERATOR@SECURE_NET.COM"
              type="email"
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-label-caps text-primary/70">PASSWORD</label>
            <input
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-surface-container-lowest border border-outline-variant/30 p-4 font-label-mono text-label-mono focus:outline-none focus:active-glow text-on-surface transition-all"
              placeholder="PASSWORD"
              type="password"
            />
          </div>
        </div>

        {/* Submit Action */}
        <button
          disabled={loading}
          className="w-full py-4 bg-primary-container text-on-primary-container font-label-caps text-label-caps font-bold uppercase tracking-[0.2em] transition-all hover:bg-primary-fixed-dim hover:active-glow active:scale-95 shadow-[0_0_15px_rgba(0,242,255,0.2)] disabled:opacity-50"
          type="submit"
        >
          {loading ? "PROCESSING..." : "CREATE PROFILE"}
        </button>
      </form>
      
      <div className="flex justify-center mt-4">
        <p className="font-label-mono text-label-mono text-outline">
          ALREADY REGISTERED? <Link className="text-primary-container hover:underline" href="/login">LOGIN IN</Link>
        </p>
      </div>
    </section>
  );
};

export default SignupForm;
