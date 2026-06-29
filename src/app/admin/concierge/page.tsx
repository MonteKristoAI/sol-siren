"use client";

import { useEffect, useState } from "react";
import { Loader2, Check } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import { api } from "../_components/api";

export default function ConciergePage() {
  const [prompt, setPrompt] = useState("");
  const [original, setOriginal] = useState("");
  const [model, setModel] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    api<{ prompt: string; model: string }>("/prompt")
      .then((d) => { setPrompt(d.prompt); setOriginal(d.prompt); setModel(d.model); })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setSaving(true);
    setErr("");
    setSaved(false);
    try {
      await api("/prompt", { method: "PUT", body: JSON.stringify({ prompt }) });
      setOriginal(prompt);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  const dirty = prompt !== original;

  return (
    <AdminChrome
      title="Bot Knowledge"
      action={
        <button
          onClick={save}
          disabled={!dirty || saving}
          className="flex items-center gap-2 rounded bg-[#1A1A1A] px-3 py-2 text-sm text-[#F5EFE6] disabled:opacity-40"
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : saved ? <Check size={16} /> : null}
          {saving ? "Publishing…" : saved ? "Published" : "Save & publish"}
        </button>
      }
    >
      <p className="mb-4 max-w-2xl text-sm text-[#5a5246]">
        This is what your website concierge knows and how it speaks. Edit it the way you would brief a new assistant.
        Saving publishes it to the live chat right away. {model && <span className="text-[#8a7d68]">Model: {model}</span>}
      </p>
      {err && <div className="mb-4 rounded border border-[#d9b8b8] bg-[#f7eaea] px-4 py-3 text-sm text-[#5C1F1F]">{err}</div>}
      {loading ? (
        <p className="flex items-center gap-2 text-[#8a7d68]"><Loader2 className="animate-spin" size={16} /> Loading current knowledge…</p>
      ) : (
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          spellCheck={false}
          className="h-[60vh] w-full rounded-lg border border-[#E4DAC9] bg-white p-4 font-mono text-sm leading-relaxed outline-none focus:border-[#B8A48A]"
        />
      )}
    </AdminChrome>
  );
}
