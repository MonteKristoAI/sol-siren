"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1A1A1A]" />}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(j.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push(params.get("from") || "/admin");
      router.refresh();
    } catch {
      setErr("Network error");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1A1A1A] px-4 text-[#F5EFE6]">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="font-semibold text-3xl tracking-fashion">SOL SIREN</div>
          <div className="mt-1 text-sm text-[#C9BBA6]">Studio Admin</div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded border border-[#3a3a3a] bg-[#242424] px-4 py-3 text-[#F5EFE6] outline-none focus:border-[#B8A48A]"
          />
          {err && <p className="text-sm text-[#e88]">{err}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded bg-[#5C1F1F] px-4 py-3 font-semibold tracking-wide text-[#F5EFE6] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
