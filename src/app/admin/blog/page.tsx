"use client";

import { useEffect, useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import { api, fmtDate } from "../_components/api";

type Post = { slug: string; title: string; date: string; url: string };

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    api<{ posts: Post[] }>("/blog")
      .then((d) => setPosts(d.posts))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminChrome title="Blog">
      <p className="mb-4 max-w-2xl text-sm text-[#5a5246]">
        Posts published on your site. MonteKristo writes and publishes these for you — this is your read view of what is live.
      </p>
      {err && <div className="mb-4 rounded border border-[#d9b8b8] bg-[#f7eaea] px-4 py-3 text-sm text-[#5C1F1F]">{err}</div>}
      {loading ? (
        <p className="flex items-center gap-2 text-[#8a7d68]"><Loader2 className="animate-spin" size={16} /> Loading posts…</p>
      ) : posts.length === 0 ? (
        <div className="rounded-lg border border-[#E4DAC9] bg-white p-10 text-center text-[#8a7d68]">No posts yet.</div>
      ) : (
        <ul className="divide-y divide-[#F0E8D9] overflow-hidden rounded-lg border border-[#E4DAC9] bg-white">
          {posts.map((p) => (
            <li key={p.slug} className="flex items-center justify-between gap-4 px-4 py-3">
              <div className="min-w-0">
                <div className="truncate font-medium">{p.title}</div>
                <div className="text-xs text-[#8a7d68]">{fmtDate(p.date) !== "—" ? fmtDate(p.date) : p.date}</div>
              </div>
              <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 whitespace-nowrap text-sm text-[#5C1F1F] hover:underline">
                View <ExternalLink size={13} />
              </a>
            </li>
          ))}
        </ul>
      )}
    </AdminChrome>
  );
}
