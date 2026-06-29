"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail, X } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import { api, timeAgo } from "../_components/api";

type ChatSummary = { chat_id: string; chat_status: string; start_timestamp: number | null; preview: string };
type ChatMessage = { role: string; content: string };
type ChatDetail = ChatSummary & { transcript: string; messages: ChatMessage[]; email: string | null };
type Lead = { chat_id: string; email: string | null; start_timestamp: number | null; snippet: string };

export default function ChatsPage() {
  const [tab, setTab] = useState<"chats" | "leads">("chats");
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [open, setOpen] = useState<ChatDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    api<{ chats: ChatSummary[] }>("/chats")
      .then((d) => setChats(d.chats))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  function showLeads() {
    setTab("leads");
    if (leads === null) {
      setLoadingLeads(true);
      api<{ leads: Lead[] }>("/leads")
        .then((d) => setLeads(d.leads))
        .catch((e) => setErr(e.message))
        .finally(() => setLoadingLeads(false));
    }
  }

  async function openChat(id: string) {
    try {
      const { chat } = await api<{ chat: ChatDetail }>(`/chats/${id}`);
      setOpen(chat);
    } catch (e: any) {
      alert(e.message);
    }
  }

  return (
    <AdminChrome title="Concierge Chats">
      <div className="mb-4 flex gap-1">
        <button onClick={() => setTab("chats")} className={tabCls(tab === "chats")}>Recent chats</button>
        <button onClick={showLeads} className={tabCls(tab === "leads")}>Leads & intent</button>
      </div>

      {err && <div className="mb-4 rounded border border-[#d9b8b8] bg-[#f7eaea] px-4 py-3 text-sm text-[#5C1F1F]">{err}</div>}

      {tab === "chats" &&
        (loading ? (
          <p className="flex items-center gap-2 text-[#8a7d68]"><Loader2 className="animate-spin" size={16} /> Loading chats…</p>
        ) : chats.length === 0 ? (
          <Empty>No concierge chats recorded yet.</Empty>
        ) : (
          <ul className="divide-y divide-[#F0E8D9] overflow-hidden rounded-lg border border-[#E4DAC9] bg-white">
            {chats.map((c) => (
              <li key={c.chat_id}>
                <button onClick={() => openChat(c.chat_id)} className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-[#FAF7F1]">
                  <span className="min-w-0 flex-1 truncate text-sm text-[#5a5246]">{c.preview || "(no messages)"}</span>
                  <span className="whitespace-nowrap text-xs text-[#8a7d68]">
                    {c.chat_status === "ongoing" && <span className="mr-2 rounded-full bg-[#e6efe6] px-2 py-0.5 text-[#2f5a2f]">live</span>}
                    {timeAgo(c.start_timestamp)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ))}

      {tab === "leads" &&
        (loadingLeads ? (
          <p className="flex items-center gap-2 text-[#8a7d68]"><Loader2 className="animate-spin" size={16} /> Scanning recent chats for buyers…</p>
        ) : !leads || leads.length === 0 ? (
          <Empty>No buying-intent leads found in recent chats.</Empty>
        ) : (
          <ul className="divide-y divide-[#F0E8D9] overflow-hidden rounded-lg border border-[#E4DAC9] bg-white">
            {leads.map((l) => (
              <li key={l.chat_id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="min-w-0">
                  {l.email ? (
                    <a href={`mailto:${l.email}`} className="flex items-center gap-1.5 text-sm font-medium text-[#5C1F1F]">
                      <Mail size={14} /> {l.email}
                    </a>
                  ) : (
                    <span className="text-sm text-[#8a7d68]">No email left</span>
                  )}
                  <div className="mt-0.5 truncate text-xs text-[#8a7d68]">{l.snippet}</div>
                </div>
                <button onClick={() => openChat(l.chat_id)} className="whitespace-nowrap rounded border border-[#E4DAC9] px-2.5 py-1 text-xs hover:bg-[#F5EFE6]">
                  Open chat
                </button>
              </li>
            ))}
          </ul>
        ))}

      {open && <TranscriptDrawer chat={open} onClose={() => setOpen(null)} />}
    </AdminChrome>
  );
}

function tabCls(active: boolean) {
  return `rounded px-4 py-2 text-sm ${active ? "bg-[#5C1F1F] text-[#F5EFE6]" : "border border-[#E4DAC9] bg-white"}`;
}
function Empty({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-[#E4DAC9] bg-white p-10 text-center text-[#8a7d68]">{children}</div>;
}

function TranscriptDrawer({ chat, onClose }: { chat: ChatDetail; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#E4DAC9] px-5 py-4">
          <div>
            <h2 className="font-semibold text-lg">Transcript</h2>
            {chat.email && (
              <a href={`mailto:${chat.email}`} className="flex items-center gap-1.5 text-sm text-[#5C1F1F]">
                <Mail size={13} /> {chat.email}
              </a>
            )}
          </div>
          <button onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {chat.messages.length === 0 && <p className="text-sm text-[#8a7d68]">No messages in this chat.</p>}
          {chat.messages.map((m, i) => (
            <div key={i} className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${m.role === "user" ? "ml-auto bg-[#1A1A1A] text-[#F5EFE6]" : "bg-[#F5EFE6] text-[#1A1A1A]"}`}>
              {m.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
