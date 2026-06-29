// Retell admin client — chat history, transcripts, and concierge prompt editing.
// Server-only (uses the secret RETELL_API_KEY). Endpoints verified live.

const BASE = "https://api.retellai.com";
const LLM_ID = process.env.RETELL_LLM_ID || "llm_7ada30285a8f47db1b659a5e7fcc";
const AGENT_ID = process.env.RETELL_AGENT_ID || "agent_dab4d35f4bf87b05653830258a";

function key(): string {
  const k = process.env.RETELL_API_KEY;
  if (!k) throw new Error("RETELL_API_KEY not set");
  return k;
}

async function rf(path: string, init: RequestInit = {}): Promise<any> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${key()}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Retell ${path} ${res.status}: ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : null;
}

export type ChatSummary = {
  chat_id: string;
  chat_status: string;
  start_timestamp: number | null;
  agent_name: string;
  preview: string;
};

export type ChatMessage = { role: string; content: string };

export type ChatDetail = ChatSummary & {
  transcript: string;
  messages: ChatMessage[];
  email: string | null;
};

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

function toMessages(raw: any[]): ChatMessage[] {
  return (raw || [])
    .filter((m) => m && (m.role === "user" || m.role === "agent" || m.role === "assistant") && m.content)
    .map((m) => ({ role: m.role === "assistant" ? "agent" : m.role, content: String(m.content) }));
}

export async function listChats(limit = 50): Promise<ChatSummary[]> {
  const chats: any[] = await rf("/list-chat");
  const onlyThis = chats.filter((c) => !AGENT_ID || c.agent_id === AGENT_ID);
  return onlyThis
    .sort((a, b) => (b.start_timestamp || 0) - (a.start_timestamp || 0))
    .slice(0, limit)
    .map((c) => ({
      chat_id: c.chat_id,
      chat_status: c.chat_status,
      start_timestamp: c.start_timestamp || null,
      agent_name: c.agent_name || "Concierge",
      preview: (c.transcript || "").replace(/\s+/g, " ").slice(0, 120),
    }));
}

export async function getChat(id: string): Promise<ChatDetail> {
  const c = await rf(`/get-chat/${id}`);
  const messages = toMessages(c.message_with_tool_calls || []);
  const haystack = c.transcript || messages.map((m) => m.content).join(" ");
  const email = (haystack.match(EMAIL_RE) || [])[0] || null;
  return {
    chat_id: c.chat_id,
    chat_status: c.chat_status,
    start_timestamp: c.start_timestamp || null,
    agent_name: c.agent_name || "Concierge",
    preview: (c.transcript || "").replace(/\s+/g, " ").slice(0, 120),
    transcript: c.transcript || "",
    messages,
    email,
  };
}

// Scan recent chats for captured emails / buying intent → leads list.
export async function extractLeads(scan = 30): Promise<
  { chat_id: string; email: string | null; start_timestamp: number | null; snippet: string }[]
> {
  const list = await listChats(scan);
  const details = await Promise.all(list.map((c) => getChat(c.chat_id).catch(() => null)));
  const leads = details
    .filter((d): d is ChatDetail => !!d)
    .filter((d) => d.email || /\b(buy|purchase|ship|hold|reserve|interested|available|price|custom)\b/i.test(d.transcript))
    .map((d) => {
      const firstUser = d.messages.find((m) => m.role === "user");
      return {
        chat_id: d.chat_id,
        email: d.email,
        start_timestamp: d.start_timestamp,
        snippet: (firstUser?.content || d.preview).slice(0, 160),
      };
    });
  return leads;
}

export async function getPrompt(): Promise<{ prompt: string; isPublished: boolean; model: string }> {
  const l = await rf(`/get-retell-llm/${LLM_ID}`);
  return { prompt: l.general_prompt || "", isPublished: !!l.is_published, model: l.model || "" };
}

export async function updatePrompt(prompt: string): Promise<void> {
  await rf(`/update-retell-llm/${LLM_ID}`, {
    method: "PATCH",
    body: JSON.stringify({ general_prompt: prompt }),
  });
  // publish so the live concierge picks up the change
  await rf(`/publish-chat-agent/${AGENT_ID}`, { method: "POST" }).catch(() => {
    // some accounts auto-publish on llm update; ignore a publish 4xx
  });
}
