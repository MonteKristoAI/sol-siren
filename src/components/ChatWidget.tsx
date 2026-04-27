import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Role = "user" | "agent";
interface ChatMessage {
  id: string;
  role: Role;
  content: string;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "agent",
  content: "she's been here before. what brings you in today?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (open && !chatId && !starting) {
      setStarting(true);
      setError(null);
      fetch("/api/chat/start", { method: "POST" })
        .then(async (r) => {
          if (!r.ok) throw new Error(`Chat unavailable (${r.status})`);
          return r.json();
        })
        .then((data: { chat_id?: string }) => {
          if (data.chat_id) setChatId(data.chat_id);
          else throw new Error("Chat session not returned");
        })
        .catch((e) => setError(e.message))
        .finally(() => setStarting(false));
    }
  }, [open, chatId, starting]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      });
      if (!sending) inputRef.current?.focus();
    }
  }, [messages, open, sending]);

  async function sendMessage() {
    const content = input.trim();
    if (!content || sending || !chatId) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", content };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setSending(true);
    setError(null);

    try {
      const r = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, content }),
      });
      if (!r.ok) throw new Error(`Reply unavailable (${r.status})`);
      const data: { messages?: { message_id: string; role: string; content: string }[] } = await r.json();
      const reply = data.messages?.find((msg) => msg.role === "agent");
      if (reply) {
        setMessages((m) => [
          ...m,
          { id: reply.message_id, role: "agent", content: reply.content },
        ]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close concierge" : "Open concierge"}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 h-14 px-5 border border-foreground bg-background text-foreground font-display text-[10px] uppercase tracking-fashion hover:bg-foreground hover:text-background transition-colors duration-300"
      >
        {open ? "close" : "concierge"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.aside
            key="concierge-panel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[min(92vw,400px)] h-[min(80vh,580px)] bg-background border border-foreground flex flex-col"
            role="dialog"
            aria-label="Sol Siren concierge"
          >
            <header className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <p className="font-display text-[10px] uppercase tracking-fashion text-foreground">
                  Sol Siren
                </p>
                <p className="font-body italic text-[13px] text-muted-foreground leading-tight mt-0.5">
                  concierge
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 py-5 space-y-5"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.role === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <p
                    className={
                      m.role === "user"
                        ? "max-w-[85%] font-body text-[15px] leading-relaxed text-foreground italic px-3 py-2 border border-border bg-secondary"
                        : "max-w-[88%] font-body text-[15px] leading-relaxed text-foreground"
                    }
                  >
                    {m.content}
                  </p>
                </div>
              ))}
              {sending && (
                <p className="font-body italic text-[13px] text-muted-foreground">
                  she's listening…
                </p>
              )}
              {error && (
                <p className="font-body text-[13px] text-destructive border-t border-border pt-3">
                  {error}
                </p>
              )}
              {starting && messages.length === 1 && (
                <p className="font-body italic text-[13px] text-muted-foreground">
                  opening the door…
                </p>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="border-t border-border px-5 py-3 flex items-end gap-3"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="ask anything"
                disabled={!chatId || sending}
                className="flex-1 resize-none bg-transparent font-body text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none max-h-32"
              />
              <button
                type="submit"
                disabled={!chatId || sending || !input.trim()}
                className="font-display text-[10px] uppercase tracking-fashion text-foreground disabled:text-muted-foreground hover:opacity-70 transition-opacity self-center"
              >
                send
              </button>
            </form>

            <p className="px-5 pb-3 font-body text-[11px] italic text-muted-foreground/80 leading-snug">
              Erin reads everything. for a specific piece, email solsirenvintage@gmail.com.
            </p>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
